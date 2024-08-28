import { setSession } from '@/utils/session'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { ProductsDataTable, ProductForm } from './Components'

export default async function ProductsLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <AdminTemplate
      title='Productos'
      button={ <OpenModalPageButton link="/admin/products/create"/> }
    >
      <ProductsDataTable token={ token } role={ role } />
      { children }
    </AdminTemplate>
    <ProductForm token={ token }/>
    </>
  )
}