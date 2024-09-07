'use client'
import { resetPassword } from '@/actions/auth-actions'
import { EmailSchema } from '@/schema'
import { Formik, Form, FormikHelpers } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { LinkComponent, Spinner, TextField } from '@/components'
import { AuthButton, AuthForm, AuthTitle } from '../../components'

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
    const response: any = await resetPassword( values.email )
  
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
        <Spinner isActive={ isSubmitting } />
        <AuthTitle title='¿Olvidaste tu Contraseña?' />
        { sendEmail
        ?
          <div className="flex flex-col items-center text-center">
            <div className="text-3xl h-16 w-16 rounded-full flex items-center justify-center bg-accent mb-4">
              <i className="fi fi-rr-paper-plane"></i>
            </div>
            <p>Te hemos enviado un enlace de recuperación a</p>
            <div className="font-semibold text-base inline-block">{ values.email }</div>
          </div>
        : 
          <AuthForm>
            <p className="text-center">Enviaremos un enlace de recuperación a</p>
            <TextField
              label='Correo Electrónico'
              name='email'
              placeholder='Ingresa tu Correo Electrónico'
              errors={ errors.email }
              touched={ touched.email }
              value={ values.email }
              innerRef={ emailRef }
            />
            <AuthButton label="Enviar enlace de recuperación" />
          </AuthForm>
        }
        </>
      )}
    </Formik>
    <div className="text-center mt-8">
      <p><LinkComponent text='Volver a Inicio de Sesión' href='/login'/></p>
    </div>
    </>
  )
}