import type { Cita } from '@/lib/types'

// Base: week of 2026-03-30 to 2026-04-04 + today 2026-04-05
export const citasMock: Cita[] = [
  // Hoy (Domingo 2026-04-05)
  { id: 'cita1', clienteId: 'c1', personalId: 'p1', servicioId: 's3', fecha: '2026-04-05', horaInicio: '10:00', horaFin: '11:30', estado: 'confirmada', notas: 'Tinte rubio cenizo', precio: 480 },
  { id: 'cita2', clienteId: 'c2', personalId: 'p2', servicioId: 's15', fecha: '2026-04-05', horaInicio: '10:00', horaFin: '11:00', estado: 'completada', notas: '', precio: 250 },
  { id: 'cita3', clienteId: 'c3', personalId: 'p1', servicioId: 's4', fecha: '2026-04-05', horaInicio: '12:00', horaFin: '14:00', estado: 'confirmada', notas: 'Balayage dorado', precio: 650 },
  { id: 'cita4', clienteId: 'c9', personalId: 'p3', servicioId: 's12', fecha: '2026-04-05', horaInicio: '11:00', horaFin: '12:15', estado: 'en_progreso', notas: 'Uñas rosa nude', precio: 380 },
  { id: 'cita5', clienteId: 'c7', personalId: 'p4', servicioId: 's13', fecha: '2026-04-05', horaInicio: '13:00', horaFin: '14:00', estado: 'pendiente', notas: '', precio: 320 },
  { id: 'cita6', clienteId: 'c5', personalId: 'p1', servicioId: 's6', fecha: '2026-04-05', horaInicio: '15:00', horaFin: '17:00', estado: 'confirmada', notas: 'Keratina por primera vez', precio: 900 },
  { id: 'cita7', clienteId: 'c11', personalId: 'p3', servicioId: 's10', fecha: '2026-04-05', horaInicio: '14:00', horaFin: '14:45', estado: 'pendiente', notas: '', precio: 180 },
  { id: 'cita8', clienteId: 'c8', personalId: 'p2', servicioId: 's8', fecha: '2026-04-05', horaInicio: '16:00', horaFin: '16:30', estado: 'confirmada', notas: '', precio: 120 },
  // Lunes 2026-04-06
  { id: 'cita9', clienteId: 'c4', personalId: 'p2', servicioId: 's9', fecha: '2026-04-06', horaInicio: '10:00', horaFin: '10:45', estado: 'confirmada', notas: '', precio: 160 },
  { id: 'cita10', clienteId: 'c6', personalId: 'p4', servicioId: 's2', fecha: '2026-04-06', horaInicio: '11:00', horaFin: '11:45', estado: 'pendiente', notas: '', precio: 250 },
  // Martes 2026-04-07
  { id: 'cita11', clienteId: 'c10', personalId: 'p1', servicioId: 's7', fecha: '2026-04-07', horaInicio: '10:00', horaFin: '11:00', estado: 'confirmada', notas: '', precio: 350 },
  { id: 'cita12', clienteId: 'c12', personalId: 'p2', servicioId: 's15', fecha: '2026-04-07', horaInicio: '12:00', horaFin: '13:00', estado: 'pendiente', notas: 'Primera visita', precio: 250 },
  // Miércoles 2026-04-08
  { id: 'cita13', clienteId: 'c3', personalId: 'p3', servicioId: 's11', fecha: '2026-04-08', horaInicio: '10:00', horaFin: '11:00', estado: 'confirmada', notas: '', precio: 220 },
  { id: 'cita14', clienteId: 'c7', personalId: 'p1', servicioId: 's3', fecha: '2026-04-08', horaInicio: '14:00', horaFin: '15:30', estado: 'pendiente', notas: '', precio: 480 },
  // Jueves pasado (historial)
  { id: 'cita15', clienteId: 'c1', personalId: 'p1', servicioId: 's5', fecha: '2026-03-28', horaInicio: '11:00', horaFin: '11:45', estado: 'completada', notas: '', precio: 200 },
  { id: 'cita16', clienteId: 'c9', personalId: 'p3', servicioId: 's10', fecha: '2026-03-28', horaInicio: '13:00', horaFin: '13:45', estado: 'completada', notas: '', precio: 180 },
  { id: 'cita17', clienteId: 'c2', personalId: 'p2', servicioId: 's8', fecha: '2026-04-01', horaInicio: '09:00', horaFin: '09:30', estado: 'completada', notas: '', precio: 120 },
  { id: 'cita18', clienteId: 'c5', personalId: 'p4', servicioId: 's14', fecha: '2026-04-01', horaInicio: '10:00', horaFin: '10:20', estado: 'cancelada', notas: 'No se presentó', precio: 80 },
  { id: 'cita19', clienteId: 'c11', personalId: 'p1', servicioId: 's2', fecha: '2026-04-02', horaInicio: '12:00', horaFin: '12:45', estado: 'completada', notas: '', precio: 250 },
  { id: 'cita20', clienteId: 'c4', personalId: 'p4', servicioId: 's1', fecha: '2026-04-03', horaInicio: '15:00', horaFin: '15:30', estado: 'completada', notas: '', precio: 150 },
]
