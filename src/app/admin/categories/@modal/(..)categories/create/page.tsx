import { Modal } from '@/components'
import { CategoriesForm } from '@/app/admin/categories/CategoriesForm'
import { setSession } from '@/utils/session'

export default async function ModalCreateCategoryPage() {
  const { token } = await setSession()
  
  return (
    <Modal title="Crear Categoría" withBackRoute={ true }>
      <CategoriesForm token={ token } withBackRoute={ true } />
    </Modal>
  )
}