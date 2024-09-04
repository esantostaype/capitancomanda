import { setSession } from '@/utils/session'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { OrdersDataTable } from './components'

export default async function OrdersLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <AdminTemplate
      title='Órdenes'
    >
      <OrdersDataTable token={ token } role={ role } />
    </AdminTemplate>
    </>
  )
}