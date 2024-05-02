'use client'
import { Product } from '@prisma/client';
import { formatCurrency } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
import { useStore } from '@/store';
import { toast } from 'react-toastify';

type ProductItemProps = {
  product: Product
}

export const ProductItem = ({ product } : ProductItemProps ) => {

  const addToOrder = useStore(( state ) => state.addToOrder )

  const [ spicyLevel, setSpicyLevel ] = useState<number | null>( null );
  
  const SPICYLEVEL = [ 0,1,2,3 ]

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
        <Image src={ product.image ? product.image : '/images/logo.svg' } alt={ product.name } width={ 128 } height={ 128 } />
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
        <button onClick={ handleAddToOrder } className='ghost-button button'>Agregar</button>
      </div>
    </li>
  );
}