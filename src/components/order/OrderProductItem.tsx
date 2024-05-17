'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { Product } from '@/interfaces'
import { Button } from '@/components'
import { toast } from 'react-toastify'
import { SPICYLEVEL, formatCurrency } from '@/utils'
import styles from './OrderProductItem.module.css'

type Props = {
  product: Product
}

export const OrderProductItem = ({ product } : Props ) => {

  const addToOrder = useOrderStore(( state ) => state.addToOrder )

  const [ spicyLevel, setSpicyLevel ] = useState<number | null>( null )

  const handleAddToOrder = ( ) => {
    addToOrder({
      ...product,
      spicyLevelNumber: spicyLevel !== null ? spicyLevel : null
    })
    setSpicyLevel( null )
    toast.success(`¡${ product.name } Agregad@!`)
  }

  return (
    <li className="product__item">
      <div className='product__item__image'>
        <Image src={ product.image || '/images/logo.svg' } alt={ product.name } width={ 128 } height={ 128 } />
      </div>
      <div className='product__item__caption'>
        <div>
          <div className='product__item__title'>{ product.name }</div>
          <div className='product__item__price'>{ formatCurrency( product.price ) }</div>
        </div>
        {
          product.spicyLevel && (
            <div>
              <h4>Nivel de Picante:</h4>
              <ul className='product__item__spicy-level'>
                {
                  SPICYLEVEL.map( level => (
                    <li key={ level } className={ `${ spicyLevel === level ? "selected"  : ''}` }>
                      <button onClick={() => setSpicyLevel( level )}>{ level }</button>
                    </li>
                  ) )
                }
              </ul>
            </div>
          )
        }
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