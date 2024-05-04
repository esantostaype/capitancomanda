'use client'

import { fetchData } from '@/utils';
import { Formik, Form, FormikHelpers } from 'formik';

type Props = {
  text: string
  orderId: number
  status: string
}

interface FormValues {
  status: string
}

export const ComandaButton = ({ text, orderId, status }: Props ) => {

  const initialValues: FormValues = {
    status
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const orderUpdateData = {
      status: values.status
    }
    await fetchData({ url: `/orders/${ orderId }`, method: 'PUT', body: orderUpdateData })
  }

  return (
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
      <Form>
        <input type="hidden" value={ status } name="status" />
        <button className='button ghost-button'>{ text }</button>
      </Form>
    </Formik>
  )
}