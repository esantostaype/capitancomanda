'use client'

import { useOrderStore } from '@/store/order-store';
import { Product } from '@/interfaces';

type Props = {
  product: Product
}

export const OrderAddProductButton = ({ product }: Props ) => {

  const addToOrder = useOrderStore(( state ) => state.addToOrder )

  return (
    <button onClick={ () => addToOrder( product ) } className='ghost-button button'>Agregar</button>
  );
}