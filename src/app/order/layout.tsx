import { OrderSidebar, OrderSummary, ToastNotification } from '@/components'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const dayjs = require('dayjs')
  const locale_es = require('dayjs/locale/es')
  dayjs.locale(locale_es)

  const currentDate = `${ dayjs().format(`D `)} de ${ dayjs().format(`MMMM `) } del ${ dayjs().format(` YYYY, h:mm a`) }`
  return (
    <>
    <section className="flex">
      <OrderSidebar/>
      <section className="flex-1 p-8">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-semibold">Restify Comanda</h1>
          <div className="text-gray500">{ currentDate }</div>
        </div> */}
        { children }
      </section>
      <OrderSummary/>
    </section>
    </>
  );
}