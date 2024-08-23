import { fetchData } from '@/utils'
import { ProductsDataTable } from './ProductsDataTable'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { setSession } from '@/utils/session'
import { ProductForm } from './ProductForm'

export default async function ProductsPage() {
  const { token, role, branchId } = await setSession()  
  const products = await fetchData({ url: `/products`, token: token })
  const categories = await fetchData({ url: `/categories`, token: token })

  console.log("branchId in Page: ", branchId, token, role)
  return (
    <>
    <AdminTemplate
      title='Productos'
      button={ <OpenModalPageButton link="/admin/products?create"/> }
    >
      <ProductsDataTable initialProducts={ products } token={ token } role={ role } />
    </AdminTemplate>
    <ProductForm categories={ categories } token={ token }/>
    </>
  )
}