import { setSession } from '@/utils/session'
import { AdminTemplate, OpenModalButton } from '@/components'
import { UserForm, UsersDataTable } from './components'

export default async function UsersLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <AdminTemplate
      title='Usuarios'
      button={ <OpenModalButton text='Crear Nuevo' link="/admin/users/create"/> }
    >
      <UsersDataTable token={ token } role={ role } />
      { children }
    </AdminTemplate>
    <UserForm token={ token }/>
    </>
  )
}