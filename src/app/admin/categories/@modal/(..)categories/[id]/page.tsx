import { Modal } from '@/components'
import { fetchData } from '@/utils'
import { CategoryForm } from '@/app/admin/categories/CategoryForm'
import { setSession } from '@/utils/session'

export default async function ModalCategoryIdPage({ params } : { params: { id : number } }) {
  const { token } = await setSession()
  const category = await fetchData({ url: `/categories/${ params.id }`, token: token })
  
  return (
    <Modal title={ category.name }  withBackRoute={ true }>
      <CategoryForm category={ category } token={ token } />
    </Modal>
  );
}