import { OrderSidebar, OrderSummary, ToastNotification } from "@/components"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const dayjs = require('dayjs')
  const locale_es = require('dayjs/locale/es')
  dayjs.locale(locale_es)

  const currentDate = `${ dayjs().format(`D `)} de ${ dayjs().format(`MMMM `) } del ${ dayjs().format(` YYYY, h:mm a`) }`
  return (
    <>
    <section className="orders">
      <OrderSidebar/>
      <section className="orders__content">
        <div className="orders__header">
          <div className="orders__header__content">
            <h1 className="orders__header__title">Capitán Comanda</h1>
            <div className="orders__date">{ currentDate }</div>
          </div>
        </div>
        { children }
      </section>
      <OrderSummary/>
    </section>
    </>
  );
}