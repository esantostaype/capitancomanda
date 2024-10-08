'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'
import { Category } from '@/interfaces'

interface Props {
  category: Category
}

export const OrderSidebarItem = ({ category } : Props ) => {
  
  const params = useParams()
  const isActive = category.id === params.category

  return (
    <li className={ `${ isActive ? "bg-accent text-white" : "hover:bg-gray100 bg-gray50" } active:scale-[0.97] text-center block rounded`}>
      <Link href={ `/order/${ category.id }` } className="block px-5 py-3">
        { category.name }
      </Link>
    </li>
  );
}