import { fetchData, setSession } from '@/utils'
import { Category, OrderItemFull } from '@/interfaces'
import { OrderMenuNav, OrderProductDetail } from '@/app/order/components'

interface Props {
  params: {
		product: string
	}
}

export default async function OrderMenuProductPage({ params }: Props) {
  const { token } = await setSession()
  const product = await fetchData<OrderItemFull>({ url: `/products/${ params.product }`, token })
  const categories = await fetchData<Category[]>({ url: `/categories`, token })
  return (
    <>
    <div className="hidden md:flex p-4 md:px-6 md:py-4 md:border-b md:border-b-gray50 sticky top-14 z-[999] md:bg-surface">
      <OrderMenuNav categories={ categories }/>
    </div>
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <OrderProductDetail product={ product }/>
    </div>
    </>
  )
}