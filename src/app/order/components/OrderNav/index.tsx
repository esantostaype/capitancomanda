'use client'
import { fetchData } from '@/utils'
import { Category } from '@/interfaces'
import { setSession } from '@/utils/session'
import { useEffect, useState } from 'react'
import { OrderNavItem } from './OrderNavItem'
import { OrderAllProductsItem } from './OrderAllProductsItem'
import { Skeleton } from '@mui/material'
import DragAndDropSlider from '@/components/ui/DragAndDropSlider'

export const OrderNav = () => {

  const [ categories, setCategories ] = useState<Category[] | []>([])
  const [ loading, setLoading ] = useState( true )

  useEffect(() => {
    const fetchProducts = async () => {
      const { token } = await setSession()
      const data = await fetchData({ url: `/categories`, token })
      setCategories( data )
      setLoading( false )
    }
    fetchProducts()
  }, [])

  return (   
      <nav className="mb-4">
        {
          loading
          ? (
            <ul className="flex items-center gap-3">
              <OrderAllProductsItem/>
              <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 160 } className="bg-gray50" />
              <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 90 } className="bg-gray50" />
              <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 140 } className="bg-gray50" />
              <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 120 } className="bg-gray50" />
            </ul>
          )
          : (
            <ul className="flex flex-wrap items-center gap-3">
              <OrderAllProductsItem/>
              { categories.map( ( category: Category ) => (
                <OrderNavItem key={ category.id } category={ category } />
              ))}
            </ul>
          )
        }
      </nav> 
  )
}