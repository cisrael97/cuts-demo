'use client'
import { useState } from 'react'
import { Search, Star, Phone, Mail, Plus } from 'lucide-react'
import clsx from 'clsx'
import { clientesMock } from '@/lib/data/clientes'
import { citasMock } from '@/lib/data/citas'
import { serviciosMock } from '@/lib/data/servicios'
import { ETIQUETA_COLORS, ESTADO_CITA_COLORS, ESTADO_CITA_LABELS } from '@/lib/constants'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Cliente } from '@/lib/types'

const ETIQUETAS = ['Todas', 'VIP', 'Nuevo', 'Regular', 'Inactivo'] as const

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }
const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--card-border)' }

export default function ClientesClient() {
  const [search, setSearch] = useState('')
  const [etiquetaFilter, setEtiquetaFilter] = useState<string>('Todas')
  const [selected, setSelected] = useState<Cliente | null>(null)

  const filtered = clientesMock.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.telefono.includes(search) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchEtiqueta = etiquetaFilter === 'Todas' || c.etiquetas.includes(etiquetaFilter as Cliente['etiquetas'][number])
    return matchSearch && matchEtiqueta
  })

  const clienteCitas = selected
    ? citasMock.filter((c) => c.clienteId === selected.id).sort((a, b) => b.fecha.localeCompare(a.fecha))
    : []

  return (
    <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
      <div className="flex-1 flex flex-col p-3 md:p-6 md:overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border" style={inputStyle}>
            <Search size={14} style={{ color: 'var(--text-faint)' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, teléfono o email..."
              className="flex-1 text-sm bg-transparent outline-none" style={txt} />
          </div>
          <button className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl flex-shrink-0 transition-colors"
            style={{ background: 'var(--accent)' }}>
            <Plus size={15} />Nuevo
          </button>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {ETIQUETAS.map((e) => (
            <button key={e} onClick={() => setEtiquetaFilter(e)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-all border"
              style={etiquetaFilter === e
                ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
                : { ...card, ...muted }}>
              {e}
            </button>
          ))}
          <span className="ml-auto text-xs self-center" style={muted}>{filtered.length} clientes</span>
        </div>

        <div className="flex-1 rounded-2xl border shadow-sm overflow-auto min-h-0" style={card}>
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                {['Cliente', 'Contacto', 'Última visita', 'Visitas', 'Puntos', 'Etiquetas'].map((h, i) => (
                  <th key={h} className={clsx('text-left px-4 py-3 text-xs font-semibold',
                    i === 1 && 'hidden md:table-cell', i === 2 && 'hidden lg:table-cell', i === 4 && 'hidden lg:table-cell')}
                    style={muted}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} onClick={() => setSelected(c)}
                  className="cursor-pointer transition-colors"
                  style={{
                    borderBottom: '1px solid var(--card-border)',
                    background: selected?.id === c.id ? 'var(--accent-light)' : undefined,
                  }}
                  onMouseEnter={(e) => { if (selected?.id !== c.id) (e.currentTarget as HTMLElement).style.background = 'var(--row-hover)' }}
                  onMouseLeave={(e) => { if (selected?.id !== c.id) (e.currentTarget as HTMLElement).style.background = '' }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-medium" style={txt}>{c.nombre}</p>
                        {c.etiquetas.includes('VIP') && <div className="flex items-center gap-0.5 text-amber-500 text-[10px]"><Star size={9} fill="currentColor" /> VIP</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-xs" style={muted}><Phone size={11} />{c.telefono}</div>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}><Mail size={11} />{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs hidden lg:table-cell" style={muted}>{formatDate(c.ultimaVisita)}</td>
                  <td className="px-4 py-3 font-medium" style={txt}>{c.totalVisitas}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400" fill="currentColor" />
                      <span style={txt}>{c.puntosFidelidad}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {c.etiquetas.map((e) => (
                        <span key={e} className={clsx('text-[10px] font-medium px-1.5 py-0.5 rounded-full', ETIQUETA_COLORS[e])}>{e}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSelected(null)} />
          <div
            className="fixed inset-y-0 right-0 w-80 md:static md:w-72 p-5 overflow-y-auto z-30 shadow-xl md:shadow-none"
            style={{ background: 'var(--card)', borderLeft: '1px solid var(--card-border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={txt}>Perfil</h3>
              <button onClick={() => setSelected(null)} className="text-lg" style={muted}>×</button>
            </div>

            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold mb-2">
                {selected.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <p className="font-bold text-center" style={txt}>{selected.nombre}</p>
              <div className="flex gap-1 mt-1.5 flex-wrap justify-center">
                {selected.etiquetas.map((e) => (
                  <span key={e} className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ETIQUETA_COLORS[e])}>{e}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--accent-light)' }}>
                <div className="flex items-center justify-center gap-1 mb-1" style={{ color: 'var(--accent)' }}>
                  <Star size={12} fill="currentColor" /><span className="text-xs font-semibold">Puntos</span>
                </div>
                <p className="text-xl font-bold" style={txt}>{selected.puntosFidelidad}</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--input-bg)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-text)' }}>Visitas</p>
                <p className="text-xl font-bold" style={txt}>{selected.totalVisitas}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex items-center gap-2" style={muted}><Phone size={12} />{selected.telefono}</div>
              <div className="flex items-center gap-2" style={muted}><Mail size={12} />{selected.email}</div>
              <div style={muted}>Última visita: {formatDate(selected.ultimaVisita)}</div>
              {selected.notasInternas && (
                <div className="rounded-lg p-2 text-xs leading-relaxed" style={{ background: 'var(--card-alt)', color: 'var(--text-muted)' }}>
                  {selected.notasInternas}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold mb-2" style={muted}>Historial de citas</p>
              <div className="space-y-1.5">
                {clienteCitas.slice(0, 5).map((cita) => {
                  const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                  return (
                    <div key={cita.id} className="flex items-center gap-2 py-1.5" style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: servicio?.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate" style={txt}>{servicio?.nombre}</p>
                        <p className="text-[10px]" style={muted}>{formatDate(cita.fecha)}</p>
                      </div>
                      <span className={clsx('text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0', ESTADO_CITA_COLORS[cita.estado])}>
                        {ESTADO_CITA_LABELS[cita.estado]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
