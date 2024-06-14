'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, TextField, Spinner } from '@/components'
import { toast } from 'react-toastify'
import { completeRegistration } from '@/actions/auth-actions'
import { SignUpCompleteSchema } from '@/schema'
import { useSearchParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect, useRef } from 'react'
import { signIn } from 'next-auth/react'

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

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {

    const registerData = {
      email: values.email,
      name: values.restaurantName,
      fullName: values.fullName,
      password: values.password,
      token
    }
    
    const response = await completeRegistration( registerData )

    console.log( "Aqui quiero ver el response o return de mi back: ", response )
    
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
        {({ errors, touched, values, isSubmitting, setFieldValue }) => (
          <>
            <div className={`isSubmitting ${isSubmitting && "active"}`}><Spinner /></div>
            <Form className="form">
              <div className='form__column'>
                <div className="form__item">
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
                </div>
                <div className="form__item">
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
                </div>
                <div className="form__item">
                  <TextField
                    label='Nombre Completo'
                    type='text'
                    name='fullName'
                    placeholder='Ingresa el Nombre Completo'
                    errors={ errors.fullName }
                    touched={ touched.fullName }
                    value={ values.fullName }
                  />
                </div>
                <div className="form__item">
                  <TextField
                    label='Contraseña'
                    type='password'
                    name='password'
                    placeholder='Ingresa la Contraseña'
                    errors={ errors.password }
                    touched={ touched.password }
                    value={ values.password }
                  />
                </div>
                <div className="form__item">
                  <TextField
                    label='Confirmar Contraseña'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirma la Contraseña'
                    errors={ errors.confirmPassword }
                    touched={ touched.confirmPassword }
                    value={ values.confirmPassword }
                  />
                </div>
                <div className='form__item acceptance'>
                  <p>Al registrarme, acepto las Condiciones del servicio de Capitán Comanda y su Política de privacidad.</p>
                </div>
                <div className='form__item'>
                  <Button mode='primary' text="Crear Restaurante" size='large' full submit />
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}
