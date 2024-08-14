'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Spinner, ModalFooter, ModalPage, ModalBody } from '@/components'
import { toast } from 'react-toastify'
import { Category, Color, Product, ProductFormValues, Size, Variant } from '@/interfaces'
import { addProduct, editProduct } from '@/actions/product-actions'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { ProductSchema } from '@/schema'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { ProductFormInformation } from './ProductFormInformation'
import { ProductFormVariants } from './ProductFormVariants'
import { ProductFormIngredients } from './ProductFormIngredients'

type ProductsFormProps = {
  product?: Product
  categories: Category[]
  token?: string
  branchId?: string
  isJustPage?: boolean
}

export const ProductForm = ({ product, categories, token, branchId, isJustPage }: ProductsFormProps ) => {

  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const [ tabIndex, setTabIndex ] = useState(0)

  const { closeModal, closeModalPage } = useUiStore()  

  const removeEmptyOptions = ( formValues: ProductFormValues ): ProductFormValues => {
    const newVariants = formValues.variants
      .map(variant => ({
        ...variant,
        options: variant.options.filter(option => option.name || option.price)
      }))
      .filter(variant => variant.name || variant.options.length > 0)
    const newIngredients = formValues.ingredients.filter(ingredient => ingredient.name || ingredient.quantity)
    return {
      ...formValues,
      variants: newVariants,
      ingredients: newIngredients
    }
  }

  const initialValues: ProductFormValues = {
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : null,
    image: product ? product.image : null,
    categoryId: product ? product.categoryId : '',
    variants: product?.variants ?? [],
    ingredients: product?.ingredients ?? [],
  }

  const handleSubmit = async ( values: ProductFormValues, actions: FormikHelpers<ProductFormValues> ) => {    
    const updatedFormValues = removeEmptyOptions( values );
    const productValues = {
      ...updatedFormValues,
      categoryId: values.categoryId,
      image: deleteImage ? null : ( newImage || product?.image || null ),
    }
    { product
      ? await editProduct( product.id, productValues, token ? token : '' )
      : await addProduct( productValues, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModal()
    closeModalPage( true )
    toast.success( product ? '¡Producto Actualizado!' : '¡Producto Creado!')
  }

  const isAuthor = product?.user.branchId === branchId

  return (
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ ProductSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <Form className={`flex flex-col flex-1 overflow-y-auto ${ isJustPage ? "" : "-mt-8 pb-8" } `}>
          <Spinner isActive={ isSubmitting } />
          <ModalBody withTabs isJustPage={ isJustPage }>
            <Tabs selectedIndex={ tabIndex } onSelect={( index ) => setTabIndex( index )} className="flex flex-col flex-1">
              <TabList className={`border-b border-b-gray50 ${ isJustPage ? "" : "bg-surface sticky top-0" } mb-8 z-[999] flex gap-6 h-8 text-base font-500 leading-4 text-gray500`}>
                <Tab>Información</Tab>
                <Tab>Variaciones</Tab>
                <Tab>Ingredientes</Tab>
              </TabList>
              <TabPanel>
                <ProductFormInformation
                  product={ product }
                  categories={ categories }
                  disabled={ !isAuthor }
                  values={ values }
                  errors={ errors }
                  touched={ touched }
                  newImage={ newImage }
                  setNewImage={ setNewImage }
                  deleteImage={ deleteImage }
                  setDeleteImage={ setDeleteImage }
                />
              </TabPanel>
              <TabPanel>
                <ProductFormVariants
                  values={ values }
                  isAuthor={ isAuthor }
                />
              </TabPanel>
              <TabPanel>
                <ProductFormIngredients
                  values={ values }
                  isAuthor={ isAuthor }
                />
              </TabPanel>
            </Tabs>
          </ModalBody>
          <ModalFooter isJustPage={ isJustPage }>
            <Button text="Cancelar" variant={ Variant.CONTAINED } size={ Size.LARGE } onClick={ ()=> closeModalPage( true ) }/>
            {
              isAuthor &&
              <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ product ? 'Guardar Producto' : 'Crear Producto' } size={ Size.LARGE } submit />
            }
          </ModalFooter>
        </Form>
      )}   
    </Formik>  
  )
}