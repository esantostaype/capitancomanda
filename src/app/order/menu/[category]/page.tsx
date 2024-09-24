import { apiUrl } from '@/utils';
import { OrderMenuNav, OrderProducts } from "../../components"
import { Category, OrderItemFull } from '@/interfaces'

interface Props {
  params: {
		category: string
	}
}

// export async function generateStaticParams() {
//   const responseCategories = await fetch(`${ apiUrl }/categories`)
//   const categories: Category[] = await responseCategories.json()

//   const staticPokemons = categories.map(( category ) => ({
//     category: category.id,
//   }))

//   return staticPokemons.map(({ category }) => ({
//     category: category
//   }))
// }

export default async function OrderMenuCategoryPage({ params }: Props) {
  const responseProducts = await fetch(`${ apiUrl }/products/category/${ params.category }`)
  const products: OrderItemFull[] = await responseProducts.json()
  const responseCategories = await fetch(`${ apiUrl }/categories`)
  const categories: Category[] = await responseCategories.json()
  const responseCategory = await fetch(`${ apiUrl }/categories/${ params.category }`)
  const category: Category = await responseCategory.json()
  return (
    <>
    <div className="hidden md:flex p-4 md:px-6 md:py-4 md:border-b md:border-b-gray50 sticky top-14 z-[999] md:bg-surface">
      <OrderMenuNav categories={ categories }/>
    </div>
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <OrderProducts categoryName={ category.name } products={ products }/>
    </div>
    </>
  )
}