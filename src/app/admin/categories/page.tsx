import { fetchData } from '@/utils'
import { AdminTemplate, OpenModalButton } from '@/components'
import { setSession } from '@/utils/session'
import { Category } from '@/interfaces'
import CategoriesData from './CategoriesData';

export default async function CategoriesPage() {
  const { token, role, branchId } = await setSession()
  const categories: Category[] = await fetchData({ url: `/categories`, token: token, role: role })
  
  return (
    <AdminTemplate
      title='Categorías'
      button={ <OpenModalButton text='Crear Nueva' link="/admin/categories/create"/> }
    >
      <CategoriesData data={ categories } token={ token! } role={ role } branchId={ branchId } />
    </AdminTemplate>
  )
}  