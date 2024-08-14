'use client'

import { ImageUpload, TextField } from '@/components'
import { Category, Product, ProductFormValues } from '@/interfaces'

interface Props {
  product?: Product
  categories: Category[]
  disabled: boolean
  errors: any
  touched: any
  values: ProductFormValues
  newImage: string | null;
  setNewImage: React.Dispatch<React.SetStateAction<string | null>>
  deleteImage: boolean
  setDeleteImage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductFormInformation = ({ product, disabled, categories, errors, touched, values, newImage, setNewImage, deleteImage, setDeleteImage }: Props ) => {

  const categoryOptions = [
    { value: '', label: 'Selecciona una Categoría' },
    ...categories.map(category => ({
        value: category.id,
        label: category.name
    }))
  ]

  return (
    <div className="grid grid-cols-7 gap-6">
      <div className="col-span-2">
        <ImageUpload
          newImage={ newImage }
          deleteImage={ deleteImage }
          setNewImage={ setNewImage }
          setDeleteImage={ setDeleteImage }
          image={ product?.image || '' }
          altImage={ product?.name || '' }
          disabled={ disabled }
        />
      </div>
      <div className="col-span-5">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-span-4">
            <TextField
              label="Nombre"
              name="name"
              type='text'
              placeholder="Ingresa el Nombre"
              errors={ errors.name }
              touched={ touched.name }
              value={ values.name }
              disabled={ disabled }
            />
          </div>
          <div className="col-span-4">
            <TextField
              options={ categoryOptions } 
              asSelect
              label="Categoría"
              name="categoryId"
              errors={ errors.categoryId }
              touched={ touched.categoryId }
              disabled={ disabled }
            />
          </div>
          <div className="col-span-8">
            <TextField
              typeField="textarea"
              label="Descripción"
              name="description"
              placeholder="Ingresa la Descripción"
              errors={ errors.description }
              touched={ touched.description }
              value={ values.description }
              disabled={ disabled }
            />
          </div>
          <div className="col-span-3">
            <TextField
              label="Precio"
              name="price"
              type='number'
              placeholder="Ingresa el Precio"
              errors={ errors.price }
              touched={ touched.price }
              value={ values.price }
              disabled={ disabled }
            />
          </div>
        </div>
      </div>
    </div>
  )
}