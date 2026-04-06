import Topbar from '@/components/layout/Topbar'
import ServiciosClient from './ServiciosClient'

export default function ServiciosPage() {
  return (
    <>
      <Topbar title="Servicios" subtitle="Catálogo de servicios" />
      <ServiciosClient />
    </>
  )
}
