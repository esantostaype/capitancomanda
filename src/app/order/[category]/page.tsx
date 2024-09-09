import { setSession } from '@/utils';
import { OrderNav, OrderProducts } from "../components"

export default async function OrderCategoryPage() {
  const { token } = await setSession()
  return (
    <>
    <div className="hidden xl:flex">
      <OrderNav token={ token }/>
    </div>
    <div className="flex flex-1 flex-col">
      <OrderProducts token={ token } />
    </div>
    </>
  )
}