'use client'
import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { PasswordSchema } from '@/schema'
import { changePassword } from '@/actions/auth-actions'
import { Spinner, TextField } from '@/components'
import { AuthButton, AuthForm, AuthTitle } from '../../components'

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
    const response: any = await changePassword( values.password, token! )
    
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
        <Spinner isActive={ isSubmitting } />
        <AuthTitle title='Elige una nueva contraseña' />
        <AuthForm>
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
          <TextField
            label='Confirmar Contraseña'
            type='password'
            name='confirmPassword'
            placeholder='Confirma tu Contraseña'
            errors={ errors.confirmPassword }
            touched={ touched.confirmPassword }
            value={ values.confirmPassword }
          />
          <AuthButton label="Cambiar Contraseña" />
        </AuthForm>
        </>
      )}
    </Formik>
  );
}