'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Select, User, Role, roleTranslations } from '@/interfaces'
import { addUser, editUser } from '@/actions/user-actions'
import { useUiStore } from '@/store/ui-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UserSchema } from '@/schema'

interface FormValues {
  email: string,
  fullName: string,
  role: Role | '',
  password: string,
  confirmPassword: string
}

type Props = {
  user?: User
  token?: string
}

export const UsersForm = ({ user, token }: Props) => {

  console.log( "Usuario GHAAAA: ", user )

  const { closeModalPage } = useUiStore()

  const roleOptions = [
    { value: '', label: 'Selecciona un Rol' },
    ...Object.values(Role).filter(role => typeof role === 'string').map(role => ({
      value: role,
      label: roleTranslations[ role as Role ]
    }))
  ];

  const initialValues: FormValues = {
    email: user && user.email ? user.email : '',
    fullName: user && user.fullName ? user.fullName : '',
    role: user ? user.role : '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const userPayload = {
      email: values.email,
      password: values.password,
      role: values.role
    }

    { user
      ? await editUser( user.id, userPayload, token ? token : '' )
      : await addUser( userPayload, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModalPage( true )
    toast.success('Usuario Actualizado!')
  }
  
  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ UserSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <Form className="form">
          <div className="block__body">
            <div className="block__body__content isPage">
              <div className="row-form">
                <div className="col-form-6">
                  <TextField
                    label='Email'
                    type='email'
                    name='email'
                    placeholder='Ingresa el Email de usuario'
                    errors={ errors.email }
                    touched={ touched.email }
                    value={ values.email }
                  />
                </div>
                <div className="col-form-6">
                  <TextField
                    options={ roleOptions }
                    asSelect
                    label="Rol"
                    name="role"
                    errors={ errors.role }
                    touched={ touched.role }
                    value={ values.role }
                  />
                </div>
                <div className="col-form-6">
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
                <div className="col-form-6">
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
              </div>
            </div>
          </div>
          <div className='block__footer'>
            <Button text="Cancelar" size="large" onClick={ ()=> closeModalPage( true ) }/>
            <Button mode="primary" text={ user ? 'Actualizar Usuario' : 'Crear Usuario' } size="large" submit />
          </div>
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}