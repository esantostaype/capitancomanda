import { ModalPage } from '@/components'
import { UsersForm } from '@/app/admin/users/UsersForm'
import { setSession } from '@/utils/session'
import { fetchData } from '@/utils'


export default async function ModalCreateUserPage() {
  
  const { token } = await setSession()
  const branches = await fetchData({ url: `/branches`, token: token })
  
  return (
    <ModalPage title="Crear Usuario" backText='Regresar a la lista de Usuarios' withBackRoute>
      <UsersForm token={ token } branches={ branches }/>
    </ModalPage>
  )
}