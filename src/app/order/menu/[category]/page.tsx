import { setSession } from '@/utils';
import { OrderNav, OrderProducts } from "../../components"

export default async function OrderCategoryPage() {
  const { token } = await setSession()
  return (
    <>
    <div className="hidden md:flex p-4 md:px-6 md:py-4 border-b border-b-gray50 sticky top-14 z-[999] bg-surface">
      <OrderNav token={ token }/>
    </div>
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <OrderProducts token={ token } />
    </div>
    </>
  )
}