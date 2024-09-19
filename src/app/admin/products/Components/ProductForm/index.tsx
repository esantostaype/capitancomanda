'use client'
import { useParams, usePathname } from 'next/navigation'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Spinner, ModalFooter, ModalBody, ModalPage } from '@/components'
import { toast } from 'react-toastify'
import { Color, ProductFormValues, Size, Variant } from '@/interfaces'
import { addProduct, editProduct } from '@/actions/product-actions'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { ProductSchema } from '@/schema'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { ProductFormInformation } from './ProductFormInformation'
import { ProductFormVariations } from './ProductFormVariations'
import { ProductFormIngredients } from './ProductFormIngredients'
import { ProductFormAdditionals } from './ProductFormAdditionals'
import { ProductFormSkeleton } from '../'
import { useProduct, useCategories } from '@/hooks'

interface Props {
  refetchProducts: () => void
  token?: string
}

export const ProductForm = ({ token, refetchProducts }: Props ) => {

  const pathName = usePathname()
  const { id } = useParams()
  const productId = Array.isArray( id ) ? id[0] : id
  
  const { isLoading, data: product, refetch: refetchProduct } = useProduct({ productId, token })
  const { data: categories } = useCategories({ token })

  const [ newImage, setNewImage ] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const [ tabIndex, setTabIndex ] = useState(0)
  const { activeModalPage, closeModal, closeModalPage } = useUiStore()

  const isEditMode = pathName.startsWith('/admin/products/edit')
  const isCreateMode = pathName === '/admin/products/create'

  const removeEmptyOptions = ( formValues: ProductFormValues ): ProductFormValues => {
    const newVariations = formValues.variations
      .map(variation => ({
        ...variation,
        options: variation.options.filter(option => option.name || option.price)
      }))
      .filter(variation => variation.name || variation.options.length > 0)
    const newAdditionals = formValues.additionals.filter( additional => additional.name || additional.price )
    const newIngredients = formValues.ingredients.filter( ingredient => ingredient.name || ingredient.quantity || ingredient.unit )
    return {
      ...formValues,
      variations: newVariations,
      additionals: newAdditionals,
      ingredients: newIngredients
    }
  }

  const initialValues: ProductFormValues = {
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : null,
    image: product ? product.image : null,
    categoryId: product ? product.categoryId : '',
    variations: product?.variations ?? [],
    additionals: product?.additionals ?? [],
    ingredients: product?.ingredients ?? [],
  }

  const handleSubmit = async ( values: ProductFormValues, actions: FormikHelpers<ProductFormValues> ) => {    
    const updatedFormValues = removeEmptyOptions( values );
    const productValues = {
      ...updatedFormValues,
      categoryId: values.categoryId,
      image: deleteImage ? null : ( newImage || product?.image || null ),
    }
    { isEditMode && product
      ? await editProduct( product.id, productValues, token ? token : '' )
      : await addProduct( productValues, token ? token : '' )
    }
    actions.setSubmitting( false )
    closeModal()
    closeModalPage( true )
    toast.success( product ? '¡Producto Actualizado!' : '¡Producto Creado!')
    refetchProducts()
    refetchProduct()
  }

  useEffect(() => {
    if ( !activeModalPage ) {
      setTabIndex( 0 )
      setNewImage( null )
    }
  }, [ activeModalPage ])

  return (
    <ModalPage
      withTabs
      isOpen={ isEditMode || isCreateMode }
      title={ !product && isEditMode ? "" : product?.name || "Crear Producto" }
      backText='Regresar a la lista de Productos'
      withBackRoute
      isEditMode={ isEditMode }
    >
      {
        isLoading && isEditMode
        ?<ProductFormSkeleton/>
        :<Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ ProductSchema }>
          {({ errors, touched, values, isSubmitting }) => (
            <Form className="flex flex-col flex-1 overflow-y-auto -mt-10 pb-10">
              <Spinner isActive={ isSubmitting } />
              <ModalBody withTabs>
                <Tabs selectedIndex={ tabIndex } onSelect={( index ) => setTabIndex( index )} className="flex flex-col flex-1">
                  <TabList className={`border-b border-b-gray50 bg-surface sticky top-0 mb-10 z-[999] flex gap-6 h-10 text-base font-500 leading-none text-gray500`}>
                    <Tab>Información</Tab>
                    <Tab>Variaciones</Tab>
                    <Tab>Adicionales</Tab>
                    <Tab>Ingredientes</Tab>
                  </TabList>
                  <TabPanel>
                    <ProductFormInformation
                      categories={ categories || [] }
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
                    <ProductFormVariations
                      variations={ values.variations }
                    />
                  </TabPanel>
                  <TabPanel>
                    <ProductFormAdditionals
                      additionals={ values.additionals }
                    />
                  </TabPanel>
                  <TabPanel>
                    <ProductFormIngredients
                      ingredients={ values.ingredients }
                    />
                  </TabPanel>
                </Tabs>
              </ModalBody>
              <ModalFooter withTabs>
                <Button text="Cancelar" variant={ Variant.CONTAINED } size={ Size.LG } onClick={ ()=> closeModalPage( true ) }/>
                <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ product ? 'Guardar Producto' : 'Crear Producto' } size={ Size.LG } submit />
              </ModalFooter>
            </Form>
          )}   
        </Formik>
      }
    </ModalPage>
  )
}