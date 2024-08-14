'use client'
import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { completeRegistration } from '@/actions/auth-actions'
import { SignUpCompleteSchema } from '@/schema'
import { TextField, Spinner } from '@/components'
import { AuthButton, AuthForm, AuthTitle } from '../../components'

interface FormValues {
  email: string
  fullName: string
  restaurantName: string
  password: string
  confirmPassword: string
}

export const SignUpCompleteForm = () => { 

  const restaurantNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ( restaurantNameRef.current ) {
      restaurantNameRef.current.focus()
    }
  }, []) 

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const initialValues: FormValues = {
    email: email || '',
    fullName: '',
    restaurantName: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {

    const registerData = {
      email: values.email,
      name: values.restaurantName,
      fullName: values.fullName,
      password: values.password,
      token
    }
    
    const response = await completeRegistration( registerData )
    
    if ( response.error ) {
      toast.error( response.message )
    } else {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })
      actions.setSubmitting(false)
      toast.success('¡Tienda registrada exitosamente!')
      router.push('/admin')
    }  
  }
  
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={ handleSubmit } validationSchema={ SignUpCompleteSchema } >
        {({ errors, touched, values, isSubmitting }) => (
          <>
          <Spinner isActive={ isSubmitting } />
          <AuthTitle title='Completa tu Registro' />
          <AuthForm>
            <TextField
              label='Correo Electrónico'
              type='text'
              name='email'
              placeholder='Ingresa el Correo Electrónico'
              errors={ errors.email }
              touched={ touched.email }
              value={ email }
              disabled
            />
            <TextField
              label='Nombre de tu Restaurante'
              type='text'
              name='restaurantName'
              placeholder='Ingresa el Nombre de tu Restaurante'
              errors={ errors.restaurantName }
              touched={ touched.restaurantName }
              value={ values.restaurantName }
              innerRef={ restaurantNameRef }
            />
            <TextField
              label='Nombre Completo'
              type='text'
              name='fullName'
              placeholder='Ingresa el Nombre Completo'
              errors={ errors.fullName }
              touched={ touched.fullName }
              value={ values.fullName }
            />
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              placeholder='Ingresa la Contraseña'
              errors={ errors.password }
              touched={ touched.password }
              value={ values.password }
            />
            <TextField
              label='Confirmar Contraseña'
              type='password'
              name='confirmPassword'
              placeholder='Confirma la Contraseña'
              errors={ errors.confirmPassword }
              touched={ touched.confirmPassword }
              value={ values.confirmPassword }
            />
            <AuthButton label="Crear Restaurante" />
          </AuthForm>
          </>
        )}
      </Formik>
    </>
  )
}