import { getRestaurant } from '@/actions/restaurant-actions';
import { setSession } from '@/utils/session';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Restify'
}

export default async function AdminPage() {

  const { branchId } = await setSession()
  const restaurant = await getRestaurant("c4066536-bf0d-44a1-9491-daec245f0337")

  console.log("RESTAURANT: ", restaurant)

  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Dashboard</h1>
    </header>
    <section className="admin__content">
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-3">
              <article className="card summary products">
                <div className="card-summary__header">
                  <h2 className="card__label">Productos</h2>
                  <span className="card__icon">
                    <i className={`fi fi-tr-fish`}></i>
                  </span>
                </div>
                <span className="card__count">54</span>
              </article>
            </div>
            <div className="col-3">
              <article className="card summary categories">
                <div className="card-summary__header">
                  <h2 className="card__label">Categorías</h2>
                  <span className="card__icon">
                    <i className={`fi fi-tr-crab`}></i>
                  </span>
                </div>
                <span className="card__count">12</span>
              </article>
            </div>
            <div className="col-3">
              <article className="card summary users">
                <div className="card-summary__header">
                  <h2 className="card__label">Usuarios</h2>
                  <span className="card__icon">
                    <i className={`fi fi-tr-user-pen`}></i>
                  </span>
                </div>
                <span className="card__count">5</span>
              </article>
            </div>
            <div className="col-3">
              <article className="card summary orders">
                <div className="card-summary__header">
                  <h2 className="card__label">Órdenes totales</h2>
                  <span className="card__icon">
                    <i className={`fi fi-tr-bell-concierge`}></i>
                  </span>
                </div>
                <span className="card__count">212</span>
              </article>
            </div>
            <div className="col-12">
              <article className="card full">
                <h2 className="card__title">Órdenes de la Semana</h2>
              </article>
            </div>
          </div>
        </div>
        <div className="col-4">
          <article className="card">
            <h2 className="card__title">Productos más vendidos</h2>
          </article>
        </div>
      </div>
    </section>
    </>
  );
}