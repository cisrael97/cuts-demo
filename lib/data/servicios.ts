import type { Servicio } from '@/lib/types'

export const serviciosMock: Servicio[] = [
  { id: 's1', nombre: 'Corte de cabello caballero', categoria: 'Cabello', duracionMinutos: 30, precio: 150, descripcion: 'Corte clásico o moderno para caballero', activo: true, color: '#6366f1' },
  { id: 's2', nombre: 'Corte de cabello dama', categoria: 'Cabello', duracionMinutos: 45, precio: 250, descripcion: 'Corte personalizado para dama', activo: true, color: '#6366f1' },
  { id: 's3', nombre: 'Tinte completo', categoria: 'Cabello', duracionMinutos: 90, precio: 480, descripcion: 'Aplicación de tinte en todo el cabello', activo: true, color: '#6366f1' },
  { id: 's4', nombre: 'Mechas / Balayage', categoria: 'Cabello', duracionMinutos: 120, precio: 650, descripcion: 'Técnica de aclarado o balayage', activo: true, color: '#6366f1' },
  { id: 's5', nombre: 'Peinado y secado', categoria: 'Cabello', duracionMinutos: 45, precio: 200, descripcion: 'Lavado, secado y peinado profesional', activo: true, color: '#6366f1' },
  { id: 's6', nombre: 'Tratamiento de keratina', categoria: 'Tratamientos', duracionMinutos: 120, precio: 900, descripcion: 'Alisado y nutrición con keratina', activo: true, color: '#10b981' },
  { id: 's7', nombre: 'Hidratación profunda', categoria: 'Tratamientos', duracionMinutos: 60, precio: 350, descripcion: 'Mascarilla nutritiva e hidratante', activo: true, color: '#10b981' },
  { id: 's8', nombre: 'Corte y arreglo de barba', categoria: 'Barba', duracionMinutos: 30, precio: 120, descripcion: 'Perfilado y arreglo de barba con navaja', activo: true, color: '#0891b2' },
  { id: 's9', nombre: 'Afeitado clásico con navaja', categoria: 'Barba', duracionMinutos: 45, precio: 160, descripcion: 'Afeitado tradicional con toalla caliente', activo: true, color: '#0891b2' },
  { id: 's10', nombre: 'Manicure clásico', categoria: 'Uñas', duracionMinutos: 45, precio: 180, descripcion: 'Limpieza, forma y esmaltado de uñas', activo: true, color: '#ec4899' },
  { id: 's11', nombre: 'Pedicure clásico', categoria: 'Uñas', duracionMinutos: 60, precio: 220, descripcion: 'Tratamiento completo de pies', activo: true, color: '#ec4899' },
  { id: 's12', nombre: 'Uñas de gel', categoria: 'Uñas', duracionMinutos: 75, precio: 380, descripcion: 'Extensión o recubrimiento de gel', activo: true, color: '#ec4899' },
  { id: 's13', nombre: 'Limpieza facial', categoria: 'Faciales', duracionMinutos: 60, precio: 320, descripcion: 'Limpieza profunda e hidratación facial', activo: true, color: '#f59e0b' },
  { id: 's14', nombre: 'Depilación de cejas', categoria: 'Faciales', duracionMinutos: 20, precio: 80, descripcion: 'Depilación y diseño de cejas', activo: true, color: '#f59e0b' },
  { id: 's15', nombre: 'Combo corte + barba', categoria: 'Barba', duracionMinutos: 60, precio: 250, descripcion: 'Corte de cabello y arreglo de barba', activo: true, color: '#0891b2' },
]
