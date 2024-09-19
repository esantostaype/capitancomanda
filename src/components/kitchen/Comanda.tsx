import { OrderStatus, OrderWithProducts } from '@/interfaces'
import styles from './Comanda.module.css'
import moment from "moment"
import 'moment/locale/es'
import { ComandaButton } from './ComandaButton'
moment.locale('es')

interface Props {
  order: OrderWithProducts
  className?: string
  status: string
  textButton: string
}

export const Comanda = ({ order, className, status, textButton }: Props) => {

  const timeAgo = moment( order.date ).fromNow();
  const isLate = moment().diff(moment( order.date ), 'minutes' ) > 30;

  const combinedClassName = `${ styles.comanda} ${className || '' } ${ isLate && order.status != OrderStatus.READY ? styles.isLate : '' }`;

  return (
    <li  className={ combinedClassName.trim() }>
      {/* <div className={ styles.header }>
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
        <ComandaButton text={ textButton } status={ status } orderId={ order.id } />
        { isLate && order.status !== OrderStatus.READY && ( <div className={ styles.isLate }>Este pedido está tarde</div> ) }
      </div> */}
    </li>
  )
}