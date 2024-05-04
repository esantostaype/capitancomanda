'use client'
import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/store';

import styles from './OrderForm.module.css';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import { OrderItem } from '@/types';
import { OrderSchema } from '@/schema';
import { toast } from 'react-toastify';
import { fetchData } from '@/utils';

interface FormValues {
  total: number
  table: string
  delivery: boolean
  order: OrderItem[]
}

export const OrderForm = () => {
  
  const order = useStore(( state ) => state.order )
  const setOrder = useStore((state) => state.setOrder)
  const clearOrder = useStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const [ delivery, setDelivery ] = useState<boolean>( false )

  const handleDeliveryChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setDelivery( e.target.checked )
  }

  const initialValues: FormValues = {
    table: '',
    total,
    delivery,
    order
  };

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    
    const orderData = {
      table: values.table,
      total,
      delivery,
      order
    };

    await fetchData({ url: '/orders', method: 'POST', body: orderData })

    const result = OrderSchema.safeParse( orderData )

    if( !result.success ) {
      result.error.issues.forEach(( issue ) => {
        toast.error( issue.message )
      })
      return
    }

    setDelivery( false )
    toast.success('¡Comanda enviada!')
    clearOrder()
  }

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
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
      <Form className={ styles.summary__send }>
        <div className={styles.summary__send__fields}>
          <div className={styles.summary__send__delivery}>
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
          <Field type="text" name="table" placeholder="Mesa N°" className={ styles.summary__input } />
        </div>
        <button type="submit" className="button main-button">
          Enviar Comanda
        </button>
      </Form>
    </Formik>
  )
}