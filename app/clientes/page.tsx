import Topbar from '@/components/layout/Topbar'
import ClientesClient from './ClientesClient'

export default function ClientesPage() {
  return (
    <>
      <Topbar title="Clientes" subtitle="Directorio y fidelización" />
      <ClientesClient />
    </>
  )
}
