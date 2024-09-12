import { setSession } from '@/utils'
import { OrderMenuNav, OrderProducts } from '../components'

export default async function OrderPage() {
  const { token } = await setSession()
  return (
    <>
    <div className="flex flex-1 flex-col md:flex-initial p-4 md:px-6 md:py-4 border-b border-b-gray50 sticky top-14 z-[999] bg-surface">
      <OrderMenuNav token={ token }/>
    </div>
    <div className="hidden md:flex md:flex-1 md:flex-col p-4 md:p-6">
      <OrderProducts token={ token } />
    </div>
    </>
  )
}