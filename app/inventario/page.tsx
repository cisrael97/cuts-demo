import Topbar from '@/components/layout/Topbar'
import InventarioClient from './InventarioClient'

export default function InventarioPage() {
  return (
    <>
      <Topbar title="Inventario" subtitle="Control de stock" />
      <InventarioClient />
    </>
  )
}
