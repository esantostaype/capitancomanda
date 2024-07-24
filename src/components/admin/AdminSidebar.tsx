'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './AdminSidebar.module.css'
import { usePathname } from 'next/navigation'
import { Logout } from '@/components'

type Props = {
}

const navItems = [
  {
    label: 'Dashboard',
    path: '/admin',
    iconName: 'dashboard'
  },
  {
    label: 'Sucursales',
    path: '/admin/branches',
    iconName: 'note-sticky'
  },
  {
    label: 'Usuarios',
    path: '/admin/users',
    iconName: 'user-pen'
  },
  {
    label: 'Productos',
    path: '/admin/products',
    iconName: 'fish'
  },
  {
    label: 'Categorías',
    path: '/admin/categories',
    iconName: 'crab'
  },
  {
    label: 'Órdenes',
    path: '/admin/orders',
    iconName: 'bell-concierge'
  },
  {
    label: 'Cocina',
    path: '/kitchen',
    iconName: 'fire-burner',
    target: '_blank'
  },
  {
    label: 'Capitán Comanda',
    path: '/order',
    iconName: 'note-sticky',
    target: '_blank'
  }
]

export const AdminSidebar = ({  }: Props ) => {

  const pathName = usePathname()

  const isActivePath = ( path: string ) => {
    return pathName === path || pathName.startsWith(`${path}/admin`)
  }

  return (
    <aside className={ styles.content }>
      <div className={ styles.logo }>
        <Image src="/images/logo.svg" width="48" height="48" alt="Capitán Comanda" />
        <h2>Capitán Picante</h2>
      </div>
      <nav className={ styles.nav }>
        <ul className={ styles.nav__list }>
          { navItems.map(( item, index ) => (
            <li key={index} className={`${ isActivePath( item.path ) ? styles.active : '' }`}>
              <Link href={ item.path } target={ item.target ? '_blank' : '' } >
                <i className={`fi fi-tr-${ item.iconName }`}></i>
                { item.label }
              </Link>
            </li>
          ))}
        </ul>
        <Logout/>
      </nav>
    </aside>
  )
}