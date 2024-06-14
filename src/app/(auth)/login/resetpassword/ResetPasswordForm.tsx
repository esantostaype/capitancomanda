'use client'
import { resetPassword } from '@/actions/auth-actions'
import { Button, Spinner, TextField } from '@/components'
import { EmailSchema } from '@/schema'
import { Formik, Form, FormikHelpers } from 'formik'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface FormValues {
  email: string
}

export const ResetPasswordForm = () => {
  
  const emailRef = useRef<HTMLInputElement>(null)
  const [ sendEmail, setSendEmail] = useState( false )

  useEffect(() => { 
    if ( emailRef.current ) {
      emailRef.current.focus()
    }
  }, [])

  const initialValues: FormValues = {
    email: ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues>) => {  
    const response = await resetPassword( values.email )
  
    if ( response.error ) {
      toast.error( response.message )
    }

    if ( response.ok === true ) {
      actions.setSubmitting(false)
      setSendEmail( true )
      return
    }
  }

  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ EmailSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <h1 className='auth__title'>¿Olvidaste tu Contraseña?</h1>
        { sendEmail
        ?
          <div className='send-email'>
            <div className='send-email__icon'>
              <i className="fi fi-rr-paper-plane"></i>
            </div>
            <p>Te hemos enviado un enlace de recuperación a</p>
            <div className='send-email__main'>{ values.email }</div>
          </div>
        : 
          <Form className="form">
            <div className='form__column'>
              <div className='form__item'>
                <p className='text-center'>Enviaremos un enlace de recuperación a</p>
              </div>
              <div className="form__item">
                <TextField
                  label='Correo Electrónico'
                  name='email'
                  placeholder='Ingresa tu Correo Electrónico'
                  errors={ errors.email }
                  touched={ touched.email }
                  value={ values.email }
                  innerRef={ emailRef }
                />
              </div>
              <div className='form__item'>
                <Button mode='primary' text="Enviar enlace de recuperación" size='large' full submit />
              </div>
            </div>
          </Form>
        }
        </>
      )}
    </Formik>
    <div className='auth__footer'>
      <p className='text-center'><Link href="/login" className='link'>Volver a Inicio de Sesión</Link></p>
    </div>
    </>
  )
}