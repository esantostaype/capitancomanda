'use client'

import { Product } from '@prisma/client';
import { useStore } from '@/store';

type AddProductButtonProps = {
  product: Product
}

export const AddProductButton = ({ product }: AddProductButtonProps ) => {

  const addToOrder = useStore(( state ) => state.addToOrder )

  return (
    <button onClick={ () => addToOrder( product ) } className='ghost-button button'>Agregar</button>
  );
}