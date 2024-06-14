'use client'
import Image from 'next/image'
import { useOrderStore } from '@/store/order-store'
import { Product } from '@/interfaces'
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
    <li className="product__item">
      <div className='product__item__image'>
      { product.image ? (
        <Image src={ product.image } alt={ product.name } width={ 128 } height={ 128 } />
      ) : (
        <i className="fi fi-tr-image-slash"></i>
      )}
      </div>
      <div className='product__item__caption'>
        <div>
          <div className='product__item__title'>{ product.name }</div>
          <div className='product__item__price'>{ formatCurrency( product.price ) }</div>
        </div>
        <Button
          text='Agregar'
          mode='primary'
          ghost 
          onClick={ handleAddToOrder }
        />
      </div>
    </li>
  )
}