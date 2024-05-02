'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Category } from '@prisma/client';

import styles from './OrderItem.module.css';

type Props = {
  category: Category
}

export const OrderItem = ({ category } : Props ) => {
  
  const params = useParams()

  return (
    <li className={ `${ category.slug === params.category ? `${ styles.active }` : `${ styles.nav__item }` }`}>
      <Link href={ `/order/${ category.slug }` } className={ styles.nav__link }>
        <i className={`fi fi-rr-${ category.icon }`}></i>
      </Link>
    </li>
  );
}