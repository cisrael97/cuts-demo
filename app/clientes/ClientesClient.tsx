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
    <div className="flex flex-1 overflow-hidden">
      {/* List */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, teléfono o email..."
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors flex-shrink-0">
            <Plus size={15} />
            Nuevo cliente
          </button>
        </div>

        {/* Etiqueta filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {ETIQUETAS.map((e) => (
            <button
              key={e}
              onClick={() => setEtiquetaFilter(e)}
              className={clsx(
                'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                etiquetaFilter === e
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              )}
            >
              {e}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 self-center">{filtered.length} clientes</span>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-auto min-h-0">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Contacto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Última visita</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Visitas</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Puntos</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Etiquetas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={clsx('border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50', selected?.id === c.id && 'bg-rose-50')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{c.nombre}</p>
                        {c.etiquetas.includes('VIP') && <div className="flex items-center gap-0.5 text-amber-500 text-[10px]"><Star size={9} fill="currentColor" /> VIP</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-gray-500 text-xs"><Phone size={11} />{c.telefono}</div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5"><Mail size={11} />{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{formatDate(c.ultimaVisita)}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.totalVisitas}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400" fill="currentColor" />
                      {c.puntosFidelidad}
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

      {/* Detail — slide-over on mobile, panel on desktop */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSelected(null)} />
          <div className="fixed inset-y-0 right-0 w-80 md:static md:w-72 md:border-l md:border-gray-100 bg-white p-5 overflow-y-auto z-30 shadow-xl md:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Perfil</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
          </div>

          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold mb-2">
              {selected.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <p className="font-bold text-gray-900 text-center">{selected.nombre}</p>
            <div className="flex gap-1 mt-1.5 flex-wrap justify-center">
              {selected.etiquetas.map((e) => (
                <span key={e} className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ETIQUETA_COLORS[e])}>{e}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-1"><Star size={12} fill="currentColor" /><span className="text-xs font-semibold">Puntos</span></div>
              <p className="text-xl font-bold text-gray-900">{selected.puntosFidelidad}</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-3 text-center">
              <p className="text-xs font-semibold text-indigo-600 mb-1">Visitas</p>
              <p className="text-xl font-bold text-gray-900">{selected.totalVisitas}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs mb-4">
            <div className="flex items-center gap-2 text-gray-600"><Phone size={12} />{selected.telefono}</div>
            <div className="flex items-center gap-2 text-gray-600"><Mail size={12} />{selected.email}</div>
            <div className="text-gray-500">Última visita: {formatDate(selected.ultimaVisita)}</div>
            {selected.notasInternas && (
              <div className="bg-yellow-50 rounded-lg p-2 text-yellow-800 leading-relaxed">{selected.notasInternas}</div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Historial de citas</p>
            <div className="space-y-1.5">
              {clienteCitas.slice(0, 5).map((cita) => {
                const servicio = serviciosMock.find((s) => s.id === cita.servicioId)
                return (
                  <div key={cita.id} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: servicio?.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-800 truncate">{servicio?.nombre}</p>
                      <p className="text-[10px] text-gray-400">{formatDate(cita.fecha)}</p>
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
