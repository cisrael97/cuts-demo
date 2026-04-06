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

const topServicios = [
  { name: 'Corte caballero', value: 28, color: '#6366f1' },
  { name: 'Corte dama', value: 22, color: '#ec4899' },
  { name: 'Tinte completo', value: 18, color: '#f59e0b' },
  { name: 'Uñas de gel', value: 14, color: '#10b981' },
  { name: 'Combo corte + barba', value: 12, color: '#0891b2' },
]

const STATS = [
  { label: 'Ingresos del mes', value: formatCurrency(VENTAS_STATS.ingresosMes), delta: `+${deltaMes}% vs mes anterior`, Icon: DollarSign },
  { label: 'Citas hoy', value: citasHoy.length, delta: `${completadasHoy} completadas`, Icon: CalendarDays },
  { label: 'Clientes activos', value: clientesMock.filter((c) => !c.etiquetas.includes('Inactivo')).length, delta: `${clientesMock.filter((c) => c.etiquetas.includes('Nuevo')).length} nuevos`, Icon: Users },
  { label: 'Ticket promedio', value: formatCurrency(VENTAS_STATS.ticketPromedio), delta: 'Por venta completada', Icon: TrendingUp },
]

const cardStyle = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const textStyle = { color: 'var(--text)' }
const mutedStyle = { color: 'var(--text-muted)' }

export default function DashboardClient() {
  return (
    <div className="flex-1 p-3 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, delta, Icon }) => (
          <div key={label} className="rounded-2xl p-5 border shadow-sm" style={cardStyle}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium" style={mutedStyle}>{label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <Icon size={16} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold" style={textStyle}>{value}</p>
            <p className="text-xs mt-1" style={mutedStyle}>{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 rounded-2xl p-5 border shadow-sm" style={cardStyle}>
          <div className="mb-4">
            <h2 className="font-semibold" style={textStyle}>Ingresos últimos 7 días</h2>
            <p className="text-xs mt-0.5" style={mutedStyle}>Total: {formatCurrency(VENTAS_STATS.ingresosSemana)}</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={VENTAS_STATS.porDia} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Ingresos']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 13, background: 'var(--card)', color: 'var(--text)' }} />
              <Bar dataKey="total" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Services */}
        <div className="rounded-2xl p-5 border shadow-sm" style={cardStyle}>
          <h2 className="font-semibold mb-4" style={textStyle}>Servicios más vendidos</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={topServicios} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {topServicios.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v} servicios`, '']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 12, background: 'var(--card)', color: 'var(--text)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {topServicios.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="flex-1 truncate" style={mutedStyle}>{s.name}</span>
                <span className="font-medium" style={textStyle}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        {/* Citas hoy */}
        <div className="rounded-2xl p-5 border shadow-sm" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={textStyle}>Citas de hoy</h2>
            <span className="text-xs" style={mutedStyle}>{citasHoy.length} total · {pendientes} pendientes</span>
          </div>
          <div className="space-y-2">
            {citasHoy.slice(0, 6).map((cita) => {
              const cliente = clientesMock.find((c) => c.id === cita.clienteId)
              const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
              const empleado = personalMock.find((p) => p.id === cita.personalId)
              return (
                <div key={cita.id} className="flex items-center gap-3 p-2.5 rounded-xl transition-colors" style={{ '&:hover': { background: 'var(--row-hover)' } } as React.CSSProperties}>
                  <div className="flex items-center gap-1 text-xs w-16 flex-shrink-0" style={mutedStyle}>
                    <Clock size={11} />{cita.horaInicio}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={textStyle}>{cliente?.nombre}</p>
                    <p className="text-xs truncate" style={mutedStyle}>{servicio?.nombre} · {empleado?.nombre.split(' ')[0]}</p>
                  </div>
                  <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap', ESTADO_CITA_COLORS[cita.estado])}>
                    {ESTADO_CITA_LABELS[cita.estado]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Personal */}
        <div className="rounded-2xl p-5 border shadow-sm" style={cardStyle}>
          <h2 className="font-semibold mb-4" style={textStyle}>Personal activo hoy</h2>
          <div className="space-y-2">
            {personalMock.filter((p) => p.activo && p.rol !== 'Recepcionista').map((emp) => (
              <div key={emp.id} className="flex items-center gap-3 p-2.5 rounded-xl transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: emp.colorAvatar }}>
                  {emp.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={textStyle}>{emp.nombre}</p>
                  <p className="text-xs" style={mutedStyle}>{emp.rol}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs" style={mutedStyle}>
                    <CheckCircle2 size={11} className="text-emerald-500" />{emp.citasHoy} citas
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{formatCurrency(emp.ventasMes)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerta inventario */}
      <div className="rounded-2xl p-4 flex items-start gap-3 mb-4" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent)', opacity: 0.9 }}>
        <AlertTriangle size={18} style={{ color: 'var(--accent)' }} className="mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>Alertas de inventario</p>
          <p className="text-xs mt-0.5" style={mutedStyle}>5 productos por debajo del stock mínimo. Revisa Inventario.</p>
        </div>
      </div>
    </div>
  )
}
