'use client'
import { useState } from 'react'
import { Clock, Plus, Search } from 'lucide-react'
import clsx from 'clsx'
import { serviciosMock } from '@/lib/data/servicios'
import { formatCurrency } from '@/lib/utils'
import type { Servicio } from '@/lib/types'

const CATEGORIAS = ['Todas', 'Cabello', 'Barba', 'Uñas', 'Faciales', 'Tratamientos', 'Otros'] as const

export default function ServiciosClient() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState<string>('Todas')
  const [servicios, setServicios] = useState(serviciosMock)
  const [editing, setEditing] = useState<Servicio | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = servicios.filter((s) => {
    const matchSearch = s.nombre.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoria === 'Todas' || s.categoria === categoria
    return matchSearch && matchCat
  })

  function toggleActivo(id: string) {
    setServicios((prev) => prev.map((s) => s.id === id ? { ...s, activo: !s.activo } : s))
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar servicio..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors flex-shrink-0">
          <Plus size={15} />
          Nuevo servicio
        </button>
      </div>

      {/* Categoria tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={clsx(
              'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
              categoria === c
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className={clsx('bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md', !s.activo && 'opacity-50', s.activo ? 'border-gray-100' : 'border-dashed border-gray-200')}>
            {/* Color bar */}
            <div className="h-1.5 w-full" style={{ background: s.color }} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{s.categoria}</span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-0.5">{s.nombre}</h3>
                </div>
                <button
                  onClick={() => toggleActivo(s.id)}
                  className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium transition-all flex-shrink-0', s.activo ? 'border-green-300 text-green-700 bg-green-50' : 'border-gray-300 text-gray-500 bg-gray-50')}
                >
                  {s.activo ? 'Activo' : 'Inactivo'}
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.descripcion}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={11} />
                  {s.duracionMinutos} min
                </div>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(s.precio)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">Sin servicios</p>
          <p className="text-sm mt-1">Prueba con otra búsqueda o categoría</p>
        </div>
      )}
    </div>
  )
}
