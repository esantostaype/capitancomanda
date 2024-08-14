'use client'
import { useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { completeRegistrationOAuth } from '@/actions/auth-actions'
import { SignUpCompleteOAuthSchema } from '@/schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { TextField, Spinner } from '@/components'
import { AuthButton, AuthForm, AuthTitle } from '../../../components'

interface FormValues {
  email: string
  fullName: string
  restaurantName: string
  password: string
  confirmPassword: string
}

export const SignUpCompleteOAuthForm = () => {

  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const restaurantNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ( restaurantNameRef.current ) {
      restaurantNameRef.current.focus()
    }
  }, []) 

  const [ initialValues, setInitialValues] = useState<FormValues>({
    email: '',
    restaurantName: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if ( session?.user?.email) {
      setInitialValues(prevValues => ({
        ...prevValues,
        email: session?.user?.email ||''
      }));
    }
    if ( session?.user?.name) {
      setInitialValues(prevValues => ({
        ...prevValues,
        fullName: session?.user?.name ||''
      }));
    }
  }, [ session ]);

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {

    const registerData = {
      email: values.email,
      fullName: values.fullName,
      name: values.restaurantName,
      password: values.password
    }
    
    const response = await completeRegistrationOAuth( registerData )
    
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
      <Formik initialValues={initialValues} onSubmit={ handleSubmit } validationSchema={ SignUpCompleteOAuthSchema } enableReinitialize>
        {({ errors, touched, values, isSubmitting, setFieldValue }) => (
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
                value={ session?.user?.email || email }
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
                placeholder='Ingresa tu Nombre Completo'
                errors={ errors.fullName }
                touched={ touched.fullName }
                value={ session?.user?.name }
                disabled
              />
              <TextField
                label='Contraseña'
                type='password'
                name='password'
                placeholder='Ingresa tu Contraseña'
                errors={ errors.password }
                touched={ touched.password }
                value={ values.password }
              />
              <TextField
                label='Confirmar Contraseña'
                type='password'
                name='confirmPassword'
                placeholder='Confirma tu Contraseña'
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
