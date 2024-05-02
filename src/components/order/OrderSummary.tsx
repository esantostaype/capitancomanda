'use client'
import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/store';
import { OrderSummaryItem } from '@/components';
import { formatCurrency } from '@/utils';

import styles from './OrderSummary.module.css';
import { sendOrder } from '@/actions/send-order-action';
import { OrderSchema } from '@/schema';
import { toast } from 'react-toastify';

export const OrderSummary = () => {
  
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

  const handleSendOrder = async( formData: FormData ) => {
    
    const data = {
      table: formData.get('table'),
      delivery,
      total,
      order
    }

    const result = OrderSchema.safeParse( data )

    console.log( result )    
    if( !result.success ) {
      result.error.issues.forEach(( issue ) => {
        toast.error( issue.message )
      })
      return
    }

    const response = await sendOrder( data )

    if( response?.errors ) {
      response.errors.forEach(( issue ) => {
        toast.error( issue.message )
      })
    }

    setDelivery( false )

    toast.success('¡Comanda enviada!')

    clearOrder()
  }

  const handleDeliveryChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setDelivery( e.target.checked );
  };

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
            <form action={ handleSendOrder } className={ styles.summary__send }>
              <div className={ styles.summary__send__fields }>
                <div className={ styles.summary__send__delivery }>
                  <input
                    type="checkbox"
                    id="delivery"
                    name="delivery"
                    checked={ delivery }
                    onChange={ handleDeliveryChange }
                  />
                  <label htmlFor="delivery"></label>
                  <span>Para Llevar</span>
                </div>
                <input type="text" name='table' placeholder='Mesa N°' className={ styles.summary__input } />
              </div>
              <button className='button main-button'>Enviar Comanda</button>
            </form>
          </div>
        </div>
        </>
        )
      }
    </div>
  );
}