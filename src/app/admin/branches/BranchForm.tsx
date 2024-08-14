'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, ModalBody, ModalFooter, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Branch, Color, Size, Variant } from '@/interfaces'
import { addBranch, editBranch } from '@/actions/branch-actions'
import { useUiStore } from '@/store/ui-store'
import { useState } from 'react'
import { BranchSchema } from '@/schema'

interface FormValues {
  name: string
  phoneNumber: string | undefined
  address: string | undefined
}

type Props = {
  branch?: Branch
  token?: string
}

export const BranchForm = ({ branch, token }: Props) => {
  
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)

  const { closeModal } = useUiStore()

  const initialValues: FormValues = {
    name: branch ? branch.name : '',
    phoneNumber: branch ? branch.phoneNumber : '',
    address: branch ? branch.address : ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const branchValues = {
      ...values,
      image: deleteImage ? null : ( newImage || branch?.image || null ),
    }
    { branch
      ? await editBranch( branch.id, branchValues, token ? token : '' )
      : await addBranch( branchValues, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModal( true )
    toast.success( branch ? 'Sucursal Actualizada!' : 'Sucursal Creada!')
  }
  
  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ BranchSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <Spinner isActive={ isSubmitting } />
        <Form>
          <ModalBody>
            <div className="flex flex-col gap-8">
              <div className="max-w-40">
                <ImageUpload
                  newImage={ newImage }
                  deleteImage={ deleteImage }
                  setNewImage={ setNewImage }
                  setDeleteImage={ setDeleteImage }
                  image={ branch?.image || '' }
                  altImage={ branch?.name || '' }
                />
              </div>
              <TextField
                label='Nombre'
                type='text'
                name='name'
                placeholder='Ingresa el Nombre de la Sucursal'
                errors={ errors.name }
                touched={ touched.name }
                value={ values.name }
              />
              <TextField
                label='Teléfono'
                type='text'
                name='phoneNumber'
                placeholder='Ingresa el Teléfono de la Sucursal'
                errors={ errors.phoneNumber }
                touched={ touched.phoneNumber }
                value={ values.phoneNumber }
              />
              <TextField
                label='Dirección'
                type='text'
                name='address'
                placeholder='Ingresa la Dirección de la Sucursal'
                errors={ errors.address }
                touched={ touched.address }
                value={ values.address }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={ Variant.CONTAINED } text="Cancelar" size={ Size.LARGE } onClick={ ()=> closeModal( true ) }/>            
            <Button variant={ Variant.CONTAINED } color={ Color.ACCENT } text={ branch ? 'Guardar Sucursal' : 'Crear Sucursal' } size={ Size.LARGE } submit />
          </ModalFooter>
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}