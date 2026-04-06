'use client'
import { useState } from 'react'
import { Clock, Plus, Search } from 'lucide-react'
import clsx from 'clsx'
import { serviciosMock } from '@/lib/data/servicios'
import { formatCurrency } from '@/lib/utils'
import type { Servicio } from '@/lib/types'

const CATEGORIAS = ['Todas', 'Cabello', 'Barba', 'Uñas', 'Faciales', 'Tratamientos', 'Otros'] as const

const card = { background: 'var(--card)', borderColor: 'var(--card-border)' }
const txt = { color: 'var(--text)' }
const muted = { color: 'var(--text-muted)' }
const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--card-border)' }

export default function ServiciosClient() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState<string>('Todas')
  const [servicios, setServicios] = useState(serviciosMock)

  const filtered = servicios.filter((s) => {
    const matchSearch = s.nombre.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoria === 'Todas' || s.categoria === categoria
    return matchSearch && matchCat
  })

  function toggleActivo(id: string) {
    setServicios((prev) => prev.map((s) => s.id === id ? { ...s, activo: !s.activo } : s))
  }

  return (
    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border" style={inputStyle}>
          <Search size={14} style={{ color: 'var(--text-faint)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar servicio..."
            className="flex-1 text-sm bg-transparent outline-none" style={txt} />
        </div>
        <button className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl flex-shrink-0 transition-colors"
          style={{ background: 'var(--accent)' }}>
          <Plus size={15} />Nuevo servicio
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIAS.map((c) => (
          <button key={c} onClick={() => setCategoria(c)}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-all border"
            style={categoria === c
              ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
              : { ...card, ...muted }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
        {filtered.map((s) => (
          <div key={s.id}
            className={clsx('rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md', !s.activo && 'opacity-50')}
            style={card}>
            <div className="h-1.5 w-full" style={{ background: s.color }} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-2">
                  <span className="text-[10px] font-medium uppercase tracking-wide" style={muted}>{s.categoria}</span>
                  <h3 className="font-semibold text-sm leading-tight mt-0.5" style={txt}>{s.nombre}</h3>
                </div>
                <button onClick={() => toggleActivo(s.id)}
                  className="text-xs px-2 py-0.5 rounded-full border font-medium transition-all flex-shrink-0"
                  style={s.activo
                    ? { borderColor: '#86efac', color: '#16a34a', background: '#f0fdf4' }
                    : { borderColor: 'var(--card-border)', ...muted, background: 'var(--card-alt)' }}>
                  {s.activo ? 'Activo' : 'Inactivo'}
                </button>
              </div>
              <p className="text-xs mb-3 line-clamp-2" style={muted}>{s.descripcion}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs" style={muted}>
                  <Clock size={11} />{s.duracionMinutos} min
                </div>
                <p className="text-lg font-bold" style={txt}>{formatCurrency(s.precio)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20" style={muted}>
          <p className="text-lg font-medium">Sin servicios</p>
          <p className="text-sm mt-1">Prueba con otra búsqueda o categoría</p>
        </div>
      )}
    </div>
  )
}
