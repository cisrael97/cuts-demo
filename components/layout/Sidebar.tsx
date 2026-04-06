'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, CalendarDays, Users, Scissors,
  UserCheck, ShoppingCart, Package, LogOut, Sparkles,
} from 'lucide-react'
import { useThemeStore } from '@/lib/store/useThemeStore'

const FRASES = [
  'El estilo es una forma de decir quién eres sin hablar.',
  'Cada corte es una obra de arte.',
  'La confianza empieza en el espejo.',
  'Un buen día empieza con un buen look.',
  'Transforma vidas, un cliente a la vez.',
  'La belleza es el negocio de hacer sentir bien a las personas.',
  'El detalle marca la diferencia.',
  'Tu trabajo habla por ti — hazlo brillar.',
  'Clientes felices son la mejor publicidad.',
  'Hoy es un buen día para ser excelente.',
  'La pasión se nota en cada tijera.',
  'No hay nada más poderoso que un estilista inspirado.',
]

const frase = FRASES[Math.floor(Math.random() * FRASES.length)]

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
  const { tema, setTema } = useThemeStore()

  return (
    <aside
      className="w-60 h-full flex flex-col"
      style={{ background: 'var(--sidebar-bg)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--sidebar-logo)' }}
        >
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Cuts & Style</p>
          <p className="text-xs" style={{ color: 'var(--sidebar-text)' }}>
            {tema === 'barberia' ? 'ERP Barbería' : 'ERP Estética'}
          </p>
        </div>
      </div>

      {/* Theme switcher */}
      <div className="px-3 pt-3 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: 'var(--sidebar-text)' }}>
          Modo
        </p>
        <div
          className="grid grid-cols-2 gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <button
            onClick={() => setTema('estetica')}
            className="py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={tema === 'estetica'
              ? { background: '#c9687a', color: '#fff' }
              : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            ✿ Estética
          </button>
          <button
            onClick={() => setTema('barberia')}
            className="py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={tema === 'barberia'
              ? { background: '#D5D0AA', color: '#000000' }
              : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            ✂ Barbería
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active
                ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }
                : { color: 'var(--sidebar-text)' }
              }
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--sidebar-hover)'
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Frase motivadora */}
      <div className="px-4 py-3 mx-3 mb-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[11px] italic leading-relaxed text-center" style={{ color: 'var(--sidebar-text)' }}>
          "{frase}"
        </p>
      </div>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--accent)' }}
          >
            CI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Carmen Ibáñez</p>
            <p className="text-xs" style={{ color: 'var(--sidebar-text)' }}>Gerente</p>
          </div>
        </div>
        <button
          className="flex items-center gap-3 px-3 py-2 w-full text-sm rounded-xl transition-all"
          style={{ color: 'var(--sidebar-text)' }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
