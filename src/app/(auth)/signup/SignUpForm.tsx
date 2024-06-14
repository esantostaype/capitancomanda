'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, TextField, Spinner } from '@/components'
import { toast } from 'react-toastify'
import { register } from '@/actions/auth-actions'
import { EmailSchema } from '@/schema'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { OAuth } from '@/components'

interface FormValues {
  email: string
}

export const SignUpForm = () => {

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ( emailRef.current ) {
      emailRef.current.focus()
    }
  }, [])

  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenExpired = searchParams.get('token')

  const initialValues: FormValues = {
    email: ''
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const registerData = {
      email: values.email
    };
  
    const response = await register(registerData)

    if ( response.user ) {
      if ( response.user.isVerified === true ) {
        router.push(`/login?email=${ values.email }`)
        actions.setSubmitting(false)
        return
      }
      else {
        toast.error( response.message )
        actions.setSubmitting(false)
        return
      }
    }

    if ( response.newUser ) {
      router.push('/signup/verify');
      actions.setSubmitting(false);
      return
    }
  }
  
  return (
    <>
    <Formik initialValues={initialValues} onSubmit={ handleSubmit } validationSchema={ EmailSchema } >
      {({ errors, touched, values, isSubmitting }) => (
        <>
          <div className={`isSubmitting ${isSubmitting && "active"}`}><Spinner /></div>          
          <h1 className='auth__title'>Regístrate para continuar</h1>
          <Form className="form">
            <div className='form__column'>
              { tokenExpired === 'expired' &&
                <div className="form__item error">
                  <p>No se pudo verificar el correo electrónico. El token es inválido o ha expirado.</p>
                </div>
              }
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
              <div className='form__item acceptance'>
                <p>Al registrarme, acepto las Condiciones del servicio de Capitán Comanda y su Política de privacidad.</p>
              </div>
              <div className='form__item'>
                <Button mode='primary' text="Registrarse" size='large' full submit />
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
    <OAuth/>
    <div className='auth__footer'>
      <p className='text-center'>¿Ya tienes una cuenta? <Link href="/login" className='link'>Iniciar Sesión</Link></p>
    </div>
    </>
  )
}
