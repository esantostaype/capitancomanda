import { fetchData } from '@/utils'
import { OrdersDataTable } from './OrdersDataTable'
import { cookies } from 'next/headers'
import { setSession } from '@/utils/session'
import { AdminTemplate } from '@/components'

export default async function OrdersPage() {
  const { token } = await setSession()
  const orders = await fetchData({ url: `/orders`, token: token })  
  return (
    <AdminTemplate
      title='Órdenes'
    >
      <OrdersDataTable data={ orders }/>
    </AdminTemplate>
  )
}