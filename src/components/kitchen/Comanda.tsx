import { readyOrder, inPreparationOrder } from '@/actions/change-status-order-action';
import { OrderWithProducts } from '@/types';
import { getSpicyLevelText } from '@/utils';
import styles from './Comanda.module.css';
import moment from "moment";
import 'moment/locale/es'
moment.locale('es')

type Props = {
  order: OrderWithProducts
  className?: string
}

export const Comanda = ({ order, className }: Props) => {

  const timeAgo = moment( order.date ).fromNow();
  const isLate = moment().diff(moment( order.date ), 'minutes' ) > 30;

  const combinedClassName = `${ styles.comanda} ${className || '' } ${ isLate && order.status != "Lista" ? styles.isLate : '' }`;

  return (
    <li  className={ combinedClassName.trim() }>
      <div className={ styles.header }>
        <h4 className={ styles.tableNumber }>Mesa # { order.table }</h4>
        <span className={ styles.hour }>{ timeAgo }</span>
        {
          order.delivery && <div className={ styles.delivery }><i className="fi fi-rr-shopping-bag"></i></div>
        }        
      </div>
      <ul className={ styles.list }>
        {
          order.orderProducts.map( item => (
            <li className={ styles.item } key={`${ item.id }-${ item.spicyLevelNumber }`}>
              <div className={ styles.item__quantity }>x{ item.quantity }</div>
              <div className={ styles.item__content }>
                <h3 className={ styles.item__content__name }>{ item.product.name }</h3>
                <span className={ styles.item__content__scipyLevel }>{ getSpicyLevelText( item.spicyLevelNumber! )}</span>
              </div>
            </li>
          ))
        }
      </ul>
      <div className={ styles.footer }>
        {
          order.status === "Recibida" && (
            <form action={ inPreparationOrder }>
              <input type="hidden" value={ order.id } name="order_id" />
              <button className='button ghost-button'>Preparar</button>
            </form>
          )
        }
        {
          order.status === "En Preparación" && (
            <form action={ readyOrder }>
              <input type="hidden" value={ order.id } name="order_id" />
              <button className='button ghost-button'>Lista para Servir</button>
            </form>
          )
        }
        { isLate && order.status != "Lista" && ( <div className={ styles.isLate }>Este pedido está tarde</div> ) }
      </div>
    </li>
  )
}