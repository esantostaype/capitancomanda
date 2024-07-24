import { Modal } from '@/components'
import { BranchesForm } from '@/app/admin/branches/BranchesForm'
import { setSession } from '@/utils/session'

export default async function ModalCreateCategoryPage() {
  const { token } = await setSession()
  
  return (
    <Modal title="Crear Sucursal" withBackRoute={ true }>
      <BranchesForm token={ token } withBackRoute={ true } />
    </Modal>
  )
}