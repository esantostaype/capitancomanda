import { ModalPage } from '@/components'
import { UsersForm } from '@/app/admin/users/UsersForm'
import { setSession } from '@/utils/session'


export default async function ModalCreateUserPage() {
  
  const { token } = await setSession()
  
  return (
    <ModalPage title="Crear Usuario" backText='Regresar a la lista de Usuarios' withBackRoute>
      <UsersForm token={ token } />
    </ModalPage>
  )
}