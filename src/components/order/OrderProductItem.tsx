'use client'
import Image from 'next/image'
import { useOrderStore } from '@/store/order-store'
import { Color, Variant, Product } from '@/interfaces'
import { Button } from '@/components'
import { toast } from 'react-toastify'
import { formatCurrency } from '@/utils'

type Props = {
  product: Product
}

export const OrderProductItem = ({ product } : Props ) => {

  const addToOrder = useOrderStore(( state ) => state.addToOrder )

  const handleAddToOrder = ( ) => {
    addToOrder({
      ...product,
    })
    toast.success(`¡${ product.name } Agregad@!`)
  }

  return (
    <li className="flex flex-col justify-between items-center">
      <div className="relative z-20 bg-gray50 flex items-center justify-center rounded-full h-32 w-32 overflow-hidden -mb-16">
      { product.image ? (
        <Image src={ product.image } alt={ product.name } width={ 256 } height={ 256 } className="object-cover aspect-square" />
      ) : (
        <i className="fi fi-tr-image-slash text-3xl text-gray500"></i>
      )}
      </div>
      <div className='relative z-10 bg-surface rounded-lg flex flex-col justify-between flex-1 p-4 pt-20 w-full'>
        <div>
          <div className="text-base font-semibold text-gray600">{ product.name }</div>
          <div className="mt-1 mb-4">{ formatCurrency( product.price ) }</div>
        </div>
        {/* {
          product.variants &&
          <ul>
            { product.variants.map( ( variant, index ) => (
              <li key={ index }>
                { variant.name }
                <ul>
                { variant.options.map( ( option, index ) => (
                  <li key={ index }>
                    { option.name }: { option.price }
                  </li>
                ))}
                </ul>
              </li>
            ))}
          </ul>
        } */}
        <Button
          text='Agregar'
          color={ Color.ACCENT }
          variant={ Variant.GHOST }
          onClick={ handleAddToOrder }
        />
      </div>
    </li>
  )
}