import { Modal } from '@/components'
import { BranchForm } from '@/app/admin/branches/BranchForm'
import { setSession } from '@/utils/session'

export default async function ModalCreateCategoryPage() {
  const { token } = await setSession()
  
  return (
    <Modal title="Crear Sucursal" withBackRoute={ true }>
      <BranchForm token={ token } />
    </Modal>
  )
}