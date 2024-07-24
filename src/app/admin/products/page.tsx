import { fetchData } from '@/utils'
import { ProductsDataTable } from './ProductsDataTable'
import { OpenModalPageButton } from '@/components'
import { setSession } from '@/utils/session'

export default async function ProductsPage() {
  const { token, role, branchId } = await setSession()  
  const products = await fetchData({ url: `/products`, token: token })
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Productos</h1>
      <OpenModalPageButton link="/admin/products/create"/>
    </header>
    <section className="admin__content">
      <ProductsDataTable products={ products } token={ token } role={ role } branchId={ branchId } />
    </section>
    </>
  )
}