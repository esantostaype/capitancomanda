'use client'
import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { register } from '@/actions/auth-actions'
import { EmailSchema } from '@/schema'
import { TextField, Spinner, LinkComponent } from '@/components'
import { AuthButton, AuthForm, AuthTitle, OAuth } from '../components'

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
          <Spinner isActive={ isSubmitting } />
          <AuthTitle title='Regístrate para continuar' />
          <AuthForm>
            { tokenExpired === 'expired' &&
              <div className="text-error">
                <p>No se pudo verificar el correo electrónico. El token es inválido o ha expirado.</p>
              </div>
            }
            <TextField
              label='Correo Electrónico'
              name='email'
              placeholder='Ingresa tu Correo Electrónico'
              errors={ errors.email }
              touched={ touched.email }
              value={ values.email }
              innerRef={ emailRef }
            />
            <p className="text-xs text-gray500 text-center">Al registrarme, acepto las Condiciones del servicio de Capitán Comanda y su Política de privacidad.</p>
            <AuthButton label="Registrarse" />
          </AuthForm>
        </>
      )}
    </Formik>
    <OAuth/>
    <div className='text-center'>
      <p>¿Ya tienes una cuenta? <LinkComponent text='Iniciar Sesión' href='/login'/></p>
    </div>
    </>
  )
}
