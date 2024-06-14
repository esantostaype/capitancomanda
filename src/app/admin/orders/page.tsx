import { fetchData } from '@/utils'
import { OrdersDataTable } from './OrdersDataTable'
import { cookies } from 'next/headers'
import { setSession } from '@/utils/session'

export default async function OrdersPage() {
  const { token } = await setSession()
  const orders = await fetchData({ url: `/orders`, token: token })  
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