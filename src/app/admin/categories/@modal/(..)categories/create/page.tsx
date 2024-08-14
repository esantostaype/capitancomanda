import { Modal } from '@/components'
import { CategoryForm } from '@/app/admin/categories/CategoryForm'
import { setSession } from '@/utils/session'

export default async function ModalCreateCategoryPage() {
  const { token } = await setSession()
  
  return (
    <Modal title="Crear Categoría" withBackRoute={ true }>
      <CategoryForm token={ token } />
    </Modal>
  )
}