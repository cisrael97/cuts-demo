'use client'
import { useState, useEffect } from 'react'
import { Plus, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import clsx from 'clsx'
import { useCitasStore } from '@/lib/store/useCitasStore'
import { clientesMock } from '@/lib/data/clientes'
import { serviciosMock } from '@/lib/data/servicios'
import { personalMock } from '@/lib/data/personal'
import { ESTADO_CITA_COLORS, ESTADO_CITA_LABELS } from '@/lib/constants'
import { getWeekDays, formatCurrency } from '@/lib/utils'

const HOURS = Array.from({ length: 12 }, (_, i) => i + 9)
const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function dayLabel(dateStr: string) {
  return new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric' }).format(new Date(dateStr + 'T12:00:00'))
}

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }

export default function CitasClient() {
  const { citas, updateCita } = useCitasStore()
  const [baseDate, setBaseDate] = useState('2026-04-05')
  const [view, setView] = useState<'semana' | 'lista'>('lista')
  const [selectedCita, setSelectedCita] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setView('lista')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const weekDays = getWeekDays(baseDate)

  function prevWeek() {
    const d = new Date(baseDate + 'T12:00:00'); d.setDate(d.getDate() - 7)
    setBaseDate(d.toISOString().split('T')[0])
  }
  function nextWeek() {
    const d = new Date(baseDate + 'T12:00:00'); d.setDate(d.getDate() + 7)
    setBaseDate(d.toISOString().split('T')[0])
  }

  const selected = selectedCita ? citas.find((c) => c.id === selectedCita) : null

  return (
    <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
      <div className="flex-1 flex flex-col p-3 md:p-6 md:overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="hidden md:flex items-center gap-1 rounded-xl p-1 border" style={card}>
            {(['semana', 'lista'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 text-sm rounded-lg font-medium transition-all capitalize"
                style={view === v ? { background: 'var(--accent)', color: '#fff' } : muted}>
                {v === 'semana' ? 'Semana' : 'Lista'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-xl p-1 border" style={card}>
            <button onClick={prevWeek} className="p-1.5 rounded-lg transition-colors" style={muted}><ChevronLeft size={16} /></button>
            <span className="text-sm font-medium px-2 min-w-[160px] text-center" style={txt}>
              {dayLabel(weekDays[0])} — {dayLabel(weekDays[5])}
            </span>
            <button onClick={nextWeek} className="p-1.5 rounded-lg transition-colors" style={muted}><ChevronRight size={16} /></button>
          </div>
          <button className="ml-auto flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            style={{ background: 'var(--accent)' }}>
            <Plus size={15} />Nueva cita
          </button>
        </div>

        {view === 'semana' ? (
          <div className="flex-1 rounded-2xl border shadow-sm overflow-auto" style={card}>
            {/* Header */}
            <div className="grid sticky top-0 z-10" style={{ gridTemplateColumns: '60px repeat(6, 1fr)', background: 'var(--card)', borderBottom: '1px solid var(--card-border)' }}>
              <div style={{ borderRight: '1px solid var(--card-border)' }} />
              {weekDays.map((d, i) => (
                <div key={d} className="py-3 text-center text-xs font-semibold" style={{ borderRight: i < 5 ? '1px solid var(--card-border)' : undefined, color: d === '2026-04-05' ? 'var(--accent)' : 'var(--text-muted)' }}>
                  <div>{DAY_LABELS[i]}</div>
                  <div className="text-lg font-bold mt-0.5" style={{ color: d === '2026-04-05' ? 'var(--accent)' : 'var(--text)' }}>
                    {new Date(d + 'T12:00:00').getDate()}
                  </div>
                </div>
              ))}
            </div>
            {HOURS.map((hour) => (
              <div key={hour} className="grid" style={{ gridTemplateColumns: '60px repeat(6, 1fr)', minHeight: 64, borderBottom: '1px solid var(--card-border)' }}>
                <div className="py-2 px-2 text-xs text-right flex-shrink-0 pt-1.5" style={{ borderRight: '1px solid var(--card-border)', color: 'var(--text-faint)' }}>{hour}:00</div>
                {weekDays.map((day, di) => {
                  const dayCitas = citas.filter((c) => { const [h] = c.horaInicio.split(':').map(Number); return c.fecha === day && h === hour })
                  return (
                    <div key={day} className="relative p-1 min-h-[64px]" style={{ borderRight: di < 5 ? '1px solid var(--card-border)' : undefined }}>
                      {dayCitas.map((cita) => {
                        const cliente = clientesMock.find((cl) => cl.id === cita.clienteId)
                        const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                        const [sh, sm] = cita.horaInicio.split(':').map(Number)
                        const [eh, em] = cita.horaFin.split(':').map(Number)
                        const durMin = (eh * 60 + em) - (sh * 60 + sm)
                        return (
                          <button key={cita.id} onClick={() => setSelectedCita(cita.id)}
                            className="w-full text-left rounded-lg p-1.5 text-white text-[10px] leading-tight mb-1 hover:opacity-90 transition-opacity"
                            style={{ background: servicio?.color ?? 'var(--accent)', minHeight: Math.max(durMin * 0.8, 28) }}>
                            <div className="font-semibold truncate">{cliente?.nombre.split(' ')[0]}</div>
                            <div className="opacity-80 truncate">{servicio?.nombre}</div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 space-y-2 overflow-y-auto">
            {citas.filter((c) => c.fecha >= weekDays[0] && c.fecha <= weekDays[5])
              .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaInicio.localeCompare(b.horaInicio))
              .map((cita) => {
                const cliente = clientesMock.find((cl) => cl.id === cita.clienteId)
                const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                const empleado = personalMock.find((p) => p.id === cita.personalId)
                return (
                  <button key={cita.id} onClick={() => setSelectedCita(cita.id)}
                    className="w-full rounded-xl border p-4 flex items-center gap-4 text-left transition-all"
                    style={{ ...card, outline: selectedCita === cita.id ? `2px solid var(--accent)` : undefined }}>
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: servicio?.color ?? 'var(--accent)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium" style={txt}>{cliente?.nombre}</p>
                        <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ESTADO_CITA_COLORS[cita.estado])}>
                          {ESTADO_CITA_LABELS[cita.estado]}
                        </span>
                      </div>
                      <p className="text-sm" style={muted}>{servicio?.nombre} · con {empleado?.nombre.split(' ')[0]}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm justify-end" style={muted}><Clock size={12} />{cita.horaInicio} – {cita.horaFin}</div>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{new Date(cita.fecha + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div className="text-sm font-semibold flex-shrink-0 w-20 text-right" style={txt}>{formatCurrency(cita.precio)}</div>
                  </button>
                )
              })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && !isMobile && (() => {
        const cliente = clientesMock.find((c) => c.id === selected.clienteId)
        const servicio = serviciosMock.find((s) => s.id === selected.servicioId)
        const empleado = personalMock.find((p) => p.id === selected.personalId)
        return (
          <div className="w-72 p-5 overflow-y-auto flex flex-col gap-4" style={{ background: 'var(--card)', borderLeft: '1px solid var(--card-border)' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={txt}>Detalle de cita</h3>
              <button onClick={() => setSelectedCita(null)} className="text-lg" style={muted}>×</button>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: servicio?.color }} />
            <div className="space-y-3 text-sm">
              {[
                { label: 'Cliente', value: cliente?.nombre, sub: cliente?.telefono },
                { label: 'Servicio', value: servicio?.nombre, sub: `${servicio?.duracionMinutos} min` },
                { label: 'Estilista', value: empleado?.nombre },
              ].map(({ label, value, sub }) => (
                <div key={label}>
                  <p className="text-xs mb-0.5" style={muted}>{label}</p>
                  <p className="font-medium" style={txt}>{value}</p>
                  {sub && <p className="text-xs" style={muted}>{sub}</p>}
                </div>
              ))}
              <div className="flex gap-4">
                <div><p className="text-xs mb-0.5" style={muted}>Fecha</p><p className="font-medium" style={txt}>{new Date(selected.fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</p></div>
                <div><p className="text-xs mb-0.5" style={muted}>Horario</p><p className="font-medium" style={txt}>{selected.horaInicio} – {selected.horaFin}</p></div>
              </div>
              <div><p className="text-xs mb-0.5" style={muted}>Precio</p><p className="font-bold text-base" style={{ color: 'var(--accent)' }}>{formatCurrency(selected.precio)}</p></div>
              {selected.notas && <div><p className="text-xs mb-0.5" style={muted}>Notas</p><p className="text-xs leading-relaxed" style={muted}>{selected.notas}</p></div>}
            </div>
            <span className={clsx('self-start text-xs font-medium px-3 py-1.5 rounded-full', ESTADO_CITA_COLORS[selected.estado])}>
              {ESTADO_CITA_LABELS[selected.estado]}
            </span>
            <div className="space-y-2 mt-auto">
              <p className="text-xs font-medium" style={muted}>Cambiar estado</p>
              {(['confirmada', 'en_progreso', 'completada', 'cancelada'] as const).filter((e) => e !== selected.estado).map((estado) => (
                <button key={estado} onClick={() => updateCita(selected.id, { estado })}
                  className={clsx('w-full text-xs font-medium px-3 py-2 rounded-xl border transition-all hover:opacity-80', ESTADO_CITA_COLORS[estado])}>
                  Marcar como {ESTADO_CITA_LABELS[estado]}
                </button>
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
