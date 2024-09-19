import { setSession } from '@/utils';
import { OrderMenuNav, OrderProducts } from "../../components"

export default async function OrderMenuCategoryPage() {
  const { token } = await setSession()
  return (
    <>
    <div className="hidden md:flex p-4 md:px-6 md:py-4 md:border-b md:border-b-gray50 sticky top-14 z-[999] md:bg-surface">
      <OrderMenuNav token={ token }/>
    </div>
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <OrderProducts token={ token } />
    </div>
    </>
  )
}