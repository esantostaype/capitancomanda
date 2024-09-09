'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const OrderAllProductsItem = () => {
  
  const pathName = usePathname()

  return (
    <li className={ `${ pathName === "/order" ? "bg-accent text-white" : "hover:bg-gray100 bg-gray50" } active:scale-[0.97] leading-tight text-center hidden xl:block rounded aspect-square xl:aspect-auto`}>
      <Link href="/order" className="flex items-center justify-center px-5 py-3 h-full">
        Todo
      </Link>
    </li>
  );
}