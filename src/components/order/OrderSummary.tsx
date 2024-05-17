'use client'
import { useEffect, useMemo, useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { OrderForm, OrderSummaryItem } from '@/components'
import { formatCurrency } from '@/utils'
import styles from './OrderSummary.module.css'
import { Button } from '@/components'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const OrderSummary = () => {
  
  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const [ delivery, setDelivery ] = useState<boolean>( false )

  useEffect(() => {
    const storedOrder = localStorage.getItem('order')
    if ( storedOrder ) {
      const parsedOrder = JSON.parse( storedOrder )
      setOrder( parsedOrder )
    }
  }, [ setOrder ])

  useEffect(() => {
    if ( order.length === 0 ) {
      setDelivery( false )
    }
  }, [ order ])

  const [ listRef ] = useAutoAnimate()

  return (
    <div className={ styles.summary }>
      { order.length === 0
        ? (
        <div className={ `${ styles.summary__empty } fadeIn` }>
          <div className={ styles.summary__empty__content }>
            <i className="fi fi-rr-empty-set"></i>
            <h3 className={ styles.summary__empty__title }>La Comanda está Vacía</h3>
          </div>
        </div>
        )
        : (
        <>
        <div className={ styles.header }>
          <div className={ styles.header__top }>
            <h3 className={ styles.title }>Orden</h3>
            <Button text='Cancelar' mode='error' iconName='ban' size='small' onClick={ () => clearOrder() } />
          </div>
          <div className={ styles.header__content }>
            <div className={ styles.header__item }>Item</div>
            <div className={ styles.header__subtotal }>Subtotal</div>
          </div>
        </div>
        <div className={ styles.summary__content }>
          <div className={ styles.summary__body }>
              <ul className={ styles.list } ref={ listRef }>
                { order.map( item => (
                  <OrderSummaryItem key={ `${ item.id }-${ item.spicyLevelNumber }` } item={ item } />
                ))}
              </ul>
          </div>
          <div className={ styles.summary__footer }>
            <div className={ styles.summary__footer__content }>
              <div className={ styles.summary__footer__label }>Total:</div>
              <div className={ styles.summary__footer__price }>{ formatCurrency( total ) }</div>
            </div>
            <OrderForm/>
          </div>
        </div>
        </>
        )
      }
    </div>
  );
}