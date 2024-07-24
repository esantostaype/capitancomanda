'use client'
import { useEffect, useMemo, useState } from 'react'
import { useOrderStore } from '@/store/order-store'

import styles from './OrderForm.module.css'

import { Formik, Form, Field, FormikHelpers } from 'formik'
import { OrderItem } from '@/interfaces'
import { toast } from 'react-toastify'
import { revalidatePath } from 'next/cache'
import { Button, Spinner, Switch } from '@/components'
import { addOrder } from '@/actions/send-order-action'
import { io } from 'socket.io-client'
import { apiUrl } from '@/utils'

interface FormValues {
  total: number
  table: string
  delivery: boolean
  order: OrderItem[]
}

export const OrderForm = () => {
  
  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const [ delivery, setDelivery ] = useState<boolean>( false )

  const initialValues: FormValues = {
    table: '',
    total,
    delivery,
    order
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    
    const orderData = {
      table: values.table,
      total,
      delivery,
      order
    }

    const result = await addOrder( orderData )

    if( !result.success ) {
      result.errors.forEach(( issue: any ) => {
        toast.error( issue )
      })
      return
    }

    setDelivery(false)
    toast.success('¡Comanda enviada!')
    clearOrder()
    revalidatePath('/kitchen')
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
      {({ isSubmitting }) => (   
      <><div className={ `${ styles.isSubmitting } ${ isSubmitting && styles.active }`  }><Spinner/></div>
      <Form className={ styles.summary__send }>
        <div className={styles.summary__send__fields}>
          <Switch
            checked={ delivery }
            onChange={ setDelivery }
            label="Para Llevar"
            size="normal"
          />
          <Field type="text" name="table" placeholder="Mesa N°" className={ styles.summary__input } />
        </div>
        <Button
          text='Enviar Comanda'
          mode='primary'
          size='large'
          submit
          full
        />
      </Form>
      </>
      )}
    </Formik>
  )
}