import Image from 'next/image'
import { OrderItem } from '@/interfaces'

import { formatCurrency } from '@/utils'
import { Counter } from '../ui/Counter'
import { useOrderStore } from '@/store/order-store'

import { Button } from '@/components'
import styles from './OrderSummaryItem.module.css'

type Props = {
  item: OrderItem
}

export const OrderSummaryItem = ({ item }: Props ) => {
	const removeItem = useOrderStore(( state ) => state.removeItem )
  return (
    <li className={ `${ styles.item }` }>
      <div className={ styles.product }>
        <div className={ styles.product__content }>
          <div className={ styles.product__image }>
            <Image src={ item.image ? item.image : '/images/logo.svg' } alt={ item.name } width={ 48 } height={ 48 } />
          </div>
          <div className={ styles.product__caption }>
            <div className={ styles.product__name }>{ item.name }</div>
            <div className={ styles.product__price }>{ formatCurrency( item.price ) }</div>         
          </div>
        </div>     
        <div className={ styles.subtotal }>{ formatCurrency( item.subtotal ) }</div>  
      </div>
      <div className={ styles.product__quantity }>
        <Counter item={ item } currentValue={ item.quantity } />
        <Button
          mode='error'
          iconName='trash'
          size='small'
          ghost 
          onClick={() => removeItem( item.id )}
        />
      </div> 
    </li>
  )
}