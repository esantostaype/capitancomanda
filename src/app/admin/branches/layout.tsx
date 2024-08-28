import { setSession } from '@/utils/session'
import { AdminTemplate, OpenModalButton } from '@/components'
import { BranchForm, BranchesData } from './components'


export default async function BranchesLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <AdminTemplate
      title='Sucursales'
      button={ <OpenModalButton text='Crear Nueva' link="/admin/branches/create"/> }
    >
      <BranchesData token={ token } role={ role } />
      { children }
    </AdminTemplate>
    <BranchForm token={ token }/>
    </>
  )
}