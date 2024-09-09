'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'
import { Category } from '@/interfaces'

type Props = {
  category: Category
}

export const OrderNavItem = ({ category } : Props ) => {
  
  const params = useParams()
  const isActive = category.id === params.category

  return (
    <>
    { category.products.length !== 0 &&
    <li className={ `${ isActive ? "bg-accent text-white" : "hover:bg-gray100 bg-gray50" } active:scale-[0.97] leading-tight text-center block rounded aspect-square xl:aspect-auto`}>
      <Link href={ `/order/${ category.id }` } className="flex items-center justify-center h-full px-5 py-3">
        <div>
          <div className="font-bold xl:font-normal">{ category.name }</div>
          <div className="text-gray500 text-xs mt-2 xl:hidden">
            { category.products.length } Producto{ category.products.length !== 0 && "s" }
          </div>
        </div>
      </Link>
    </li>
    }
    </>
    
  );
}