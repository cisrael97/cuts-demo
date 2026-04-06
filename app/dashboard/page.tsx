import Topbar from '@/components/layout/Topbar'
import DashboardClient from './DashboardClient'

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Resumen del negocio" />
      <DashboardClient />
    </>
  )
}
