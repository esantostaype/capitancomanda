import { setSession } from '@/utils/session'
import { OrderForm, OrderHeader, OrderProductDetail, OrderSummary } from './components'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {  
  const { token, branchId } = await setSession()
  return (
    <>
    <section className="flex flex-col md:flex-row min-h-dvh">
      <section className="flex flex-1 flex-col pb-16 md:pb-0">
        <OrderHeader/>
        <div className='flex flex-1 flex-col'>
          { children }
        </div>
      </section>
      <OrderSummary/>
    </section>
    <OrderForm token={ token }/>
    <OrderProductDetail token={ token } />
    </>
  );
}