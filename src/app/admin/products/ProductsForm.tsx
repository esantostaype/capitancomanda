'use client'
import { Formik, Form, FormikHelpers, FieldArray, Field } from 'formik'
import { Button, Spinner, TextField, ImageUpload, Modal } from '@/components'
import { toast } from 'react-toastify'
import { Product } from '@/interfaces'
import { addProduct, editProduct } from '@/actions/product-actions'
import { useUiStore } from '@/store/ui-store'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ProductSchema } from '@/schema'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

interface FormValues {
  name: string
  description: string
  price: number | null
  image: string | null
  categoryId: string | null
  variants: Array<{
    name: string
    hasPrice: boolean
    options: Array<{ name: string; price?: number | null }>
  }>
  ingredients: Array<{ name: string; quantity: number }>
}

type Category = {
  id: string,
  name: string
}

type Props = {
  product?: Product
  categories: Category[]
  token?: string
}

export const ProductsForm = ({ product, categories, token }: Props) => {

  const router = useRouter()
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const [ tabIndex, setTabIndex ] = useState(0)
  const [ newVariantIndex, setNewVariantIndex ] = useState<number | null>(null)
  const [ newIngredientIndex, setNewIngredientIndex ] = useState<number | null>(null)
  const variantRefs = useRef<Array<HTMLInputElement | null>>([])
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([])

  const { activeModal, openModal, closeModal, closeModalPage } = useUiStore()

  const removeEmptyOptions = (formValues: FormValues): FormValues => {
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

  const categoryOptions = [
    { value: '', label: 'Selecciona una Categoría' },
    ...categories.map(category => ({
        value: category.id,
        label: category.name
    }))
  ]

  const initialValues: FormValues = {
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : null,
    image: product ? product.image : null,
    categoryId: product ? product.categoryId : '',
    variants: product?.variants?.map((variant: any) => ({
      name: variant.name,
      hasPrice: variant.hasPrice,
      options: variant.options.map((option: any) => ({
        name: option.name,
        price: option.price
      })),
    })) || [],
    ingredients: product?.ingredients?.map((ingredient: any) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
    })) || [],
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {    
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
    actions.setSubmitting(false)
    closeModal()
    closeModalPage( true )
    toast.success( product ? '¡Producto Actualizado!' : '¡Producto Creado!')
  }

  const [ listRef ] = useAutoAnimate()

  useEffect(() => {
    if (newVariantIndex !== null && variantRefs.current[newVariantIndex]) {
      variantRefs.current[newVariantIndex]?.scrollIntoView({ behavior: 'smooth' })
      variantRefs.current[newVariantIndex]?.focus()
      setNewVariantIndex(null)
    }
  }, [newVariantIndex])

  useEffect(() => {
    if (newIngredientIndex !== null && ingredientRefs.current[newIngredientIndex]) {
      ingredientRefs.current[newIngredientIndex]?.scrollIntoView({ behavior: 'smooth' })
      ingredientRefs.current[newIngredientIndex]?.focus()
      setNewIngredientIndex(null)
    }
  }, [newIngredientIndex])

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ProductSchema}>
        {({ errors, touched, values, isSubmitting }) => (
          <>
          <div className={`isSubmitting ${isSubmitting && 'active'}`}><Spinner /></div>
          <Form className="form">
            <div className="block__body">
              <Tabs selectedIndex={ tabIndex } onSelect={( index ) => setTabIndex( index )}>
                <TabList>
                  <Tab>Información</Tab>
                  <Tab>Variaciones</Tab>
                  <Tab>Ingredientes</Tab>
                </TabList>
                <TabPanel className="block__body__content isPage">
                  <div className="row-form">
                    <div className="col-form-3">
                      <ImageUpload
                        newImage={ newImage }
                        deleteImage={ deleteImage }
                        setNewImage={ setNewImage }
                        setDeleteImage={ setDeleteImage }
                        image={ product?.image || '' }
                        altImage={ product?.name || '' }
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
                          price
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="block__body__content isPage">
                  <FieldArray name="variants">
                    {({ remove, push }) => (
                      <>
                        <div className='form__options__header'>
                          <Button
                            text="Agregar Variación"
                            ghost
                            size='small'
                            iconName='plus-small'
                            onClick={ ()=> openModal() }
                          />
                          {
                            values.variants.length === 0 && (
                              <div className='form__options__null'>
                                <i className="fi fi-rr-empty-set"></i>
                                <span>Este producto no tiene variaciones aun</span>
                              </div>
                            )
                          }
                        </div>
                        {
                          activeModal && (
                            <Modal>
                              <div className="confirm">
                                <h3 className="confirm__title">¿La Variación tendrá Precio?</h3>
                                <p>Si una variación tiene un precio asignado, ese será el nuevo precio del producto.</p>
                                <div className="confirm__buttons">
                                <Button text='Sí' size='small' onClick={() => {
                                    push({ name: '', hasPrice: true, options: [{ name: '', price: null }] });
                                    setNewVariantIndex(values.variants.length);
                                    closeModal();
                                  }} />
                                  <Button text='No' size='small' onClick={() => {
                                    push({ name: '', hasPrice: false, options: [{ name: '' }] });
                                    setNewVariantIndex(values.variants.length);
                                    closeModal();
                                  }} />
                                </div>
                              </div>
                            </Modal>
                          )
                        }
                        {
                          values.variants && (
                            <div className='form__options'>
                              { values.variants.map((variant, index) => (
                                <div key={index} className="form__options__row">
                                  <div className='form__options__content'>
                                    <Button
                                      mode='error'
                                      iconName='trash'
                                      ghost  onClick={() => remove(index)}
                                    />
                                    <div className='form__options__name'>
                                      <TextField
                                        label='Variación'
                                        type="text"
                                        name={`variants.${index}.name`}
                                        placeholder="Ingresa una Variación"
                                        value={variant.name}
                                        innerRef={ el => variantRefs.current[index] = el }
                                      />
                                    </div>
                                    <FieldArray name={`variants.${index}.options`}>
                                      {({ remove: removeOption, push: pushOption }) => (
                                        <ul className='form__options__list' ref={ listRef }>
                                          { variant.options.map((option, optIndex) => (
                                            <li key={optIndex} className="form__options__item">
                                              <div className="form__item">
                                                <TextField
                                                  label="Opción"
                                                  type="text"
                                                  name={`variants.${index}.options.${optIndex}.name`}
                                                  placeholder="Nombre"
                                                  value={option.name}
                                                />
                                              </div>
                                              {
                                                variant.hasPrice && (
                                                  <div className="form__item fi3">
                                                    <TextField
                                                      label="Precio"
                                                      type="number"
                                                      name={`variants.${index}.options.${optIndex}.price`}
                                                      placeholder="Precio"
                                                      value={option.price}
                                                      price
                                                    />
                                                  </div>
                                                )
                                              }
                                              {
                                                optIndex > 0 ? (
                                                <div style={{ width: '40px' }}>
                                                  <Button
                                                    iconName='trash'
                                                    size='small'
                                                    ghost  onClick={() => removeOption(optIndex)}
                                                  />
                                                </div> ) : (
                                                <div style={{ width: '40px' }}>
                                                </div>
                                                )
                                              }
                                            </li>
                                          ))}
                                          <div className='form__options__footer'>
                                            {
                                              variant.hasPrice ? (
                                                <Button
                                                  text="Agregar Opción"
                                                  mode='withoutBg'
                                                  size='small'
                                                  iconName='plus-small' onClick={() => pushOption({ name: '', price: null })}
                                                />
                                              ) : (
                                                <Button
                                                  text="Agregar Opción"
                                                  mode='withoutBg'
                                                  size='small'
                                                  iconName='plus-small' onClick={() => pushOption({ name: '' })}
                                                />
                                              )
                                            }
                                          </div>
                                        </ul>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }
                        
                      </>
                    )}
                  </FieldArray>
                </TabPanel>
                <TabPanel className="block__body__content isPage">
                  <FieldArray name="ingredients">
                    {({ remove, push }) => (
                      <>
                      <div className='form__options__header'>
                        <Button
                          text="Agregar Ingrediente"
                          ghost
                          size='small'
                          iconName='plus-small'
                          onClick={() => {
                            push({ name: '', quantity: null })
                            setNewIngredientIndex(values.ingredients.length)
                          }}
                        />
                        
                        {
                          values.ingredients.length === 0 && (
                            <div className='form__options__null'>
                              <i className="fi fi-rr-empty-set"></i>
                              <span>Este producto no tiene ingredientes aun</span>
                            </div>
                          )
                        }
                      </div>
                      {
                        values.ingredients.length > 0 && (
                          <div className='table__wrapper'>
                            <table>
                              <thead>
                                <tr>
                                  <th style={{ width: '240px' }}>Ingrediente</th>
                                  <th style={{ width: '240px' }}>Cantidad</th>
                                  <th>Unidad</th>
                                  <th style={{ width: '30%' }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                { values.ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                  <td>
                                    <Field
                                      type="text"
                                      name={`ingredients.${index}.name`}
                                      placeholder="Ingresa el Ingrediente"
                                      value={ingredient.name}
                                      innerRef={ (el: HTMLInputElement | null) => ingredientRefs.current[index] = el }
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`ingredients.${index}.quantity`}
                                      placeholder="Ingresa la Cantidad"
                                      value={ingredient.quantity}
                                    />
                                  </td>
                                  <td>
                                    Gr.
                                  </td>
                                  <td>
                                    <div className="table__flex table__actions">
                                      <Button
                                        mode='error'
                                        iconName='trash'
                                        ghost
                                        onClick={() => remove(index)}
                                        size='small'
                                      />
                                    </div>
                                  </td>
                                </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )
                      }                        
                      </>
                    )}
                  </FieldArray>
                </TabPanel>
              </Tabs>
            </div>
            <div className='block__footer'>
              <Button text="Cancelar" size="large" onClick={ ()=> closeModalPage( true ) }/>
              <Button mode="primary" text={ product ? 'Guardar Producto' : 'Crear Producto' } size="large" submit />
            </div>
          </Form>
          </>
        )}
      </Formik>     
    </>
  )
}