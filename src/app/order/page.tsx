import { setSession } from '@/utils'
import { OrderNav, OrderProducts } from './components'

export default async function OrderPage() {
  const { token } = await setSession()
  return (
    <>
    <div className="flex flex-1 flex-col xl:flex-initial">
      <OrderNav token={ token }/>
    </div>
    <div className="hidden xl:flex xl:flex-1 xl:flex-col">
      <OrderProducts token={ token } />
    </div>
    </>
  )
}