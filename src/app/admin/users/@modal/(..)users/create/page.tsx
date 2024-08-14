import { ModalPage } from '@/components'
import { UserForm } from '@/app/admin/users/UserForm'
import { setSession } from '@/utils/session'
import { fetchData } from '@/utils'
import { Role } from '@/interfaces'


export default async function ModalCreateUserPage() {
  
  const { token, role } = await setSession()
  const branches = await fetchData({ url: `/branches`, token: token })
  
  return (
    <ModalPage title="Crear Usuario" backText='Regresar a la lista de Usuarios' withBackRoute>
      <UserForm token={ token } branches={ role === Role.OWNER ? branches : null }/>
    </ModalPage>
  )
}