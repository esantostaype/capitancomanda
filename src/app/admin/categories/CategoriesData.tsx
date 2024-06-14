'use client'
import { Button, PopperC } from '@/components'
import Image from 'next/image';
import Link from 'next/link'
import { useUiStore } from '@/store/ui-store'
import { Category } from '@/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { deleteCategory } from '@/actions/category-actions';

type Props = {
  data: Category[]
  token: string
}

export default function CategoriesData({ data, token }: Props ) {

  const { openModal } = useUiStore()
  const [ listRef ] = useAutoAnimate()

  const handleDeleteProduct = async ( id: string, token: string ) => {
    await deleteCategory( id, token )
  }
  
  return (
    <div className="row" ref={ listRef }>
      { data.map( category => (
        <div key={ category.id } className="col-2">
          <div className="card card-data">
            <div className="card__actions">
              <PopperC>
                <ul className='card__actions__list'>
                  <li onClick={ () => openModal() }><Link href={ `/admin/categories/${ category.id }` }>Editar</Link></li>
                  <li><Button text='Eliminar' mode='withoutBg' onClick={ () => handleDeleteProduct( category.id, token ) } /></li>
                </ul>
              </PopperC>
            </div>
            <div className="card__image">
              {
                category.image ? (
                  <Image src={ category.image } alt={ category.name } width={ 128 } height={ 128 } />
                ) : (
                  <i className="fi fi-tr-image-slash"></i>
                )
              }
            </div>
            <h2 className="card-data__title">{ category.name }</h2>
            <span className="card-data__count">
              { category.products.length } Producto{ category.products.length !== 1 && "s" }</span>
          </div>
        </div>
      )) }
    </div> 
  )
}