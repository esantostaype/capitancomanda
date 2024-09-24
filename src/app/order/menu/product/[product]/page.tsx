import { apiUrl } from '@/utils'
import { Category, OrderItemFull, Product } from '@/interfaces'
import { OrderMenuNav, OrderProductDetail } from '@/app/order/components'

interface Props {
  params: {
		product: string
	}
}

// export async function generateStaticParams() {
//   const responseProducts = await fetch(`${ apiUrl }/products`)
//   const products: Product[] = await responseProducts.json()

//   const staticProducts = products.map(( product ) => ({
//     product: product.id,
//   }))

//   return staticProducts.map(({ product }) => ({
//     product: product
//   }))
// }

export default async function OrderMenuProductPage({ params }: Props) {
  const responseProduct = await fetch(`${ apiUrl }/products/${ params.product }`)
  const product: OrderItemFull = await responseProduct.json()
  const responseCategories = await fetch(`${ apiUrl }/categories`)
  const categories: Category[] = await responseCategories.json()
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