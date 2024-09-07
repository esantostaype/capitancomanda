'use client'
import { Category } from '@/interfaces'
import { OrderNavItem } from './OrderNavItem'
import { OrderAllProductsItem } from './OrderAllProductsItem'
import { Skeleton } from '@mui/material'
import { useCategories } from '@/hooks'

type Props = {
  token?: string
}

export const OrderNav = ({ token }: Props ) => {

  const { isLoading, data: categories } = useCategories({ token })
  
  return (   
      <nav className="mb-4">
        {
          isLoading
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
              { categories?.map( ( category: Category ) => (
                <OrderNavItem key={ category.id } category={ category } />
              ))}
            </ul>
          )
        }
      </nav> 
  )
}