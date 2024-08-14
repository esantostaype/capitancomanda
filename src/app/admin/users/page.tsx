import { fetchData } from '@/utils'
import { UsersDataTable } from './UsersDataTable'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { setSession } from '@/utils/session'

export default async function UsersPage() {
  const { token } = await setSession()
  const users = await fetchData({ url: `/users`, token: token })  
  return (
    <AdminTemplate
      title='Usuarios'
      button={ <OpenModalPageButton link="/admin/users/create"/> }
    >
      <UsersDataTable data={ users } token={ token } />
    </AdminTemplate>
  )
}