'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation'
import { Category } from '@/interfaces'
import Image from 'next/image'

type Props = {
  category: Category
}

export const OrderSidebarItem = ({ category } : Props ) => {
  
  const params = useParams()
  const isActive = category.id === params.category

  return (
    <li className={ `${ isActive ? "" : "opacity-50 hover:opacity-75" } max-w-full`}>
      <Link href={ `/order/${ category.id }` } className="text-center max-w-full">
        <div className="flex items-center justify-center rounded-full overflow-hidden h-16 w-16 bg-gray100 mx-auto mb-2">
          { category.image
            ? <Image src={ category.image } width='64' height='64' alt={ category.name } className="aspect-square object-cover" />
            : <i className="fi fi-tr-image-slash text-xl text-gray500"></i>
          }
        </div>
        <div className={ `${ isActive ? "text-accent" : "" } text-xs font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full`}>{ category.name }</div>
      </Link>
    </li>
  );
}