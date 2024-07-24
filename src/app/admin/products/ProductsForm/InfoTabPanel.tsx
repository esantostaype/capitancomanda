import { TextField, ImageUpload } from '@/components'
import { Category, Product } from '@/interfaces'

type InfoTabPanelProps = {
  values: any
  errors: any
  touched: any
  product: Product | undefined
  newImage: string | null
  deleteImage: boolean
  setNewImage: React.Dispatch<React.SetStateAction<string | null>>
  setDeleteImage: React.Dispatch<React.SetStateAction<boolean>>
  categories: Category[]
  branchId: string | undefined
}

export const InfoTabPanel = ({
  values,
  errors,
  touched,
  product,
  newImage,
  deleteImage,
  setNewImage,
  setDeleteImage,
  categories,
  branchId
}: InfoTabPanelProps) => {
  const categoryOptions = [
    { value: '', label: 'Selecciona una Categoría' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ]

  return (
    <div className="block__body__content isPage">
      <div className="row-form">
        <div className="col-form-3">
          <ImageUpload
            newImage={newImage}
            deleteImage={deleteImage}
            setNewImage={setNewImage}
            setDeleteImage={setDeleteImage}
            image={product?.image || ''}
            altImage={product?.name || ''}
            disabled={product?.user.branchId !== branchId}
          />
        </div>
        <div className="col-form-9">
          <div className="form__item">
            <TextField
              label="Nombre"
              type="text"
              name="name"
              placeholder="Ingresa el Nombre"
              errors={errors.name}
              touched={touched.name}
              value={values.name}
              disabled={product?.user.branchId !== branchId}
            />
          </div>
          <div className="form__item">
            <TextField
              options={categoryOptions}
              asSelect
              label="Categoría"
              name="categoryId"
              errors={errors.categoryId}
              touched={touched.categoryId}
              disabled={product?.user.branchId !== branchId}
            />
          </div>
          <div className="form__item fi12">
            <TextField
              typeField="textarea"
              label="Descripción"
              name="description"
              placeholder="Ingresa la Descripción"
              errors={errors.description}
              touched={touched.description}
              value={values.description}
              disabled={product?.user.branchId !== branchId}
            />
          </div>
          <div className="form__item fi4">
            <TextField
              label="Precio"
              type="number"
              name="price"
              placeholder="Ingresa el Precio"
              errors={errors.price}
              touched={touched.price}
              value={values.price}
              disabled={product?.user.branchId !== branchId}
              price
            />
          </div>
        </div>
      </div>
    </div>
  )
}
