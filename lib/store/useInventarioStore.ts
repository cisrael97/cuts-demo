'use client'
import { create } from 'zustand'
import type { ProductoInventario } from '@/lib/types'
import { inventarioMock } from '@/lib/data/inventario'

interface InventarioStore {
  productos: ProductoInventario[]
  updateStock: (id: string, nuevoStock: number) => void
  updateProducto: (id: string, patch: Partial<ProductoInventario>) => void
}

export const useInventarioStore = create<InventarioStore>((set) => ({
  productos: inventarioMock,
  updateStock: (id, nuevoStock) => set((s) => ({
    productos: s.productos.map((p) => p.id === id ? { ...p, stockActual: nuevoStock, ultimaActualizacion: new Date().toISOString().split('T')[0] } : p),
  })),
  updateProducto: (id, patch) => set((s) => ({
    productos: s.productos.map((p) => p.id === id ? { ...p, ...patch } : p),
  })),
}))
