'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, CalendarDays, Users, Scissors,
  UserCheck, ShoppingCart, Package, LogOut, Sparkles,
} from 'lucide-react'
import clsx from 'clsx'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/citas', label: 'Citas', Icon: CalendarDays },
  { href: '/clientes', label: 'Clientes', Icon: Users },
  { href: '/servicios', label: 'Servicios', Icon: Scissors },
  { href: '/personal', label: 'Personal', Icon: UserCheck },
  { href: '/ventas', label: 'Ventas / POS', Icon: ShoppingCart },
  { href: '/inventario', label: 'Inventario', Icon: Package },
]

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-[#16213e] flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Cuts & Style</p>
          <p className="text-white/40 text-xs">ERP Estética</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold">
            CI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Carmen Ibáñez</p>
            <p className="text-white/40 text-xs">Gerente</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-3 py-2 w-full text-white/50 hover:text-white text-sm rounded-xl hover:bg-white/8 transition-all">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
