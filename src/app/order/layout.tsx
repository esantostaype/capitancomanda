import { setSession } from '@/utils/session';
import { OrderForm, OrderNav, OrderProductDetail, OrderSummary } from './components'
import Image from 'next/image';
import Link from 'next/link';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {  
  const { token } = await setSession()
  return (
    <>
    <section className="flex">
      <section className="flex flex-1 flex-col p-6">
        <header>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link href="/order" className="flex justify-center">
                <Image src="/images/logo-restify.svg" width="40" height="40" alt="Capitán Comanda" />
              </Link>
              <input type="search" className="h-10 w-80 border border-gray100 px-4" placeholder='Buscar Producto' />
            </div>
          </div>
          <OrderNav/>
        </header>
        { children }
      </section>
      <OrderSummary/>
    </section>
    <OrderForm token={ token! }/>
    {/* <OrderProductDetail token={ token! } /> */}
    </>
  );
}