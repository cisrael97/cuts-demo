'use client'
import { useState } from 'react'
import { AlertTriangle, TrendingDown, Package, Search, Plus, Minus } from 'lucide-react'
import clsx from 'clsx'
import { useInventarioStore } from '@/lib/store/useInventarioStore'
import { formatCurrency, formatDate } from '@/lib/utils'

const CATEGORIAS = ['Todas', 'Shampoo', 'Tinte', 'Tratamiento', 'Herramientas', 'Consumibles']

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

  function stockColor(actual: number, minimo: number): string {
    const ratio = actual / minimo
    if (actual === 0) return 'text-red-600 bg-red-100'
    if (ratio <= 0.5) return 'text-red-500 bg-red-50'
    if (ratio <= 1) return 'text-amber-600 bg-amber-100'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Alert banner */}
      {alertas > 0 && (
        <div
          className={clsx(
            'flex items-center gap-3 rounded-2xl p-4 mb-5 cursor-pointer transition-all border',
            soloAlertas
              ? 'bg-red-50 border-red-200'
              : 'bg-amber-50 border-amber-200'
          )}
          onClick={() => setSoloAlertas(!soloAlertas)}
        >
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">
              {alertas} producto{alertas !== 1 ? 's' : ''} con stock bajo o agotado
            </p>
            <p className="text-xs text-amber-700">Haz clic para {soloAlertas ? 'ver todos' : 'ver solo alertas'}</p>
          </div>
          <TrendingDown size={16} className="text-amber-500" />
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto o proveedor..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors flex-shrink-0">
          <Plus size={15} />
          Agregar producto
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={clsx('px-3 py-1 rounded-lg text-xs font-medium transition-all border', categoria === c ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300')}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">{filtered.length} productos</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Producto</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Proveedor</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Stock</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Mínimo</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">P. Compra</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">P. Venta</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Ajustar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className={clsx('border-b border-gray-50 hover:bg-gray-50 transition-colors', p.stockActual <= p.stockMinimo && 'bg-red-50/30')}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.stockActual <= p.stockMinimo && <AlertTriangle size={12} className="text-amber-500 flex-shrink-0" />}
                    <div>
                      <p className="font-medium text-gray-900">{p.nombre}</p>
                      <p className="text-[10px] text-gray-400">{p.categoria} · {p.unidad}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{p.proveedor}</td>
                <td className="px-4 py-3 text-center">
                  <span className={clsx('text-xs font-bold px-2.5 py-1 rounded-full', stockColor(p.stockActual, p.stockMinimo))}>
                    {p.stockActual} {p.unidad}
                    {p.stockActual === 0 && ' — AGOTADO'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-500 hidden lg:table-cell">{p.stockMinimo}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-600 hidden lg:table-cell">{formatCurrency(p.precioCompra)}</td>
                <td className="px-4 py-3 text-right text-xs font-medium text-gray-800 hidden lg:table-cell">{formatCurrency(p.precioVenta)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => updateStock(p.id, Math.max(0, p.stockActual - 1))}
                      className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-bold w-7 text-center text-gray-800">{p.stockActual}</span>
                    <button
                      onClick={() => updateStock(p.id, p.stockActual + 1)}
                      className="w-6 h-6 bg-rose-100 hover:bg-rose-200 rounded-md flex items-center justify-center transition-colors text-rose-600"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Sin productos que coincidan</p>
          </div>
        )}
      </div>
    </div>
  )
}
