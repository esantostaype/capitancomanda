'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, Spinner, Switch, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Branch } from '@/interfaces'
import { addBranch, editBranch } from '@/actions/branch-actions'
import { useUiStore } from '@/store/ui-store'
import { useState } from 'react'

interface FormValues {
  name: string
}

type Props = {
  branch?: Branch
  token?: string
  withBackRoute?: boolean
}

export const BranchesForm = ({ branch, token, withBackRoute }: Props) => {
  
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)

  const { closeModal } = useUiStore()

  const initialValues: FormValues = {
    name: branch ? branch.name : ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    { branch
      ? await editBranch( branch.id, values, token ? token : '' )
      : await addBranch( values, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModal( true )
    toast.success( branch ? 'Sucursal Actualizada!' : 'Sucursal Creada!')
  }
  
  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <Form className="form">
          <div className="block__body">
            <div className="block__body__content">
              <div className="row-form">
                <div className="col-form-12">
                  <TextField
                    label='Nombre'
                    type='text'
                    name='name'
                    placeholder='Ingresa el Nombre de la Sucursal'
                    errors={ errors.name }
                    touched={ touched.name }
                    value={ values.name }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="block__footer">
            <Button text="Cancelar" size="large" onClick={ ()=> closeModal( true ) }/>            
            <Button mode='primary' text={ branch ? 'Guardar Sucursal' : 'Crear Sucursal' } size='large' submit />
          </div>
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}