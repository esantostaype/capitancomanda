'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ModalBody, ModalFooter, ModalPage, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { User, Role, roleTranslations, Branch, Color, UserStatus, userStatusTranslations, Variant, Size } from '@/interfaces'
import { addUser, editUser } from '@/actions/user-actions'
import { useUiStore } from '@/store/ui-store'
import { getValidationSchema } from '@/schema'
import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils'
import { UserFormSkeleton } from './UserFormSkeleton'

interface FormValues {
  email: string,
  fullName: string,
  role: Role | '',
  branchId: string
  status: UserStatus | ''
  password: string,
  confirmPassword: string
}

type Props = {
  branches?: Branch[]
  token?: string
  isJustPage?: boolean
}

export const UserForm = ({ token, branches, isJustPage }: Props) => {

  const pathName = usePathname()
  const { id } = useParams()

  const [ user, setUser ] = useState<User | null>(null)

  const { closeModalPage, activeModalPage } = useUiStore()
  const { data: session } = useSession()

  const isEditMode = pathName.startsWith('/admin/users/edit')
  const isCreateMode = pathName === '/admin/users/create'

  useEffect(() => {
    const fetchUser = async () => {
      if ( id ) {
        try {
          const fetchedUser = await fetchData<User>({ url: `/users/${ id }`, token })
          setUser( fetchedUser )
        } catch (error) {
          toast.error('Error al obtener la sucursal')
        } finally {
        }
      }
    }
    fetchUser()
  }, [ id, token ])

  const userRole = session?.user.role

  const roleOptions = [
    { value: '', label: 'Selecciona un Rol' },
    ...Object.values(Role).filter(role => typeof role === 'string').map(role => ({
      value: role,
      label: roleTranslations[ role as Role ]
    }))
  ]

  const statusOptions = [
    { value: '', label: 'Selecciona un Estado' },
    ...Object.values(UserStatus).filter(status => typeof status === 'string').map(status => ({
      value: status,
      label: userStatusTranslations[ status as UserStatus ]
    }))
  ]

  const branchOptions = [
    { value: '', label: 'Selecciona una Sucursal' },
    ...( branches ? branches.map( branch => ({
        value: branch.id,
        label: branch.name
    })) : [])
  ]

  const initialValues: FormValues = {
    email: user && user.email ? user.email : '',
    fullName: user && user.fullName ? user.fullName : '',
    role: user ? user.role : '',
    branchId: user ? user.branchId: '',
    status: user ? user.status: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const newUserPayload = {
      email: values.email,
      fullName: values.fullName,
      password: values.password,
      branchId: values.branchId,
      role: values.role
    }
    const userPayload = {
      email: values.email,
      fullName: values.fullName,
      branchId: values.branchId,
      status: values.status,
      role: values.role
    }

    { user
      ? await editUser( user.id, userPayload, token ? token : '' )
      : await addUser( newUserPayload, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModalPage( true )
    toast.success('Usuario Actualizado!')
  }

  useEffect(() => {
    if ( !activeModalPage ) {
      setUser( null )
    }
  }, [ activeModalPage ])

  const isOwner = userRole === Role.OWNER
  
  return (
    <ModalPage
      isOpen={ isEditMode || isCreateMode }
      title={ !user && isEditMode ? "" : user?.fullName || "Crear Usuario" }
      backText='Regresar a la lista de Usuarios'
      withBackRoute
      isEditMode={ isEditMode }
    >
      {
        !user && isEditMode
        ? <UserFormSkeleton/>
        : <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ getValidationSchema( user, isOwner ) }>
        {({ errors, touched, values, isSubmitting }) => (
          <>
          <Form className="flex flex-col flex-1">
            <Spinner isActive={ isSubmitting } />
            <ModalBody>
              <div className="grid grid-cols-2 gap-6">
                <div className='col-span-1'>
                  <TextField
                    label='Nombre Completo'
                    type='fullName'
                    name='fullName'
                    placeholder='Ingresa el Nombre Completo del usuario'
                    errors={ errors.fullName }
                    touched={ touched.fullName }
                    value={ values.fullName }
                  />
                </div>
                <div className='col-span-1'>
                <TextField
                  label='Email'
                  type='email'
                  name='email'
                  placeholder='Ingresa el Email del usuario'
                  errors={ errors.email }
                  touched={ touched.email }
                  value={ values.email }
                />
                </div>
                <TextField
                  options={ roleOptions }
                  asSelect
                  label="Rol"
                  name="role"
                  errors={ errors.role }
                  touched={ touched.role }
                  value={ values.role }
                />
                {
                  isOwner && (
                    <div className='col-span-1'>
                      <TextField
                        options={ branchOptions }
                        asSelect
                        label="Sucursal"
                        name="branchId"
                        errors={ errors.branchId }
                        touched={ touched.branchId }
                      />
                    </div>
                  )
                }
                {
                  user &&
                  <div className='col-span-1'>
                    <TextField
                      options={ statusOptions }
                      asSelect
                      label="Estado"
                      name="status"
                      errors={ errors.status }
                      touched={ touched.status }
                    />
                  </div>
                }
                {
                  !user &&
                  <>
                  <div className='col-span-1'>
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
                  <div className='col-span-1'>
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
                  </>
                }
              </div>
            </ModalBody>
            <ModalFooter>
              <Button text="Cancelar" variant={ Variant.CONTAINED } size={ Size.LG } onClick={ ()=> closeModalPage( true ) }/>
              <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ user ? 'Actualizar Usuario' : 'Crear Usuario' } size={ Size.LG } submit />
            </ModalFooter>
          </Form>
          </>
        )}
          </Formik>
      }
    
    </ModalPage>
  )
}