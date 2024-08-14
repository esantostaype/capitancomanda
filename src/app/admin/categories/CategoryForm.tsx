'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, ModalBody, ModalFooter, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Category, Color, Variant } from '@/interfaces'
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
}

export const CategoryForm = ({ category, token }: Props) => {
  
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
                  image={ category?.image || '' }
                  altImage={ category?.name || '' }
                />
              </div>
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
          </ModalBody>
          <ModalFooter>
            <Button text="Cancelar" variant={ Variant.CONTAINED } onClick={ ()=> closeModal( true ) }/>            
            <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ category ? 'Guardar Categoría' : 'Crear Categoría' } submit />
          </ModalFooter>
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}