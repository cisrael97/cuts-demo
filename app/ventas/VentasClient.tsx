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

export default function VentasClient() {
  const { ventas, addVenta } = useVentasStore()
  const [tab, setTab] = useState<'pos' | 'historial'>('pos')
  const [catFilter, setCatFilter] = useState<string>('Todos')
  const [cart, setCart] = useState<ItemVenta[]>([])
  const [personalId, setPersonalId] = useState(personalMock[0].id)
  const [clienteId, setClienteId] = useState<string>('')
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo')
  const [descuento, setDescuento] = useState(0)
  const [success, setSuccess] = useState(false)

  const cats = ['Todos', ...CATEGORIAS_SERVICIO]
  const serviciosFiltrados = serviciosMock.filter((s) => s.activo && (catFilter === 'Todos' || s.categoria === catFilter))

  function addToCart(servicio: typeof serviciosMock[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.referenciaId === servicio.id)
      if (existing) {
        return prev.map((i) => i.referenciaId === servicio.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
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
    const venta = {
      id: `v${Date.now()}`,
      fecha: new Date().toISOString(),
      clienteId: clienteId || null,
      personalId,
      items: cart,
      subtotal,
      descuento,
      total,
      metodoPago,
      estado: 'completada' as const,
    }
    addVenta(venta)
    setCart([])
    setDescuento(0)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 pb-0 border-b border-gray-100 bg-white">
          {(['pos', 'historial'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx('px-4 py-2 text-sm font-medium capitalize border-b-2 transition-all -mb-px', t === tab ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700')}
            >
              {t === 'pos' ? 'Punto de venta' : 'Historial'}
            </button>
          ))}
        </div>

        {tab === 'pos' ? (
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Stats bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Ingresos hoy</p>
                <p className="font-bold text-gray-900">{formatCurrency(VENTAS_STATS.ingresosHoy + (success ? total : 0))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Ventas hoy</p>
                <p className="font-bold text-gray-900">{VENTAS_STATS.ventasHoy + ventas.filter((v) => v.fecha.startsWith('2026-04-05')).length - 1}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Ticket promedio</p>
                <p className="font-bold text-gray-900">{formatCurrency(VENTAS_STATS.ticketPromedio)}</p>
              </div>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={clsx('px-3 py-1 rounded-lg text-xs font-medium transition-all border flex-shrink-0', catFilter === c ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300')}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviciosFiltrados.map((s) => {
                const inCart = cart.find((i) => i.referenciaId === s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => addToCart(s)}
                    className={clsx(
                      'bg-white rounded-xl border p-3 text-left hover:border-rose-300 hover:shadow-sm transition-all relative',
                      inCart ? 'border-rose-400 bg-rose-50' : 'border-gray-100'
                    )}
                  >
                    {inCart && (
                      <span className="absolute top-2 right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {inCart.cantidad}
                      </span>
                    )}
                    <div className="w-2 h-2 rounded-full mb-2" style={{ background: s.color }} />
                    <p className="text-xs font-semibold text-gray-900 leading-tight mb-1">{s.nombre}</p>
                    <p className="text-[10px] text-gray-400">{s.duracionMinutos} min</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{formatCurrency(s.precio)}</p>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          /* Historial */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Fecha</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Cliente</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Empleado</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Pago</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.slice(0, 20).map((v) => {
                    const cliente = clientesMock.find((c) => c.id === v.clienteId)
                    const emp = personalMock.find((p) => p.id === v.personalId)
                    return (
                      <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600 text-xs">
                          {new Date(v.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-gray-700 hidden md:table-cell">{cliente?.nombre ?? 'Sin registro'}</td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell text-xs">{emp?.nombre}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{v.metodoPago}</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900 text-right">{formatCurrency(v.total)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Cart — full width on mobile, sidebar on desktop */}
      {tab === 'pos' && (
        <div className="md:w-72 border-t md:border-t-0 md:border-l border-gray-100 bg-white flex flex-col max-h-[55vh] md:max-h-none">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart size={16} className="text-rose-500" />
              <h3 className="font-semibold text-gray-900">Ticket actual</h3>
              {cart.length > 0 && (
                <span className="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((a, i) => a + i.cantidad, 0)}
                </span>
              )}
            </div>

            {/* Empleado */}
            <select
              value={personalId}
              onChange={(e) => setPersonalId(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 mb-2 bg-white text-gray-700 outline-none"
            >
              {personalMock.filter((p) => p.rol !== 'Recepcionista' && p.rol !== 'Gerente').map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            {/* Cliente */}
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 outline-none"
            >
              <option value="">Sin cliente registrado</option>
              {clientesMock.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {cart.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <ShoppingCart size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">Selecciona servicios del catálogo</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.referenciaId} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{item.nombre}</p>
                    <p className="text-[10px] text-gray-500">{formatCurrency(item.precioUnitario)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => removeOne(item.referenciaId)} className="w-5 h-5 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-100">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.cantidad}</span>
                    <button onClick={() => addToCart(serviciosMock.find((s) => s.id === item.referenciaId)!)} className="w-5 h-5 bg-rose-500 text-white rounded-md flex items-center justify-center hover:bg-rose-600">
                      <Plus size={10} />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-gray-900 w-14 text-right">{formatCurrency(item.precioUnitario * item.cantidad)}</p>
                </div>
              ))
            )}
          </div>

          {/* Summary & payment */}
          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-600">Descuento</span>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs text-gray-400">$</span>
                <input
                  type="number"
                  min={0}
                  value={descuento}
                  onChange={(e) => setDescuento(Math.max(0, Number(e.target.value)))}
                  className="w-16 text-xs bg-transparent outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
              <span>Total</span>
              <span className="text-rose-600">{formatCurrency(total)}</span>
            </div>

            {/* Método de pago */}
            <div className="grid grid-cols-3 gap-1.5">
              {([
                { value: 'efectivo', Icon: Banknote, label: 'Efectivo' },
                { value: 'tarjeta', Icon: CreditCard, label: 'Tarjeta' },
                { value: 'transferencia', Icon: Smartphone, label: 'Transfer' },
              ] as const).map(({ value, Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setMetodoPago(value)}
                  className={clsx('flex flex-col items-center gap-1 py-2 rounded-xl border text-[10px] font-medium transition-all', metodoPago === value ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {success && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-700 text-xs">
                <CheckCircle2 size={14} />
                Venta registrada exitosamente
              </div>
            )}

            <button
              onClick={cobrar}
              disabled={cart.length === 0}
              className={clsx('w-full py-3 rounded-xl font-bold text-sm transition-all', cart.length > 0 ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed')}
            >
              Cobrar {cart.length > 0 ? formatCurrency(total) : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
