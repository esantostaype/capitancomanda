'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, Modal, ModalBody, ModalFooter, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Category, Color, Size, Variant } from '@/interfaces'
import { addCategory, editCategory } from '@/actions/category-actions'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { CategorySchema } from '@/schema'
import { usePathname, useParams } from 'next/navigation'
import { fetchData } from '@/utils'
import { useGlobalStore } from '@/store/global-store'
import { CategoryFormSkeleton } from './'

interface FormValues {
  name: string
}

type Props = {
  token?: string
}

export const CategoryForm = ({ token }: Props) => {

  const pathName = usePathname()
  const { id } = useParams()
  
  const [ category, setCategory ] = useState<Category | null>(null)
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const { activeModal, closeModal } = useUiStore()
  const { toggleUpdateTrigger } = useGlobalStore()
  
  const isEditMode = pathName.startsWith('/admin/categories/edit')
  const isCreateMode = pathName === '/admin/categories/create'
  
  useEffect(() => {
    const fetchCategory = async () => {
      if ( id ) {
        try {
          const data: Category = await fetchData({ url: `/categories/${ id }`, token })
          setCategory( data )
        } catch ( error ) {
          toast.error('Error al obtener la categoría')
        }
      }
    }
    fetchCategory()
  }, [ id, token ])

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
    toggleUpdateTrigger()
    closeModal( true )
    toast.success( category ? 'Categoría Actualizada!' : 'Categoría Creada!')
  }


  useEffect(() => {
    if ( !activeModal ) {
      setCategory( null )
      setNewImage( null )
    }
  }, [ activeModal ])
  
  return (
    <Modal
      size={ Size.XL }
      isOpen={ isEditMode || isCreateMode }
      title={ !category && isEditMode ? "" : category?.name || "Crear Categoría" }
      withBackRoute
      isEditMode={ isEditMode }
    >
      {
        !category && isEditMode
        ?<CategoryFormSkeleton/>
        :<Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ CategorySchema }>
          {({ errors, touched, values, isSubmitting }) => (
            <>
            <Spinner isActive={ isSubmitting } />
            <Form className="flex flex-col flex-1 overflow-y-auto">
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
      }
  </Modal>
  )
}