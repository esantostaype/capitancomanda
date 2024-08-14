import Image from 'next/image'
import { fetchData } from '@/utils'
import { Category } from '@/interfaces'
import Link from 'next/link'
import { setSession } from '@/utils/session'
import { OrderSidebarItem } from './OrderSidebarItem'

export const OrderSidebar = async() => {
const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, method: 'GET', token: token })

  return (
    <>
    <aside className="bg-surface border-r border-r-gray50 max-w-24 h-screen flex-[0_0_8rem] px-4 py-8 text-center">
      <Link href="/order" className="flex justify-center">
        <Image src="/images/logo-restify.svg" width="48" height="48" alt="Capitán Comanda" />
      </Link>
      <nav className="mt-8">
        <ul className="flex flex-col items-center gap-6">
          { categories.map( ( category: Category ) => (
            <OrderSidebarItem key={ category.id } category={ category }/>
          ))}
        </ul>
      </nav>
    </aside>
    </>
  )
}