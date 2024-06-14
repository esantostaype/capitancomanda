import { ModalPage } from '@/components'
import { fetchData } from '@/utils'
import { UsersForm } from '@/app/admin/users/UsersForm'
import { setSession } from '@/utils/session'

export default async function ModalUserIdPage({ params } : { params: { id : number } }) {

  const { token } = await setSession()
  const user = await fetchData({ url: `/users/${ params.id }`, token: token })
  
  return (
    <ModalPage title={ user.name } backText='Regresar a la lista de Productos' withBackRoute>
      <UsersForm user={ user } token={ token }/>
    </ModalPage>
  )
}