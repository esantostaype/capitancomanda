import { ProductItem } from '@/components';
import { prisma } from '@/lib/prisma';
import { formatCategoryName } from '@/utils';

async function getProducts( category: string ) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({ params } : { params: { category : string } }) {
  const products = await getProducts( params.category )
  const categoryName = formatCategoryName( params.category )
  return (
    <>
      <h1 className='category__title'>{ categoryName }</h1>
      <ul className="product__list">
        { products.map( product => (
          <ProductItem key={ product.id } product={ product } />
        ))}          
      </ul>
    </>
  );
}