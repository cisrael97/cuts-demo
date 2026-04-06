'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Tema = 'estetica' | 'barberia'

interface ThemeStore {
  tema: Tema
  setTema: (t: Tema) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      tema: 'estetica',
      setTema: (tema) => set({ tema }),
    }),
    { name: 'cuts-tema' }
  )
)
