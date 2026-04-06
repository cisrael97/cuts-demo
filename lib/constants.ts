export const ESTADO_CITA_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  en_progreso: 'En progreso',
  completada: 'Completada',
  cancelada: 'Cancelada',
}

export const ESTADO_CITA_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-blue-100 text-blue-800',
  en_progreso: 'bg-purple-100 text-purple-800',
  completada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
}

export const METODO_PAGO_LABELS: Record<string, string> = {
  efectivo: 'Efectivo',
  tarjeta: 'Tarjeta',
  transferencia: 'Transferencia',
}

export const CATEGORIA_SERVICIO_COLORS: Record<string, string> = {
  Cabello: '#6366f1',
  Barba: '#0891b2',
  Uñas: '#ec4899',
  Faciales: '#f59e0b',
  Tratamientos: '#10b981',
  Otros: '#6b7280',
}

export const ROL_COLORS: Record<string, string> = {
  Estilista: 'bg-indigo-100 text-indigo-800',
  Barbero: 'bg-cyan-100 text-cyan-800',
  Manicurista: 'bg-pink-100 text-pink-800',
  Recepcionista: 'bg-amber-100 text-amber-800',
  Gerente: 'bg-rose-100 text-rose-800',
}

export const ETIQUETA_COLORS: Record<string, string> = {
  VIP: 'bg-amber-100 text-amber-800',
  Nuevo: 'bg-green-100 text-green-800',
  Regular: 'bg-blue-100 text-blue-800',
  Inactivo: 'bg-gray-100 text-gray-600',
}

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/citas', label: 'Citas', icon: 'CalendarDays' },
  { href: '/clientes', label: 'Clientes', icon: 'Users' },
  { href: '/servicios', label: 'Servicios', icon: 'Scissors' },
  { href: '/personal', label: 'Personal', icon: 'UserCheck' },
  { href: '/ventas', label: 'Ventas / POS', icon: 'ShoppingCart' },
  { href: '/inventario', label: 'Inventario', icon: 'Package' },
]
