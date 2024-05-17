'use client'
import Image from 'next/image'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, Spinner, Switch, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Product } from '@/interfaces'
import { addProduct, editProduct } from '@/actions/add-product'
import { useAdminStore } from '@/store/admin-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils'
import { ProductSchema } from '@/schema'

interface FormValues {
  name: string,
  description: Text | string,
  price: number | null,
  image: string | null,
  spicyLevel: boolean | null,
  categoryId: number | null
}

type Props = {
  product?: Product | undefined
}

type Category = {
  id: number,
  name: string
}

export const ProductsForm = ({ product }: Props) => {
  
  const [ imgUploading, setImgUpload ] = useState<boolean>( false )
  const router = useRouter()
  const [ categories, setCategories] = useState<Category[]>([]);
  const [ spicyLevel, setSpicyLevel ] = useState<boolean>( product?.spicyLevel || false )
  const [ newImage, setNewImage] = useState( null )

  const { setOpenModal } = useAdminStore()

  const handleCloseModal = () => {
    setOpenModal( false )
    setTimeout(() => {
      router.back()
    }, 500)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchData({ url: `/categories` })
        setCategories( categories )
      } catch (error) {
          console.error('Error fetching Categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const categoryOptions = [
    { value: '', label: 'Selecciona una Categoría' },
    ...categories.map(category => ({
        value: +category.id,
        label: category.name
    }))
  ]

  const initialValues: FormValues = {
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : null,
    image: product ? product.image : null,
    spicyLevel: product ? product.spicyLevel : false,
    categoryId: product ? product.categoryId : null
  }

  const handleImageChange = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        setImgUpload(true)
        console.log("GAAAA imagen boolean: ", imgUploading)
        const formData = new FormData()
        formData.append('image', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        if (!response.ok) {
          throw new Error('Error uploading image')
        }
        const data = await response.json()
        setNewImage(data.url)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setImgUpload(false)
      console.log("Image uploading set to false")
    }
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const productValues = {
      ...values,
      spicyLevel,
      categoryId: Number( values.categoryId ),
      image: newImage || product?.image || null
    }
    { product
      ? await editProduct( product.id, productValues )
      : await addProduct( productValues )
    }
    actions.setSubmitting( false )
    handleCloseModal()
    toast.success('¡Producto Actualizado!')
  }
  
  return (
    <>
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ ProductSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <div className={ `isSubmitting ${ isSubmitting && "active" }`  }><Spinner/></div>
        <Form className="form">
          <div className='form__column'>
            <h3 className="form__title">Información</h3>
            <div className="form__item">
              <TextField
                label='Nombre'
                type='text'
                name='name'
                placeholder='Ingresa el Nombre del Producto'
                errors={ errors.name }
                touched={ touched.name }
                value={ values.name }
              />
            </div>
            <div className="form__item">
              <TextField
                options={ categoryOptions }
                asSelect
                label="Categoría"
                name="categoryId"
                errors={ errors.categoryId }
                touched={ touched.categoryId }
              />
            </div>
            <div className="form__item">
              <TextField
                typeField="textarea"
                label='Descripción'
                name='description'
                placeholder='Ingresa la Descripción del Producto'
                errors={ errors.description }
                touched={ touched.description }
                value={ values.description }
              />
            </div>
            <div className="form__item">
              <TextField
                label='Precio de Producto'
                type='number'
                name='price'
                placeholder='Ingresa el Precio de Producto'
                errors={ errors.price }
                touched={ touched.price }
                value={ values.price }
              />
            </div>
            <div className="form__item">
              <Switch
                checked={ spicyLevel }
                onChange={ setSpicyLevel }
                size="large"
                label='Lleva Nivel de Picante?'
              />
            </div>
          </div>
          <div className='form__column'>
            <h3 className="form__title">Imagen</h3>
            <div className="form__item">
              <div className='form__image'>
                <div className='form__current-image'>
                  <span className='caption primary ghost'>Imagen Actual</span>
                  <Image src={ product?.image || '/images/logo.svg' } width={ 200 } height={ 200 } alt={ product?.name || "" } />
                </div>
                <div className='form__new-image'>
                  { newImage ? (
                    <>
                    <div className={ `uploading ${ imgUploading ? "active": "" }` }>
                      <Spinner/>
                    </div>
                    <span className='caption success ghost'>Nueva Imagen</span>                        
                    <Image src={ newImage || '/images/logo.svg' } width={ 200 } height={ 200 } alt="Nueva Imagen" />
                    </>                    
                  ): (<i className="fi fi-tr-image-slash"></i>) }
                </div>
              </div>
              <ImageUpload onChange={ handleImageChange } />
            </div>   
          </div>           
          <Button mode='primary' text={ product ? 'Guardar Producto' : 'Crear Producto' } size='large' full submit />
        </Form>
        </>
      )}
    </Formik>
  </>
  )
}