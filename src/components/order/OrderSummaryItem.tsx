import Image from 'next/image';
import { OrderItem } from '@/types'

import styles from './OrderSummaryItem.module.css';
import { formatCurrency } from '@/utils';
import { Counter } from '../ui/Counter';
import { useStore } from '@/store';


type Props = {
  item: OrderItem
}

export const OrderSummaryItem = ({ item }: Props ) => {
	const removeItem = useStore(( state ) => state.removeItem )
  return (
    <li className={ styles.item }>
      <div className={ styles.product }>
        <div className={ styles.product__content }>
          <div className={ styles.product__image }>
            <Image src={ item.image ? item.image : '/images/logo.svg' } alt={ item.name } width={ 48 } height={ 48 } />
          </div>
          <div className={ styles.product__caption }>
            <div className={ styles.product__name }>{ item.name }</div>
            <div className={ styles.product__price }>{ formatCurrency( item.price ) }</div> 
            { item.spicyLevel && (
              <div className={ styles.spicyLevel }>Nivel de Picante: <strong>{ item.spicyLevelNumber }</strong></div>
            )}           
          </div>
        </div>     
        <div className={ styles.subtotal }>{ formatCurrency( item.subtotal ) }</div>  
      </div>
      <div className={ styles.product__quantity }>
        <Counter item={ item } currentValue={ item.quantity } />
        <button onClick={() => removeItem( item.id, item.spicyLevelNumber )} className={ styles.product__delete }>
          <i className="fi fi-rr-trash"></i>
        </button>
      </div> 
    </li>
  )
}