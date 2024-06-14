'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, Spinner, Switch, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Category } from '@/interfaces'
import { addCategory, editCategory } from '@/actions/category-actions'
import { useUiStore } from '@/store/ui-store'
import { useState } from 'react'
import { CategorySchema } from '@/schema'

interface FormValues {
  name: string
}

type Props = {
  category?: Category
  token?: string
  withBackRoute?: boolean
}

export const CategoriesForm = ({ category, token, withBackRoute }: Props) => {
  
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)

  const { closeModal } = useUiStore()

  const initialValues: FormValues = {
    name: category ? category.name : ''
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const categoryValues = {
      ...values,
      image: deleteImage ? null : ( newImage || category?.image || null ),
    }
    { category
      ? await editCategory( category.id, categoryValues, token ? token : '' )
      : await addCategory( categoryValues, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModal( true )
    toast.success( category ? 'Categoría Actualizada!' : 'Categoría Creada!')
  }
  
  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ CategorySchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <Form className="form">
          <div className="block__body">
            <div className="block__body__content">
              <div className="row-form">
                <div className="col-form-5">
                  <ImageUpload
                    newImage={ newImage }
                    deleteImage={ deleteImage }
                    setNewImage={ setNewImage }
                    setDeleteImage={ setDeleteImage }
                    image={ category?.image || '' }
                    altImage={ category?.name || '' }
                  />
                </div>
                <div className="col-form-12">
                  <TextField
                    label='Nombre'
                    type='text'
                    name='name'
                    placeholder='Ingresa el Nombre de la Categoría'
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
            <Button mode='primary' text={ category ? 'Guardar Categoría' : 'Crear Categoría' } size='large' submit />
          </div>
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}