import { OrderForm, OrderProductDetail, OrderSidebar, OrderSummary, ToastNotification } from '@/components'
import { OrderAllProductsItem } from '@/components/order/OrderSidebar/OrderAllProductsItem';
import { OrderSidebarItem } from '@/components/order/OrderSidebar/OrderSidebarItem';
import { Category } from '@/interfaces';
import { fetchData } from '@/utils';
import { setSession } from '@/utils/session';
import Image from 'next/image';
import Link from 'next/link';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, method: 'GET', token: token })
  const dayjs = require('dayjs')
  const locale_es = require('dayjs/locale/es')
  dayjs.locale(locale_es)


  const currentDate = `${ dayjs().format(`D `)} de ${ dayjs().format(`MMMM `) } del ${ dayjs().format(` YYYY, h:mm a`) }`
  return (
    <>
    <section className="flex">
      {/* <OrderSidebar/> */}
      <section className="flex-1 p-6">
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/order" className="flex justify-center">
              <Image src="/images/logo-restify.svg" width="40" height="40" alt="Capitán Comanda" />
            </Link>
            <input type="search" className="h-10 w-80 border border-gray100 px-4" placeholder='Buscar Producto' />
          </div>
        </header>
        <nav className="mb-4">
          <ul className="flex items-center gap-3">
            <OrderAllProductsItem/>
            { categories.map( ( category: Category ) => (
              <OrderSidebarItem key={ category.id } category={ category }/>
            ))}
          </ul>
        </nav>
        {/* <div className="mb-8">
          <h1 className="text-3xl font-semibold">Restify Comanda</h1>
          <div className="text-gray500">{ currentDate }</div>
        </div> */}
        { children }
      </section>
      <OrderSummary/>
    </section>
    <OrderForm/>
    </>
  );
}