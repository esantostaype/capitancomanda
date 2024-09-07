'use client'
import { OrderProductItem } from './OrderProductItem'
import { EmptyData, LoadingData } from '@/components'
import { useParams } from 'next/navigation'
import { useOrderProducts } from '@/hooks'

type Props = {
  token?: string
}

export const OrderProducts = ({ token }: Props) => {

  const { category } = useParams()
  const categoryKey = Array.isArray( category ) ? category[0] : category
  const { isLoading, data:products } = useOrderProducts({ token, categoryKey })

  return (
    <>
      { isLoading
      ? ( <LoadingData text="Productos"/> )
      : ( products && products.length === 0
        ? ( <EmptyData text='Productos' /> )
        : (
          <div className="animate-fade animate-duration-500">          
          <h1 className="text-xl font-bold mb-4">Todo</h1>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            { products?.map( ( product ) => (
              <OrderProductItem key={ product.id } product={ product } />
            ))}
          </ul>
          </div>
        )
      )}
    </>
  )
}