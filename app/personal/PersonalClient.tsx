'use client'
import { Plus, Phone, Mail, TrendingUp, CalendarDays, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import { personalMock } from '@/lib/data/personal'
import { serviciosMock } from '@/lib/data/servicios'
import { ROL_COLORS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }

export default function PersonalClient() {
  const activos = personalMock.filter((p) => p.activo)

  return (
    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={muted}>{activos.length} empleados activos</p>
        <button className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          style={{ background: 'var(--accent)' }}>
          <Plus size={15} />Agregar empleado
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
        {activos.map((emp) => {
          const especialidades = emp.especialidades
            .map((id) => serviciosMock.find((s) => s.id === id)?.nombre)
            .filter(Boolean)

          return (
            <div key={emp.id} className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow" style={card}>
              <div className="p-5 pb-0">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: emp.colorAvatar }}>
                    {emp.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold" style={txt}>{emp.nombre}</p>
                    <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ROL_COLORS[emp.rol])}>{emp.rol}</span>
                    <div className="flex flex-col gap-0.5 mt-2">
                      <div className="flex items-center gap-1.5 text-xs" style={muted}><Phone size={11} />{emp.telefono}</div>
                      <div className="flex items-center gap-1.5 text-xs" style={muted}><Mail size={11} />{emp.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {emp.comisionPorcentaje > 0 && (
                <div className="grid grid-cols-3 gap-0 mt-4" style={{ borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
                  {[
                    { Icon: CalendarDays, value: emp.citasHoy, label: 'citas hoy', color: 'var(--accent)' },
                    { Icon: TrendingUp, value: formatCurrency(emp.ventasMes), label: 'este mes', color: '#10b981' },
                    { Icon: CheckCircle2, value: `${emp.comisionPorcentaje}%`, label: 'comisión', color: '#f59e0b' },
                  ].map(({ Icon, value, label, color }, i) => (
                    <div key={i} className="p-3 text-center" style={i < 2 ? { borderRight: '1px solid var(--card-border)' } : {}}>
                      <div className="flex items-center justify-center mb-0.5"><Icon size={12} style={{ color }} /></div>
                      <p className="text-sm font-bold" style={txt}>{value}</p>
                      <p className="text-[10px]" style={muted}>{label}</p>
                    </div>
                  ))}
                </div>
              )}

              {especialidades.length > 0 && (
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-faint)' }}>Especialidades</p>
                  <div className="flex flex-wrap gap-1">
                    {especialidades.slice(0, 4).map((e) => (
                      <span key={e} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--input-bg)', color: 'var(--text-muted)' }}>{e}</span>
                    ))}
                    {especialidades.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--input-bg)', color: 'var(--text-faint)' }}>+{especialidades.length - 4} más</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
