import { fetchData } from '@/utils'
import { ProductsDataTable } from './ProductsDataTable'
import { OpenModalButton } from '@/components'

export default async function ProductsPage() {
  const products = await fetchData({ url: `/products` })
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Productos</h1>
      <OpenModalButton link="/admin/products/create"/>
    </header>
    <section className="admin__content">
      <ProductsDataTable data={ products }/>
    </section>
    </>
  )
}