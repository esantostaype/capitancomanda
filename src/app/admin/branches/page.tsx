import { fetchData } from '@/utils'
import { Button, OpenModalButton } from '@/components'
import { setSession } from '@/utils/session'
import { Branch } from '@/interfaces'
import BranchesData from './BranchesData';

export default async function BranchesPage() {
  const { token } = await setSession()
  const branches: Branch[] = await fetchData({ url: `/branches`, token: token })
  
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Sucursales</h1>
      <OpenModalButton link="/admin/branches/create"/>
    </header>
    <section className="admin__content">
      <BranchesData data={ branches } token={ token! } />
    </section>
    </>
  )
}