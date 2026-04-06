'use client'
import { useState, useEffect } from 'react'
import { Plus, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react'
import clsx from 'clsx'
import { useCitasStore } from '@/lib/store/useCitasStore'
import { clientesMock } from '@/lib/data/clientes'
import { serviciosMock } from '@/lib/data/servicios'
import { personalMock } from '@/lib/data/personal'
import { ESTADO_CITA_COLORS, ESTADO_CITA_LABELS } from '@/lib/constants'
import { getWeekDays, formatCurrency } from '@/lib/utils'

const HOURS = Array.from({ length: 12 }, (_, i) => i + 9) // 9:00 - 20:00

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function dayLabel(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric' }).format(d)
}

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
    const d = new Date(baseDate + 'T12:00:00')
    d.setDate(d.getDate() - 7)
    setBaseDate(d.toISOString().split('T')[0])
  }
  function nextWeek() {
    const d = new Date(baseDate + 'T12:00:00')
    d.setDate(d.getDate() + 7)
    setBaseDate(d.toISOString().split('T')[0])
  }

  const selected = selectedCita ? citas.find((c) => c.id === selectedCita) : null

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            <button onClick={() => setView('semana')} className={clsx('px-3 py-1.5 text-sm rounded-lg font-medium transition-all', view === 'semana' ? 'bg-rose-500 text-white' : 'text-gray-600 hover:bg-gray-50')}>Semana</button>
            <button onClick={() => setView('lista')} className={clsx('px-3 py-1.5 text-sm rounded-lg font-medium transition-all', view === 'lista' ? 'bg-rose-500 text-white' : 'text-gray-600 hover:bg-gray-50')}>Lista</button>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            <button onClick={prevWeek} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg"><ChevronLeft size={16} /></button>
            <span className="text-sm font-medium text-gray-700 px-2 min-w-[160px] text-center">
              {dayLabel(weekDays[0])} — {dayLabel(weekDays[5])}
            </span>
            <button onClick={nextWeek} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg"><ChevronRight size={16} /></button>
          </div>
          <button className="ml-auto flex items-center gap-2 bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors">
            <Plus size={15} />
            Nueva cita
          </button>
        </div>

        {view === 'semana' ? (
          /* Calendar Grid */
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-auto">
            {/* Header */}
            <div className="grid sticky top-0 bg-white border-b border-gray-100 z-10" style={{ gridTemplateColumns: '60px repeat(6, 1fr)' }}>
              <div className="border-r border-gray-100" />
              {weekDays.map((d, i) => (
                <div key={d} className={clsx('py-3 text-center text-xs font-semibold border-r border-gray-100 last:border-r-0', d === '2026-04-05' ? 'text-rose-500' : 'text-gray-500')}>
                  <div>{DAY_LABELS[i]}</div>
                  <div className={clsx('text-lg font-bold mt-0.5', d === '2026-04-05' ? 'text-rose-500' : 'text-gray-800')}>
                    {new Date(d + 'T12:00:00').getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            {HOURS.map((hour) => (
              <div key={hour} className="grid border-b border-gray-50 last:border-b-0" style={{ gridTemplateColumns: '60px repeat(6, 1fr)', minHeight: 64 }}>
                <div className="py-2 px-2 text-xs text-gray-400 text-right border-r border-gray-100 flex-shrink-0 pt-1.5">
                  {hour}:00
                </div>
                {weekDays.map((day) => {
                  const dayCitas = citas.filter((c) => {
                    const [h] = c.horaInicio.split(':').map(Number)
                    return c.fecha === day && h === hour
                  })
                  return (
                    <div key={day} className="border-r border-gray-50 last:border-r-0 relative p-1 min-h-[64px]">
                      {dayCitas.map((cita) => {
                        const cliente = clientesMock.find((cl) => cl.id === cita.clienteId)
                        const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                        const [sh, sm] = cita.horaInicio.split(':').map(Number)
                        const [eh, em] = cita.horaFin.split(':').map(Number)
                        const durMin = (eh * 60 + em) - (sh * 60 + sm)
                        return (
                          <button
                            key={cita.id}
                            onClick={() => setSelectedCita(cita.id)}
                            className="w-full text-left rounded-lg p-1.5 text-white text-[10px] leading-tight mb-1 hover:opacity-90 transition-opacity"
                            style={{ background: servicio?.color ?? '#6366f1', minHeight: Math.max(durMin * 0.8, 28) }}
                          >
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
          /* Lista */
          <div className="flex-1 space-y-2 overflow-y-auto">
            {citas
              .filter((c) => c.fecha >= weekDays[0] && c.fecha <= weekDays[5])
              .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaInicio.localeCompare(b.horaInicio))
              .map((cita) => {
                const cliente = clientesMock.find((cl) => cl.id === cita.clienteId)
                const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                const empleado = personalMock.find((p) => p.id === cita.personalId)
                return (
                  <button
                    key={cita.id}
                    onClick={() => setSelectedCita(cita.id)}
                    className="w-full bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:border-rose-200 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: servicio?.color ?? '#6366f1' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{cliente?.nombre}</p>
                        <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ESTADO_CITA_COLORS[cita.estado])}>
                          {ESTADO_CITA_LABELS[cita.estado]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{servicio?.nombre} · con {empleado?.nombre.split(' ')[0]}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm text-gray-600 justify-end">
                        <Clock size={12} />
                        {cita.horaInicio} – {cita.horaFin}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(cita.fecha + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 flex-shrink-0 w-20 text-right">
                      {formatCurrency(cita.precio)}
                    </div>
                  </button>
                )
              })}
          </div>
        )}
      </div>

      {/* Detail Panel — hidden on mobile */}
      {selected && !isMobile && (() => {
        const cliente = clientesMock.find((c) => c.id === selected.clienteId)
        const servicio = serviciosMock.find((s) => s.id === selected.servicioId)
        const empleado = personalMock.find((p) => p.id === selected.personalId)
        return (
          <div className="w-72 border-l border-gray-100 bg-white p-5 overflow-y-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Detalle de cita</h3>
              <button onClick={() => setSelectedCita(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>

            <div className="w-full h-1.5 rounded-full" style={{ background: servicio?.color }} />

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Cliente</p>
                <p className="font-medium text-gray-900">{cliente?.nombre}</p>
                <p className="text-gray-500 text-xs">{cliente?.telefono}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Servicio</p>
                <p className="font-medium text-gray-900">{servicio?.nombre}</p>
                <p className="text-gray-500 text-xs">{servicio?.duracionMinutos} min</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Estilista</p>
                <p className="font-medium text-gray-900">{empleado?.nombre}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Fecha</p>
                  <p className="font-medium text-gray-900">{new Date(selected.fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Horario</p>
                  <p className="font-medium text-gray-900">{selected.horaInicio} – {selected.horaFin}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Precio</p>
                <p className="font-bold text-gray-900 text-base">{formatCurrency(selected.precio)}</p>
              </div>
              {selected.notas && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Notas</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{selected.notas}</p>
                </div>
              )}
            </div>

            <span className={clsx('self-start text-xs font-medium px-3 py-1.5 rounded-full', ESTADO_CITA_COLORS[selected.estado])}>
              {ESTADO_CITA_LABELS[selected.estado]}
            </span>

            <div className="space-y-2 mt-auto">
              <p className="text-xs text-gray-400 font-medium">Cambiar estado</p>
              {(['confirmada', 'en_progreso', 'completada', 'cancelada'] as const).filter((e) => e !== selected.estado).map((estado) => (
                <button
                  key={estado}
                  onClick={() => updateCita(selected.id, { estado })}
                  className={clsx('w-full text-xs font-medium px-3 py-2 rounded-xl border transition-all', ESTADO_CITA_COLORS[estado], 'hover:opacity-80')}
                >
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
