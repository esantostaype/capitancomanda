'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'

import styles from './OrderSidebarItem.module.css'
import { Category } from '@/interfaces'
import Image from 'next/image';

type Props = {
  category: Category
}

export const OrderSidebarItem = ({ category } : Props ) => {
  
  const params = useParams()

  return (
    <li className={ `${ category.id === params.category ? `${ styles.active }` : `${ styles.nav__item }` }`}>
      <Link href={ `/order/${ category.id }` } className={ styles.nav__link }>
        { category.image ? <Image src={ category.image } width='64' height='64' alt={ category.name }/> : <i className="fi fi-tr-image-slash"></i> }
      </Link>
    </li>
  );
}