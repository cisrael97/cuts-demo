export interface Cliente {
  id: string
  nombre: string
  telefono: string
  email: string
  fechaNacimiento: string
  puntosFidelidad: number
  totalVisitas: number
  ultimaVisita: string
  notasInternas: string
  etiquetas: ('VIP' | 'Nuevo' | 'Regular' | 'Inactivo')[]
}

export interface Servicio {
  id: string
  nombre: string
  categoria: 'Cabello' | 'Barba' | 'Uñas' | 'Faciales' | 'Tratamientos' | 'Otros'
  duracionMinutos: number
  precio: number
  descripcion: string
  activo: boolean
  color: string
}

export interface Empleado {
  id: string
  nombre: string
  rol: 'Estilista' | 'Barbero' | 'Manicurista' | 'Recepcionista' | 'Gerente'
  telefono: string
  email: string
  especialidades: string[]
  comisionPorcentaje: number
  ventasMes: number
  citasHoy: number
  activo: boolean
  iniciales: string
  colorAvatar: string
}

export interface Cita {
  id: string
  clienteId: string
  personalId: string
  servicioId: string
  fecha: string
  horaInicio: string
  horaFin: string
  estado: 'pendiente' | 'confirmada' | 'en_progreso' | 'completada' | 'cancelada'
  notas: string
  precio: number
}

export interface ItemVenta {
  tipo: 'servicio' | 'producto'
  referenciaId: string
  nombre: string
  cantidad: number
  precioUnitario: number
}

export interface Venta {
  id: string
  fecha: string
  clienteId: string | null
  personalId: string
  items: ItemVenta[]
  subtotal: number
  descuento: number
  total: number
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia'
  estado: 'completada' | 'cancelada'
}

export interface ProductoInventario {
  id: string
  nombre: string
  categoria: 'Shampoo' | 'Tinte' | 'Tratamiento' | 'Herramientas' | 'Consumibles'
  proveedor: string
  stockActual: number
  stockMinimo: number
  unidad: string
  precioCompra: number
  precioVenta: number
  ultimaActualizacion: string
}
