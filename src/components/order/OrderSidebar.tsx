import Image from 'next/image'
import { OrderSidebarItem } from "@/components"

import styles from './OrderSidebar.module.css'
import { fetchData } from '@/utils'
import { Category } from '@/interfaces'
import Link from 'next/link'
import { setSession } from '@/utils/session'

export const OrderSidebar = async() => {
const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, method: 'GET', token: token })

  return (
    <>
    <aside className={ styles.content }>
      <div className={ styles.logo }>
        <Link href="/order">
          <Image src="/images/logo.svg" width="64" height="64" alt="Capitán Comanda" />
        </Link>
      </div>
      <nav className={ styles.nav }>
        <ul className={ styles.nav__list }>
          { categories.map( ( category: Category ) => (
            <OrderSidebarItem key={ category.id } category={ category }/>
          ))}
        </ul>
      </nav>
    </aside>
    </>
  )
}