'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Spinner, TextField, Checkbox } from '@/components'
import { toast } from 'react-toastify'
import { login } from '@/actions/auth-actions'
import { LoginSchema } from '@/schema'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRef, useEffect } from 'react'
import { OAuth } from '@/components'
import { signIn, useSession } from 'next-auth/react'

interface FormValues {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { data: session } = useSession()
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const path = searchParams.get('path')

  useEffect(() => {
    if (email && passwordRef.current) {
      passwordRef.current.focus()
    }
    if (!email && emailRef.current) {
      emailRef.current.focus()
    }
  }, [email])

  const initialValues: FormValues = {
    email: email || '',
    password: '',
    rememberMe: false
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        redirect: false,
      })
      if ( response?.error ) {
        toast.error( response?.error )
        if ( response.error === 'Por favor, completa tu registro' ) {
          router.push(`/signup/oauth/complete?email=${ values.email }`)
        }
      } else {
        toast.success( "¡Inicio de sesión exitoso!" )
        router.push( path ? path : '/admin' )
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error('Ocurrió un error inesperado')
    } finally {
      actions.setSubmitting( false )
    }
  }

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema}>
      {({ errors, touched, values, isSubmitting, handleChange }) => (
        <>
          <div className={`isSubmitting ${isSubmitting && "active"}`}><Spinner /></div>
          <h1 className='auth__title'>Inicia sesión</h1>
          <Form className="form">
            <div className='form__column'>
              {
                email &&
                <div className='form__item text-center'>
                  <p>Ya tienes una cuenta registrada</p>
                </div>
              }
              
              <div className="form__item">
                <TextField
                  label='Correo Electrónico'
                  type='email'
                  name='email'
                  placeholder='Ingresa tu Correo Electrónico'
                  errors={errors.email}
                  touched={touched.email}
                  value={values.email}
                  innerRef={emailRef}
                />
              </div>
              <div className="form__item">
                <TextField
                  label='Contraseña'
                  type='password'
                  name='password'
                  placeholder='Ingresa tu Contraseña'
                  errors={errors.password}
                  touched={touched.password}
                  value={values.password}
                  innerRef={passwordRef}
                />
              </div>
              <div className="form__item auth__remember-reset">
                <Checkbox
                  label="Recuérdame"
                  name="rememberMe"
                  checked={ values.rememberMe }
                  onChange={ handleChange }
                />
                  <Link href="/login/resetpassword" className='link'>¿Olvidaste tu contraseña?</Link>
              </div>
              <div className='form__item'>
                <Button mode='primary' text="Iniciar Sesión" size='large' full submit />
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
    <OAuth/>
    <div className='auth__footer'>
      <p className='text-center'>¿Aún no tienes una cuenta? <Link href="/signup" className='link'>Regístrate</Link></p>
    </div>
    </>
  )
}