'use client'

import { Formik, Form, FormikHelpers } from 'formik'
import { Button, TextField } from '@/components'
import { changeStatusOrder } from '@/actions/change-status-order-action'
import { toast } from 'react-toastify'

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

  const handleSubmit = async ( values: FormValues ) => {
    await changeStatusOrder( orderId, values )
  }

  return (
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
      <Form>
        <input type="hidden" value={ status } name="status" />
        <Button
          mode='primary'
          text={ text }
          ghost
          full
          submit
        />
      </Form>
    </Formik>
  )
}