'use client'
import { useState } from 'react'
import { Plus, Minus, Trash2, ShoppingCart, CheckCircle2, CreditCard, Banknote, Smartphone } from 'lucide-react'
import clsx from 'clsx'
import { useVentasStore } from '@/lib/store/useVentasStore'
import { serviciosMock } from '@/lib/data/servicios'
import { personalMock } from '@/lib/data/personal'
import { clientesMock } from '@/lib/data/clientes'
import { VENTAS_STATS } from '@/lib/data/ventas'
import { formatCurrency } from '@/lib/utils'
import type { ItemVenta } from '@/lib/types'

const CATEGORIAS_SERVICIO = ['Cabello', 'Barba', 'Uñas', 'Faciales', 'Tratamientos', 'Otros']

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }
const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--card-border)' }

export default function VentasClient() {
  const { ventas, addVenta } = useVentasStore()
  const [tab, setTab] = useState<'pos' | 'historial'>('pos')
  const [catFilter, setCatFilter] = useState<string>('Todos')
  const [cart, setCart] = useState<ItemVenta[]>([])
  const [personalId, setPersonalId] = useState(personalMock[0].id)
  const [clienteId, setClienteId] = useState('')
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo')
  const [descuento, setDescuento] = useState(0)
  const [success, setSuccess] = useState(false)

  const cats = ['Todos', ...CATEGORIAS_SERVICIO]
  const serviciosFiltrados = serviciosMock.filter((s) => s.activo && (catFilter === 'Todos' || s.categoria === catFilter))

  function addToCart(servicio: typeof serviciosMock[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.referenciaId === servicio.id)
      if (existing) return prev.map((i) => i.referenciaId === servicio.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { tipo: 'servicio', referenciaId: servicio.id, nombre: servicio.nombre, cantidad: 1, precioUnitario: servicio.precio }]
    })
  }

  function removeOne(id: string) {
    setCart((prev) => prev.map((i) => i.referenciaId === id ? { ...i, cantidad: i.cantidad - 1 } : i).filter((i) => i.cantidad > 0))
  }

  const subtotal = cart.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0)
  const total = Math.max(0, subtotal - descuento)

  function cobrar() {
    if (cart.length === 0) return
    addVenta({ id: `v${Date.now()}`, fecha: new Date().toISOString(), clienteId: clienteId || null, personalId, items: cart, subtotal, descuento, total, metodoPago, estado: 'completada' })
    setCart([]); setDescuento(0); setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col flex-1 md:flex-row md:overflow-hidden">
      {/* Main */}
      <div className="flex-1 flex flex-col md:overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 md:px-6 pt-4 pb-0 sticky top-0 z-10" style={{ background: 'var(--card)', borderBottom: '1px solid var(--card-border)' }}>
          {(['pos', 'historial'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px"
              style={t === tab ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : { borderColor: 'transparent', ...muted }}>
              {t === 'pos' ? 'Punto de venta' : 'Historial'}
            </button>
          ))}
        </div>

        {tab === 'pos' ? (
          <div className="flex-1 p-3 md:p-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Ingresos hoy', value: formatCurrency(VENTAS_STATS.ingresosHoy) },
                { label: 'Ventas hoy', value: VENTAS_STATS.ventasHoy },
                { label: 'Ticket promedio', value: formatCurrency(VENTAS_STATS.ticketPromedio) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border p-3 text-center" style={card}>
                  <p className="text-xs mb-0.5" style={muted}>{label}</p>
                  <p className="font-bold" style={txt}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {cats.map((c) => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all border flex-shrink-0"
                  style={catFilter === c ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' } : { ...card, ...muted }}>
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviciosFiltrados.map((s) => {
                const inCart = cart.find((i) => i.referenciaId === s.id)
                return (
                  <button key={s.id} onClick={() => addToCart(s)}
                    className="rounded-xl border p-3 text-left transition-all relative"
                    style={inCart ? { background: 'var(--accent-light)', borderColor: 'var(--accent)' } : card}>
                    {inCart && (
                      <span className="absolute top-2 right-2 w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                        style={{ background: 'var(--accent)' }}>{inCart.cantidad}</span>
                    )}
                    <div className="w-2 h-2 rounded-full mb-2" style={{ background: s.color }} />
                    <p className="text-xs font-semibold leading-tight mb-1" style={txt}>{s.nombre}</p>
                    <p className="text-[10px]" style={muted}>{s.duracionMinutos} min</p>
                    <p className="text-sm font-bold mt-1" style={txt}>{formatCurrency(s.precio)}</p>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 md:p-6">
            <div className="rounded-2xl border shadow-sm overflow-hidden overflow-x-auto" style={card}>
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                    {['Fecha', 'Cliente', 'Empleado', 'Pago', 'Total'].map((h, i) => (
                      <th key={h} className={clsx('text-left px-4 py-3 text-xs font-semibold', i === 1 && 'hidden md:table-cell', i === 2 && 'hidden lg:table-cell', i === 3 && 'hidden lg:table-cell', i === 4 && 'text-right')} style={muted}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ventas.slice(0, 20).map((v) => {
                    const cliente = clientesMock.find((c) => c.id === v.clienteId)
                    const emp = personalMock.find((p) => p.id === v.personalId)
                    return (
                      <tr key={v.id} className="transition-colors" style={{ borderBottom: '1px solid var(--card-border)' }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'var(--row-hover)'}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = ''}>
                        <td className="px-4 py-3 text-xs" style={muted}>{new Date(v.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-4 py-3 hidden md:table-cell" style={txt}>{cliente?.nombre ?? 'Sin registro'}</td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs" style={muted}>{emp?.nombre}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: 'var(--input-bg)', ...muted }}>{v.metodoPago}</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-right" style={txt}>{formatCurrency(v.total)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Cart */}
      {tab === 'pos' && (
        <div className="md:w-72 flex flex-col max-h-[55vh] md:max-h-none" style={{ background: 'var(--card)', borderTop: '1px solid var(--card-border)', borderLeft: undefined }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--card-border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart size={16} style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold" style={txt}>Ticket actual</h3>
              {cart.length > 0 && (
                <span className="ml-auto w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent)' }}>{cart.reduce((a, i) => a + i.cantidad, 0)}</span>
              )}
            </div>
            <select value={personalId} onChange={(e) => setPersonalId(e.target.value)}
              className="w-full text-xs rounded-lg px-2 py-1.5 mb-2 outline-none border"
              style={{ ...inputStyle, ...txt }}>
              {personalMock.filter((p) => p.rol !== 'Recepcionista' && p.rol !== 'Gerente').map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}
              className="w-full text-xs rounded-lg px-2 py-1.5 outline-none border"
              style={{ ...inputStyle, ...txt }}>
              <option value="">Sin cliente registrado</option>
              {clientesMock.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {cart.length === 0 ? (
              <div className="text-center py-10" style={muted}>
                <ShoppingCart size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">Selecciona servicios del catálogo</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.referenciaId} className="flex items-center gap-2 rounded-xl p-2" style={{ background: 'var(--card-alt)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={txt}>{item.nombre}</p>
                    <p className="text-[10px]" style={muted}>{formatCurrency(item.precioUnitario)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => removeOne(item.referenciaId)} className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'var(--input-bg)', ...muted }}>
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center" style={txt}>{item.cantidad}</span>
                    <button onClick={() => addToCart(serviciosMock.find((s) => s.id === item.referenciaId)!)} className="w-5 h-5 text-white rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                      <Plus size={10} />
                    </button>
                  </div>
                  <p className="text-xs font-bold w-14 text-right" style={txt}>{formatCurrency(item.precioUnitario * item.cantidad)}</p>
                </div>
              ))
            )}
          </div>

          <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--card-border)' }}>
            <div className="flex justify-between text-sm" style={muted}>
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm" style={muted}>Descuento</span>
              <div className="flex items-center gap-1 rounded-lg px-2 py-1 border" style={inputStyle}>
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>$</span>
                <input type="number" min={0} value={descuento} onChange={(e) => setDescuento(Math.max(0, Number(e.target.value)))}
                  className="w-16 text-xs bg-transparent outline-none" style={txt} />
              </div>
            </div>
            <div className="flex justify-between font-bold text-base pt-1" style={{ borderTop: '1px solid var(--card-border)' }}>
              <span style={txt}>Total</span>
              <span style={{ color: 'var(--accent)' }}>{formatCurrency(total)}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {([
                { value: 'efectivo', Icon: Banknote, label: 'Efectivo' },
                { value: 'tarjeta', Icon: CreditCard, label: 'Tarjeta' },
                { value: 'transferencia', Icon: Smartphone, label: 'Transfer' },
              ] as const).map(({ value, Icon, label }) => (
                <button key={value} onClick={() => setMetodoPago(value)}
                  className="flex flex-col items-center gap-1 py-2 rounded-xl border text-[10px] font-medium transition-all"
                  style={metodoPago === value
                    ? { borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--accent-text)' }
                    : { ...card, ...muted }}>
                  <Icon size={14} />{label}
                </button>
              ))}
            </div>

            {success && (
              <div className="flex items-center gap-2 rounded-xl p-3 text-xs" style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #86efac' }}>
                <CheckCircle2 size={14} />Venta registrada exitosamente
              </div>
            )}

            <button onClick={cobrar} disabled={cart.length === 0}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all text-white"
              style={cart.length > 0
                ? { background: 'var(--accent)', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }
                : { background: 'var(--card-border)', color: 'var(--text-faint)', cursor: 'not-allowed' }}>
              {cart.length > 0 ? `Cobrar ${formatCurrency(total)}` : 'Cobrar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
