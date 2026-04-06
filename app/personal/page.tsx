import Topbar from '@/components/layout/Topbar'
import PersonalClient from './PersonalClient'

export default function PersonalPage() {
  return (
    <>
      <Topbar title="Personal" subtitle="Equipo de trabajo" />
      <PersonalClient />
    </>
  )
}
