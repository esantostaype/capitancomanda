'use client'
import { fetchData } from '@/utils'
import { OrderItemFull, Product } from '@/interfaces'
import { setSession } from '@/utils/session'
import { useEffect, useState } from 'react'
import { OrderProductItem } from './OrderProductItem'
import { EmptyData, LoadingData } from '@/components'
import { useParams } from 'next/navigation'

export const OrderProducts = () => {

  const [ products, setProducts ] = useState<OrderItemFull[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const [ token, setToken ] = useState('')

  const { category } = useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      const { token } = await setSession()
      setToken( token! )
      if ( category ) {
        const data = await fetchData({ url: `/products/category/${ category }`, token })
        setProducts( data )
        setLoading( false )
      } else {
        const data = await fetchData({ url: `/products`, token })
        setProducts( data )
        setLoading( false )

      }
    }
    fetchProducts()
  }, [ category ])

  return (
    <>
      { loading
      ? ( <LoadingData text="Productos"/> )
      : ( products.length === 0
        ? ( <EmptyData text='Productos' /> )
        : (
          <div className="animate-fade animate-duration-500">          
          <h1 className="text-xl font-bold mb-4">Todo</h1>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            { products.map( ( product ) => (
              <OrderProductItem key={ product.id } product={ product } token={ token } />
            ))}
          </ul>
          </div>
        )
      )}
    </>
  )
}