import Topbar from '@/components/layout/Topbar'
import VentasClient from './VentasClient'

export default function VentasPage() {
  return (
    <>
      <Topbar title="Ventas / POS" subtitle="Punto de venta" />
      <VentasClient />
    </>
  )
}
