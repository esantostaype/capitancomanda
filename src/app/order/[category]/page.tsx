import { OrderProductItem } from '@/components'
import { Product } from '@/interfaces'
import { fetchData, formatCategoryName } from '@/utils'

export default async function OrderPage({ params } : { params: { category : string } }) {

  const products = await fetchData({ url: `/products?category=${ params.category }` })
  const categoryName = formatCategoryName( params.category )
  
  return (
    <>
    <h1 className='category__title'>{ categoryName }</h1>
    <ul className="product__list">
      { products.map( ( product: Product ) => (
        <OrderProductItem key={ product.id } product={ product } />
      ))}
    </ul>
    </>
  );
}