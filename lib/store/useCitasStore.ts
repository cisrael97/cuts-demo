'use client'
import { create } from 'zustand'
import type { Cita } from '@/lib/types'
import { citasMock } from '@/lib/data/citas'

interface CitasStore {
  citas: Cita[]
  addCita: (cita: Cita) => void
  updateCita: (id: string, patch: Partial<Cita>) => void
  deleteCita: (id: string) => void
}

export const useCitasStore = create<CitasStore>((set) => ({
  citas: citasMock,
  addCita: (cita) => set((s) => ({ citas: [...s.citas, cita] })),
  updateCita: (id, patch) => set((s) => ({
    citas: s.citas.map((c) => (c.id === id ? { ...c, ...patch } : c)),
  })),
  deleteCita: (id) => set((s) => ({ citas: s.citas.filter((c) => c.id !== id) })),
}))
