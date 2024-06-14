import { fetchData } from '@/utils'
import { UsersDataTable } from './UsersDataTable'
import { OpenModalPageButton } from '@/components'
import { setSession } from '@/utils/session'

export default async function UsersPage() {
  const { token } = await setSession()
  const users = await fetchData({ url: `/users`, token: token })  
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Usuarios</h1>
      <OpenModalPageButton link="/admin/users/create"/>
    </header>
    <section className="admin__content">
      <UsersDataTable data={ users } token={ token } />
    </section>
    </>
  )
}