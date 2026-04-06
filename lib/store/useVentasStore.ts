'use client'
import { create } from 'zustand'
import type { Venta } from '@/lib/types'
import { ventasMock } from '@/lib/data/ventas'

interface VentasStore {
  ventas: Venta[]
  addVenta: (venta: Venta) => void
}

export const useVentasStore = create<VentasStore>((set) => ({
  ventas: ventasMock,
  addVenta: (venta) => set((s) => ({ ventas: [venta, ...s.ventas] })),
}))
