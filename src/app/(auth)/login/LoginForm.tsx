'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { LoginSchema } from '@/schema'
import { useRef, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { Spinner, TextField, Checkbox, LinkComponent,  } from '@/components'
import { AuthButton, AuthForm, AuthTitle, OAuth } from '../components'

interface FormValues {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
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
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ LoginSchema }>
      {({ errors, touched, values, isSubmitting, handleChange }) => (
        <>
          <Spinner isActive={ isSubmitting } />
          <AuthTitle title='Inicia Sesión' />
          <AuthForm>
            {
              email &&
              <div className='text-center'>
                <p>Ya tienes una cuenta registrada</p>
              </div>
            }
            <TextField
              label='Correo Electrónico'
              name='email'
              type='email'
              placeholder='Ingresa tu Correo Electrónico'
              errors={ errors.email }
              touched={ touched.email }
              value={ values.email }
              innerRef={ emailRef }
            />
            <TextField
              label='Contraseña'
              name='password'
              type='password'
              placeholder='Ingresa tu Contraseña'
              errors={ errors.password }
              touched={ touched.password }
              value={ values.password }
              innerRef={ passwordRef }
            />
            <div className="flex items-center justify-between gap-8">
              <Checkbox
                label="Recuérdame"
                name="rememberMe"
                checked={ values.rememberMe }
                onChange={ handleChange }
              />
              <LinkComponent text='¿Olvidaste tu contraseña?' href='/login/resetpassword'/>
            </div>
            <AuthButton label="Iniciar Sesión" />
          </AuthForm>
        </>
      )}
    </Formik>
    <OAuth/>
    <div className='text-center'>
      <p>¿Aún no tienes una cuenta? <LinkComponent text='Regístrate' href='/signup'/></p>
    </div>
    </>
  )
}