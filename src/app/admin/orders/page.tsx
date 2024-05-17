import { fetchData } from '@/utils'
import { OrdersDataTable } from './OrdersDataTable'

export default async function OrdersPage() {
  const orders = await fetchData({ url: `/orders` })  
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Órdenes</h1>
    </header>
    <section className="admin__content">
      <OrdersDataTable data={ orders }/>
    </section>
    </>
  )
}