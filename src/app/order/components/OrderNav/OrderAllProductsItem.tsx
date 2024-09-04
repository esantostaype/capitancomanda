'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const OrderAllProductsItem = () => {
  
  const pathName = usePathname()

  return (
    <li className={ `${ pathName === "/order" ? "bg-accent text-white" : "hover:bg-gray100 bg-gray50" } active:scale-[0.97] text-center block rounded`}>
      <Link href="/order" className="block px-5 py-3">
        Todo
      </Link>
    </li>
  );
}