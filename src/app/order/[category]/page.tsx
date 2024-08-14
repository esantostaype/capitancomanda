import { OrderProductItem } from '@/components'
import { Product } from '@/interfaces'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'

export default async function OrderPage({ params } : { params: { category : string } }) {
  const { token } = await setSession()
  const products = await fetchData({ url: `/products/category/${ params.category }`, token: token })
  const category = await fetchData({ url: `/categories/${ params.category }`, token: token })
  
  return (
    <>
    <h1 className="text-2xl font-bold mb-8">{ category.name }</h1>
    <ul className="grid grid-cols-5 text-center gap-8">
      { products.map( ( product: Product ) => (
        <OrderProductItem key={ product.id } product={ product } />
      ))}
    </ul>
    </>
  );
}