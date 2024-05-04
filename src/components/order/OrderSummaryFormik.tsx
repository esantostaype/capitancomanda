'use client'
import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/store';
import { OrderForm, OrderSummaryItem } from '@/components';
import { formatCurrency } from '@/utils';

import styles from './OrderSummaryFormik.module.css';

export const OrderSummaryFormik = () => {
  
  const order = useStore(( state ) => state.order )
  const setOrder = useStore((state) => state.setOrder)
  const clearOrder = useStore(( state ) => state.clearOrder )
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

  return (
    <div className={ styles.summary }>
      { order.length === 0
        ? (
        <div className={ styles.summary__empty }>
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
            <button onClick={ () => clearOrder() } className='button small error'><i className="fi fi-rr-ban"></i>Cancelar</button>
          </div>
          <div className={ styles.header__content }>
            <div className={ styles.header__item }>Item</div>
            <div className={ styles.header__subtotal }>Subtotal</div>
          </div>
        </div>
        <div className={ styles.summary__content }>
          <div className={ styles.summary__body }>
              <ul className={ styles.list }>
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