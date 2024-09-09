'use client'
import { useState, useEffect } from 'react'
import { Category } from '@/interfaces'
import { OrderNavItem } from './OrderNavItem'
import { OrderAllProductsItem } from './OrderAllProductsItem'
import { Skeleton } from '@mui/material'
import { useCategories, useMediaQuery } from '@/hooks'
import { SimpleSpinner } from '@/components'

type Props = {
  token?: string
}

export const OrderNav = ({ token }: Props ) => {
  const { isLoading, data: categories } = useCategories({ token })
  
  const isLargeScreen = useMediaQuery('(min-width: 1280px)')
  
  const [screenDetected, setScreenDetected] = useState(false)

  useEffect(() => {
    if (isLargeScreen !== null) {
      setScreenDetected(true)
    }
  }, [isLargeScreen])

  return (
    <nav className="flex flex-1 flex-col xl:mb-8 xl:block xl:flex-initial">
      {
        isLoading ? ( 
          <>
          <ul className="hidden xl:flex gap-3">
            <OrderAllProductsItem/>
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 160 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 90 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 140 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 120 } className="bg-gray50" />
          </ul>
          <div className="xl:hidden flex flex-1 w-full justify-center items-center">
            <SimpleSpinner/>
          </div>
          </>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] xl:flex xl:flex-wrap xl:items-center gap-4 xl:gap-3">
            <OrderAllProductsItem/>
            { categories?.map( ( category: Category ) => (
              <OrderNavItem key={ category.id } category={ category } />
            ))}
          </ul>
        )
      }
    </nav>
  )
}
