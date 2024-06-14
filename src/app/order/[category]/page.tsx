import { OrderProductItem } from '@/components'
import { Product } from '@/interfaces'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'

export default async function OrderPage({ params } : { params: { category : string } }) {
  const { token } = await setSession()
  const products = await fetchData({ url: `/products?category=${ params.category }`, token: token })
  const category = await fetchData({ url: `/categories/${ params.category }`, token: token })   
  
  return (
    <>
    <h1 className='category__title'>{ category.name }</h1>
    <ul className="product__list">
      { products.map( ( product: Product ) => (
        <OrderProductItem key={ product.id } product={ product } />
      ))}
    </ul>
    </>
  );
}