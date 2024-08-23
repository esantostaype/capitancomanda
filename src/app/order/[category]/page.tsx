import { OrderProductItem } from '@/components'
import { OrderItemFull } from '@/interfaces'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'

export default async function OrderCategoryPage({ params } : { params: { category : string } }) {
  const { token } = await setSession()
  const products = await fetchData({ url: `/products/category/${ params.category }`, token: token })
  const category = await fetchData({ url: `/categories/${ params.category }`, token: token })
  
  return (
    <>
    <h1 className="text-xl font-bold mb-4">{ category.name }</h1>
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      { products.map( ( product: OrderItemFull ) => (
        <OrderProductItem key={ product.id } product={ product } />
      ))}
    </ul>
    </>
  );
}