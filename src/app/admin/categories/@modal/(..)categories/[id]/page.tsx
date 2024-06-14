import { Modal } from '@/components'
import { fetchData } from '@/utils'
import { CategoriesForm } from '@/app/admin/categories/CategoriesForm'
import { setSession } from '@/utils/session'

export default async function ModalCategoryIdPage({ params } : { params: { id : number } }) {
  const { token } = await setSession()
  const category = await fetchData({ url: `/categories/${ params.id }`, token: token })
  
  return (
    <Modal title={ category.name }  withBackRoute={ true }>
      <CategoriesForm category={ category } token={ token } withBackRoute={ true }/>
    </Modal>
  );
}