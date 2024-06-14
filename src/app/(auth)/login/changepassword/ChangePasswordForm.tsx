'use client'
import { changePassword } from '@/actions/auth-actions'
import { Button, Spinner, TextField } from '@/components'
import { Formik, Form, FormikHelpers } from 'formik'
import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PasswordSchema } from '@/schema'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

interface FormValues {
  password: string
  confirmPassword: string
}

export const ChangePasswordForm = () => {
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => { 
    if ( passwordRef.current ) {
      passwordRef.current.focus()
    }
  }, [])

  const initialValues: FormValues = {
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues>) => {  
    const response = await changePassword( values.password, token! )
    
    if ( response.error ) {
      toast.error( response.message )
      router.push('/login/resetpassword')
    } else {
      toast.success( response.message )
      await signIn("credentials", {
        email: email,
        password: values.password
      })
      actions.setSubmitting(false);
      router.push('/admin')
    }
  }
  return (
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ PasswordSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <h1 className='auth__title'>Elige una nueva contraseña</h1>
        <Form className="form">
          <div className='form__column'>
            <div className="form__item">
              <TextField
                label='Contraseña'
                type='password'
                name='password'
                placeholder='Ingresa tu Contraseña'
                errors={ errors.password }
                touched={ touched.password }
                value={ values.password }
                innerRef={ passwordRef }
              />
            </div>
            <div className="form__item">
              <TextField
                label='Confirmar Contraseña'
                type='password'
                name='confirmPassword'
                placeholder='Confirma tu Contraseña'
                errors={ errors.confirmPassword }
                touched={ touched.confirmPassword }
                value={ values.confirmPassword }
              />
            </div>
            <div className='form__item'>
              <Button mode='primary' text="Cambiar Contraseña" size='large' full submit />
						</div>
          </div>
        </Form>
        </>
      )}
    </Formik>
  );
}