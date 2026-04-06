'use client'
import { Bell, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  subtitle?: string
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const now = new Date()
  const dateStr = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center pl-14 pr-4 md:px-6 gap-4 sticky top-0 z-10">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
        <Search size={14} className="text-gray-400" />
        <input
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          placeholder="Buscar..."
        />
      </div>

      {/* Date */}
      <span className="hidden lg:block text-sm text-gray-500 capitalize">{dateStr}</span>

      {/* Notifications */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
        <Bell size={16} className="text-gray-600" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">5</span>
      </button>
    </header>
  )
}
