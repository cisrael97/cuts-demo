'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { DollarSign, CalendarDays, Users, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'
import { VENTAS_STATS } from '@/lib/data/ventas'
import { citasMock } from '@/lib/data/citas'
import { clientesMock } from '@/lib/data/clientes'
import { serviciosMock } from '@/lib/data/servicios'
import { personalMock } from '@/lib/data/personal'
import { formatCurrency } from '@/lib/utils'
import { ESTADO_CITA_COLORS, ESTADO_CITA_LABELS } from '@/lib/constants'
import clsx from 'clsx'

const TODAY = '2026-04-05'

const citasHoy = citasMock.filter((c) => c.fecha === TODAY)
const pendientes = citasHoy.filter((c) => c.estado === 'pendiente' || c.estado === 'confirmada').length
const completadasHoy = citasHoy.filter((c) => c.estado === 'completada').length

const deltaMes = Math.round(((VENTAS_STATS.ingresosMes - VENTAS_STATS.ingresosMesAnterior) / VENTAS_STATS.ingresosMesAnterior) * 100)

// Top services (mock count)
const topServicios = [
  { name: 'Corte caballero', value: 28, color: '#6366f1' },
  { name: 'Corte dama', value: 22, color: '#ec4899' },
  { name: 'Tinte completo', value: 18, color: '#f59e0b' },
  { name: 'Uñas de gel', value: 14, color: '#10b981' },
  { name: 'Combo corte + barba', value: 12, color: '#0891b2' },
]

const STATS = [
  {
    label: 'Ingresos del mes',
    value: formatCurrency(VENTAS_STATS.ingresosMes),
    delta: `+${deltaMes}% vs mes anterior`,
    deltaPositive: true,
    Icon: DollarSign,
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-500',
  },
  {
    label: 'Citas hoy',
    value: citasHoy.length,
    delta: `${completadasHoy} completadas`,
    deltaPositive: true,
    Icon: CalendarDays,
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-500',
  },
  {
    label: 'Clientes activos',
    value: clientesMock.filter((c) => !c.etiquetas.includes('Inactivo')).length,
    delta: `${clientesMock.filter((c) => c.etiquetas.includes('Nuevo')).length} nuevos este mes`,
    deltaPositive: true,
    Icon: Users,
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-500',
  },
  {
    label: 'Ticket promedio',
    value: formatCurrency(VENTAS_STATS.ticketPromedio),
    delta: 'Por venta completada',
    deltaPositive: true,
    Icon: TrendingUp,
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-500',
  },
]

export default function DashboardClient() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, delta, Icon, bg, iconBg }) => (
          <div key={label} className={clsx('rounded-2xl p-5 border border-white shadow-sm', bg)}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', iconBg)}>
                <Icon size={16} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900">Ingresos últimos 7 días</h2>
              <p className="text-xs text-gray-500">Total: {formatCurrency(VENTAS_STATS.ingresosSemana)}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={VENTAS_STATS.porDia} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Ingresos']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} />
              <Bar dataKey="total" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Services Pie */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Servicios más vendidos</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={topServicios} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {topServicios.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} servicios`, '']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {topServicios.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-gray-600 flex-1 truncate">{s.name}</span>
                <span className="font-medium text-gray-800">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        {/* Citas de hoy */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Citas de hoy</h2>
            <span className="text-xs text-gray-500">{citasHoy.length} total · {pendientes} pendientes</span>
          </div>
          <div className="space-y-2.5">
            {citasHoy.slice(0, 6).map((cita) => {
              const cliente = clientesMock.find((c) => c.id === cita.clienteId)
              const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
              const empleado = personalMock.find((p) => p.id === cita.personalId)
              return (
                <div key={cita.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-gray-400 w-20 flex-shrink-0">
                    <Clock size={11} />
                    {cita.horaInicio}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{cliente?.nombre ?? 'Sin nombre'}</p>
                    <p className="text-xs text-gray-500 truncate">{servicio?.nombre} · {empleado?.nombre.split(' ')[0]}</p>
                  </div>
                  <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap', ESTADO_CITA_COLORS[cita.estado])}>
                    {ESTADO_CITA_LABELS[cita.estado]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Personal hoy */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Personal activo hoy</h2>
          <div className="space-y-2.5">
            {personalMock.filter((p) => p.activo && p.rol !== 'Recepcionista').map((emp) => (
              <div key={emp.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: emp.colorAvatar }}>
                  {emp.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{emp.nombre}</p>
                  <p className="text-xs text-gray-500">{emp.rol}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <CheckCircle2 size={11} className="text-emerald-500" />
                    {emp.citasHoy} citas
                  </div>
                  <p className="text-xs text-gray-400">{formatCurrency(emp.ventasMes)} este mes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas rápidas */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Alertas de inventario</p>
          <p className="text-xs text-amber-700 mt-0.5">
            5 productos por debajo del stock mínimo. Revisa la sección de Inventario para reordenar.
          </p>
        </div>
      </div>
    </div>
  )
}
