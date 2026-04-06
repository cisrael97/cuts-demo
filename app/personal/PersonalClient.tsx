'use client'
import { Plus, Phone, Mail, TrendingUp, CalendarDays, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import { personalMock } from '@/lib/data/personal'
import { serviciosMock } from '@/lib/data/servicios'
import { ROL_COLORS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export default function PersonalClient() {
  const activos = personalMock.filter((p) => p.activo)

  return (
    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{activos.length} empleados activos</p>
        <button className="flex items-center gap-2 bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors">
          <Plus size={15} />
          Agregar empleado
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
        {activos.map((emp) => {
          const especialidades = emp.especialidades
            .map((id) => serviciosMock.find((s) => s.id === id)?.nombre)
            .filter(Boolean)

          return (
            <div key={emp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="p-5 pb-0">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: emp.colorAvatar }}
                  >
                    {emp.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{emp.nombre}</p>
                    <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', ROL_COLORS[emp.rol])}>{emp.rol}</span>
                    <div className="flex flex-col gap-0.5 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11} />{emp.telefono}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} />{emp.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {emp.comisionPorcentaje > 0 && (
                <div className="grid grid-cols-3 gap-0 border-t border-b border-gray-100 mt-4">
                  <div className="p-3 text-center border-r border-gray-100">
                    <div className="flex items-center justify-center gap-1 text-rose-500 mb-0.5">
                      <CalendarDays size={12} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{emp.citasHoy}</p>
                    <p className="text-[10px] text-gray-400">citas hoy</p>
                  </div>
                  <div className="p-3 text-center border-r border-gray-100">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 mb-0.5">
                      <TrendingUp size={12} />
                    </div>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(emp.ventasMes)}</p>
                    <p className="text-[10px] text-gray-400">este mes</p>
                  </div>
                  <div className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{emp.comisionPorcentaje}%</p>
                    <p className="text-[10px] text-gray-400">comisión</p>
                  </div>
                </div>
              )}

              {/* Especialidades */}
              {especialidades.length > 0 && (
                <div className="p-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Especialidades</p>
                  <div className="flex flex-wrap gap-1">
                    {especialidades.slice(0, 4).map((e) => (
                      <span key={e} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{e}</span>
                    ))}
                    {especialidades.length > 4 && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{especialidades.length - 4} más</span>
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
