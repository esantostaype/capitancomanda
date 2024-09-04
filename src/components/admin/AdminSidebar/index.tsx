'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Role } from '@/interfaces'
import { AdminSidebarTitle } from './AdminSidebarTitle'
import { AdminSidebarItem } from './AdminSidebarItem'
import { Logout } from '../Logout'

export const AdminSidebar = () => {

  const { data: session } = useSession()

  const navAdminItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      iconName: 'dashboard'
    },
    {
      label: 'Usuarios',
      path: '/admin/users',
      iconName: 'user-pen'
    },
    {
      label: 'Productos',
      path: '/admin/products',
      iconName: 'box-open-full'
    },
    {
      label: 'Categorías',
      path: '/admin/categories',
      iconName: 'category'
    },
    {
      label: 'Órdenes',
      path: '/admin/orders',
      iconName: 'bell-concierge'
    }
  ]

  const navAppItems = [
    {
      label: 'Cocina',
      path: '/kitchen',
      iconName: 'fire-burner',
      target: '_blank'
    },
    {
      label: 'Comanda',
      path: '/order',
      iconName: 'note-sticky',
      target: '_blank'
    }
  ]

  if ( session?.user.role === Role.OWNER ) {
    navAdminItems.splice( 1, 0, {
      label: 'Sucursales',
      path: '/admin/branches',
      iconName: 'store-alt'
    })
  }

  return (
    <aside className="flex flex-col h-screen overflow-y-auto w-64 bg-surface border-gray50 border-r">
      <div className="flex items-center sticky font-semibold text-2xl gap-2 p-6 w-full leading-6">
        <Image src="/images/logo-restify.svg" width="32" height="32" alt="Restify" />
        <h2>Restify</h2>
      </div>
      <nav className="flex flex-col flex-1 overflow-y-auto mt-4">
        <ul className="flex-1 flex flex-col justify-between gap-8">
          <li>
            <AdminSidebarTitle label='Administración' />
            <ul className="flex flex-col gap-2 px-3">
              { navAdminItems.map(( item, index ) => (
                <AdminSidebarItem key={ index } item={ item } />
              ))}
            </ul>
          </li>
          <li>
            <div className="uppercase flex items-center gap-2 text-xs px-6 text-gray500 mb-3">
              <span>Aplicaciones</span>
              <span className="h-[1px] w-full bg-gray50"></span>
            </div>
            <ul className="flex flex-col gap-2 px-3">
              { navAppItems.map(( item, index ) => (
                <AdminSidebarItem key={ index } item={ item } />
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <ul className="flex flex-col gap-2 p-3">
              <li className="group">
                <Link href="#" className="relative text-gray700 group-hover:text-accent flex items-center gap-3 px-3 py-2 z-20" >
                  <i className={`fi fi-tr-customize text-lg leading-4`}></i>
                  Configuraciones
                </Link>
              </li>
              <Logout/>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  )
}