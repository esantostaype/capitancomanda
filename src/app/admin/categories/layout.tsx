import { setSession } from '@/utils/session'
import { AdminTemplate, OpenModalButton } from '@/components'
import { CategoryForm, CategoriesData } from './components'

export default async function CategoriesLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <AdminTemplate
      title='Categorías'
      button={ <OpenModalButton text='Crear Nueva' link="/admin/categories/create"/> }
    >
      <CategoriesData token={ token } role={ role } />
      { children }
    </AdminTemplate>
    <CategoryForm token={ token }/>
    </>
  )
}