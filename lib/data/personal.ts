import type { Empleado } from '@/lib/types'

export const personalMock: Empleado[] = [
  {
    id: 'p1', nombre: 'Mariana López Vidal', rol: 'Estilista',
    telefono: '55 1111 2222', email: 'mariana@cuts.mx',
    especialidades: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'],
    comisionPorcentaje: 40, ventasMes: 18500, citasHoy: 6,
    activo: true, iniciales: 'ML', colorAvatar: '#6366f1',
  },
  {
    id: 'p2', nombre: 'Ricardo Fuentes Bravo', rol: 'Barbero',
    telefono: '55 2222 3333', email: 'ricardo@cuts.mx',
    especialidades: ['s1', 's8', 's9', 's15'],
    comisionPorcentaje: 35, ventasMes: 12300, citasHoy: 8,
    activo: true, iniciales: 'RF', colorAvatar: '#0891b2',
  },
  {
    id: 'p3', nombre: 'Paola Guzmán Torres', rol: 'Manicurista',
    telefono: '55 3333 4444', email: 'paola@cuts.mx',
    especialidades: ['s10', 's11', 's12'],
    comisionPorcentaje: 38, ventasMes: 9800, citasHoy: 5,
    activo: true, iniciales: 'PG', colorAvatar: '#ec4899',
  },
  {
    id: 'p4', nombre: 'Andrés Vargas Jiménez', rol: 'Estilista',
    telefono: '55 4444 5555', email: 'andres@cuts.mx',
    especialidades: ['s1', 's2', 's3', 's5', 's13', 's14'],
    comisionPorcentaje: 40, ventasMes: 14200, citasHoy: 4,
    activo: true, iniciales: 'AV', colorAvatar: '#8b5cf6',
  },
  {
    id: 'p5', nombre: 'Daniela Ríos Salazar', rol: 'Recepcionista',
    telefono: '55 5555 6666', email: 'daniela@cuts.mx',
    especialidades: [],
    comisionPorcentaje: 0, ventasMes: 0, citasHoy: 0,
    activo: true, iniciales: 'DR', colorAvatar: '#f59e0b',
  },
  {
    id: 'p6', nombre: 'Carmen Ibáñez Romo', rol: 'Gerente',
    telefono: '55 6666 7777', email: 'carmen@cuts.mx',
    especialidades: [],
    comisionPorcentaje: 0, ventasMes: 0, citasHoy: 0,
    activo: true, iniciales: 'CI', colorAvatar: '#ef4444',
  },
]
