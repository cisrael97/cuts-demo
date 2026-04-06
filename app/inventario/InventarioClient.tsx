'use client'
import { useState } from 'react'
import { AlertTriangle, TrendingDown, Package, Search, Plus, Minus } from 'lucide-react'
import clsx from 'clsx'
import { useInventarioStore } from '@/lib/store/useInventarioStore'
import { formatCurrency, formatDate } from '@/lib/utils'

const CATEGORIAS = ['Todas', 'Shampoo', 'Tinte', 'Tratamiento', 'Herramientas', 'Consumibles']

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }
const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--card-border)' }

export default function InventarioClient() {
  const { productos, updateStock } = useInventarioStore()
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [soloAlertas, setSoloAlertas] = useState(false)

  const filtered = productos.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) || p.proveedor.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoria === 'Todas' || p.categoria === categoria
    const matchAlerta = !soloAlertas || p.stockActual <= p.stockMinimo
    return matchSearch && matchCat && matchAlerta
  })

  const alertas = productos.filter((p) => p.stockActual <= p.stockMinimo).length

  function stockColor(actual: number, minimo: number) {
    if (actual === 0) return { background: '#fee2e2', color: '#dc2626' }
    if (actual / minimo <= 0.5) return { background: '#fee2e2', color: '#ef4444' }
    if (actual <= minimo) return { background: '#fef3c7', color: '#d97706' }
    return { background: '#d1fae5', color: '#059669' }
  }

  return (
    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
      {alertas > 0 && (
        <div
          className="flex items-center gap-3 rounded-2xl p-4 mb-5 cursor-pointer transition-all border"
          onClick={() => setSoloAlertas(!soloAlertas)}
          style={{ background: 'var(--accent-light)', borderColor: 'var(--accent)' }}
        >
          <AlertTriangle size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>
              {alertas} producto{alertas !== 1 ? 's' : ''} con stock bajo o agotado
            </p>
            <p className="text-xs" style={muted}>Haz clic para {soloAlertas ? 'ver todos' : 'ver solo alertas'}</p>
          </div>
          <TrendingDown size={16} style={{ color: 'var(--accent)' }} />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border" style={inputStyle}>
          <Search size={14} style={{ color: 'var(--text-faint)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto o proveedor..."
            className="flex-1 text-sm bg-transparent outline-none" style={txt} />
        </div>
        <button className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl flex-shrink-0 transition-colors"
          style={{ background: 'var(--accent)' }}>
          <Plus size={15} />Agregar producto
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIAS.map((c) => (
          <button key={c} onClick={() => setCategoria(c)}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-all border"
            style={categoria === c
              ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
              : { ...card, ...muted }}>
            {c}
          </button>
        ))}
        <span className="ml-auto text-xs self-center" style={muted}>{filtered.length} productos</span>
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden overflow-x-auto" style={card}>
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              {['Producto', 'Proveedor', 'Stock', 'Mínimo', 'P. Compra', 'P. Venta', 'Ajustar'].map((h, i) => (
                <th key={h} className={clsx('text-left px-4 py-3 text-xs font-semibold', i > 0 && i < 2 && 'hidden md:table-cell', i >= 3 && i < 6 && 'hidden lg:table-cell', i === 6 && 'text-center')} style={muted}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid var(--card-border)', background: p.stockActual <= p.stockMinimo ? 'rgba(239,68,68,0.04)' : undefined }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.stockActual <= p.stockMinimo && <AlertTriangle size={12} className="text-amber-500 flex-shrink-0" />}
                    <div>
                      <p className="font-medium" style={txt}>{p.nombre}</p>
                      <p className="text-[10px]" style={muted}>{p.categoria} · {p.unidad}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs hidden md:table-cell" style={muted}>{p.proveedor}</td>
                <td className="px-4 py-3 text-center">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={stockColor(p.stockActual, p.stockMinimo)}>
                    {p.stockActual} {p.unidad}{p.stockActual === 0 ? ' — AGOTADO' : ''}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs hidden lg:table-cell" style={muted}>{p.stockMinimo}</td>
                <td className="px-4 py-3 text-right text-xs hidden lg:table-cell" style={muted}>{formatCurrency(p.precioCompra)}</td>
                <td className="px-4 py-3 text-right text-xs font-medium hidden lg:table-cell" style={txt}>{formatCurrency(p.precioVenta)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => updateStock(p.id, Math.max(0, p.stockActual - 1))}
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                      style={{ background: 'var(--input-bg)', color: 'var(--text-muted)' }}>
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-bold w-7 text-center" style={txt}>{p.stockActual}</span>
                    <button onClick={() => updateStock(p.id, p.stockActual + 1)}
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                      style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                      <Plus size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16" style={muted}>
            <Package size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Sin productos que coincidan</p>
          </div>
        )}
      </div>
    </div>
  )
}
