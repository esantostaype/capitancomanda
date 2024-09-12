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

  return (
    <nav className="flex flex-1 flex-col md:block md:flex-initial">
      {
        isLoading ? ( 
          <>
          <ul className="flex gap-3">
            <OrderAllProductsItem/>
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 160 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 90 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 140 } className="bg-gray50" />
            <Skeleton animation='wave' variant='rounded' height={ 45 } width={ 120 } className="bg-gray50" />
          </ul>
          <div className="md:hidden flex flex-1 w-full justify-center items-center">
            <SimpleSpinner/>
          </div>
          </>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:flex md:flex-wrap md:items-center gap-4 md:gap-3">
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
