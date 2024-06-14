'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'

import styles from './OrderSidebarItem.module.css'
import { Category } from '@/interfaces'

type Props = {
  category: Category
}

export const OrderSidebarItem = ({ category } : Props ) => {
  
  const params = useParams()

  return (
    <li className={ `${ category.id === params.category ? `${ styles.active }` : `${ styles.nav__item }` }`}>
      <Link href={ `/order/${ category.id }` } className={ styles.nav__link }>
        <i className={`fi fi-rr-${ category.icon }`}></i>
      </Link>
    </li>
  );
}