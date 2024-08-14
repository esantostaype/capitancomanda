'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

type Props = {
  item: {
    label: string
    path: string
    iconName: string
    target?: string
  }
}

export const AdminSidebarItem = ({ item } : Props ) => {

  const pathName = usePathname()

  const isActivePath = ( path: string ) => {
    if ( path === '/admin' ) {
      return pathName === path
    }
    return pathName.startsWith( path )
  }

  return (
    <li className={`${ isActivePath( item.path ) ? "text-accent" : 'text-gray700' } group relative overflow-hidden rounded`}>
      <Link href={ item.path } className="relative group-hover:text-accent flex items-center gap-3 px-3 py-2 z-20" >
        <i className={`fi fi-tr-${ item.iconName } text-lg leading-4`}></i>
        { item.label }
      </Link>
      <span className={`${ isActivePath( item.path ) ? "opacity-10" : 'opacity-0'} absolute top-0 left-0 z-10 h-full w-full bg-accent`}></span>
    </li>
  )
}