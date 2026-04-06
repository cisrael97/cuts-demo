import type { Venta } from '@/lib/types'

export const ventasMock: Venta[] = [
  { id: 'v1', fecha: '2026-04-05T10:30:00', clienteId: 'c2', personalId: 'p2', items: [{ tipo: 'servicio', referenciaId: 's15', nombre: 'Combo corte + barba', cantidad: 1, precioUnitario: 250 }], subtotal: 250, descuento: 0, total: 250, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v2', fecha: '2026-04-04T11:00:00', clienteId: 'c7', personalId: 'p4', items: [{ tipo: 'servicio', referenciaId: 's13', nombre: 'Limpieza facial', cantidad: 1, precioUnitario: 320 }], subtotal: 320, descuento: 0, total: 320, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v3', fecha: '2026-04-04T12:30:00', clienteId: 'c9', personalId: 'p3', items: [{ tipo: 'servicio', referenciaId: 's12', nombre: 'Uñas de gel', cantidad: 1, precioUnitario: 380 }, { tipo: 'servicio', referenciaId: 's10', nombre: 'Manicure clásico', cantidad: 1, precioUnitario: 180 }], subtotal: 560, descuento: 50, total: 510, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v4', fecha: '2026-04-03T09:00:00', clienteId: 'c4', personalId: 'p2', items: [{ tipo: 'servicio', referenciaId: 's1', nombre: 'Corte caballero', cantidad: 1, precioUnitario: 150 }], subtotal: 150, descuento: 0, total: 150, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v5', fecha: '2026-04-03T14:00:00', clienteId: 'c3', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's4', nombre: 'Mechas / Balayage', cantidad: 1, precioUnitario: 650 }], subtotal: 650, descuento: 0, total: 650, metodoPago: 'transferencia', estado: 'completada' },
  { id: 'v6', fecha: '2026-04-02T10:00:00', clienteId: 'c11', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's2', nombre: 'Corte dama', cantidad: 1, precioUnitario: 250 }, { tipo: 'servicio', referenciaId: 's5', nombre: 'Peinado y secado', cantidad: 1, precioUnitario: 200 }], subtotal: 450, descuento: 0, total: 450, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v7', fecha: '2026-04-02T16:00:00', clienteId: null, personalId: 'p2', items: [{ tipo: 'servicio', referenciaId: 's8', nombre: 'Corte y arreglo de barba', cantidad: 1, precioUnitario: 120 }], subtotal: 120, descuento: 0, total: 120, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v8', fecha: '2026-04-01T09:00:00', clienteId: 'c2', personalId: 'p2', items: [{ tipo: 'servicio', referenciaId: 's8', nombre: 'Corte y arreglo de barba', cantidad: 1, precioUnitario: 120 }], subtotal: 120, descuento: 0, total: 120, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v9', fecha: '2026-04-01T11:00:00', clienteId: 'c1', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's3', nombre: 'Tinte completo', cantidad: 1, precioUnitario: 480 }], subtotal: 480, descuento: 0, total: 480, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v10', fecha: '2026-03-31T10:00:00', clienteId: 'c5', personalId: 'p4', items: [{ tipo: 'servicio', referenciaId: 's2', nombre: 'Corte dama', cantidad: 1, precioUnitario: 250 }], subtotal: 250, descuento: 0, total: 250, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v11', fecha: '2026-03-31T13:00:00', clienteId: 'c7', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's6', nombre: 'Keratina', cantidad: 1, precioUnitario: 900 }], subtotal: 900, descuento: 0, total: 900, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v12', fecha: '2026-03-30T09:30:00', clienteId: 'c8', personalId: 'p2', items: [{ tipo: 'servicio', referenciaId: 's15', nombre: 'Combo corte + barba', cantidad: 1, precioUnitario: 250 }], subtotal: 250, descuento: 25, total: 225, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v13', fecha: '2026-03-29T12:00:00', clienteId: 'c3', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's7', nombre: 'Hidratación profunda', cantidad: 1, precioUnitario: 350 }], subtotal: 350, descuento: 0, total: 350, metodoPago: 'tarjeta', estado: 'completada' },
  { id: 'v14', fecha: '2026-03-28T11:00:00', clienteId: 'c1', personalId: 'p1', items: [{ tipo: 'servicio', referenciaId: 's5', nombre: 'Peinado y secado', cantidad: 1, precioUnitario: 200 }], subtotal: 200, descuento: 0, total: 200, metodoPago: 'efectivo', estado: 'completada' },
  { id: 'v15', fecha: '2026-03-28T13:00:00', clienteId: 'c9', personalId: 'p3', items: [{ tipo: 'servicio', referenciaId: 's10', nombre: 'Manicure clásico', cantidad: 1, precioUnitario: 180 }], subtotal: 180, descuento: 0, total: 180, metodoPago: 'tarjeta', estado: 'completada' },
]

// Pre-computed stats for dashboard
export const VENTAS_STATS = {
  ingresosHoy: 250,
  ingresosSemana: 2050,
  ingresosMes: 5455,
  ingresosMesAnterior: 4800,
  ventasHoy: 1,
  ticketPromedio: Math.round(5455 / 15),
  // Daily data for chart (last 7 days)
  porDia: [
    { dia: 'Dom 29', total: 350 },
    { dia: 'Lun 30', total: 225 },
    { dia: 'Mar 31', total: 1150 },
    { dia: 'Mié 1', total: 600 },
    { dia: 'Jue 2', total: 570 },
    { dia: 'Vie 3', total: 800 },
    { dia: 'Sáb 4', total: 830 },
  ],
}
