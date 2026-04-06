import Topbar from '@/components/layout/Topbar'
import CitasClient from './CitasClient'

export default function CitasPage() {
  return (
    <>
      <Topbar title="Citas" subtitle="Agenda y calendario" />
      <CitasClient />
    </>
  )
}
