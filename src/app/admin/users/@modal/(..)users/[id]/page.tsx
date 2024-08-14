import { ModalPage } from '@/components'
import { fetchData } from '@/utils'
import { UserForm } from '@/app/admin/users/UserForm'
import { setSession } from '@/utils/session'
import { Role } from '@/interfaces'

export default async function ModalUserIdPage({ params } : { params: { id : number } }) {

  const { token, role } = await setSession()
  const user = await fetchData({ url: `/users/${ params.id }`, token: token })
  const branches = await fetchData({ url: `/branches`, token: token })
  
  return (
    <ModalPage title={ user.fullName } backText='Regresar a la lista de Usuarios' withBackRoute>
      <UserForm user={ user } token={ token } branches={ role === Role.OWNER ? branches : null }/>
    </ModalPage>
  )
}