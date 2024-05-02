import { OrderSidebar, OrderSummary, ReadyOrders, ToastNotification } from "@/components";
import moment from "moment";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
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
    <ReadyOrders/>
    <ToastNotification/>
    </>
  );
}