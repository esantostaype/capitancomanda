import { fetchData } from '@/utils'
import { AdminTemplate, OpenModalButton } from '@/components'
import { setSession } from '@/utils/session'
import { Branch } from '@/interfaces'
import BranchesData from './BranchesData'

export default async function BranchesPage() {
  const { token } = await setSession()
  const branches: Branch[] = await fetchData({ url: `/branches`, token: token })
  
  return (
    <AdminTemplate
      title='Sucursales'
      button={ <OpenModalButton text='Crear Nueva' link="/admin/branches/create"/> }
    >
      <BranchesData data={ branches } token={ token! } />
    </AdminTemplate>
  )
}