'use client'
import Image from 'next/image'
import { useOrderStore } from '@/store/order-store'
import { Color, Variant, OrderItemFull, Size } from '@/interfaces'
import { Button, Counter, Modal, ModalBody, ModalFooter, ModalHeader, SimpleSpinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { fetchData, formatCurrency, generateUniqueId, getVariantPrice } from '@/utils'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { OrderProductDetailVariantSelector } from './OrderProductDetailVariantSelector'
import { Formik, Form } from 'formik'

type Props = {
  token: string
  product: OrderItemFull
  hasVariations?: boolean
  hasAdditionals?: boolean
}

export const OrderProductDetail = ({ token, product, hasVariations, hasAdditionals }: Props) => {


  const searchParams = useSearchParams()
  const productDetail = searchParams.get('p')

  const addToOrder = useOrderStore(( state ) => state.addToOrder )
  const { activeModalId, openModalById, closeModal } = useUiStore()

  const [ quantity, setQuantity ] = useState<number>(1)
  const [ productFull, setProductFull ] = useState<OrderItemFull | null>(null)

  const isOpen = product.id === activeModalId

  useEffect(() => {
    const fetchProduct = async () => {
      if ( productDetail ) {
        try {
          const data: OrderItemFull = await fetchData({ url: `/products/${ productDetail }`, token })
          setProductFull( data )
        } catch ( error ) {
          toast.error('Error al obtener el producto')
        }
      }
    }
    fetchProduct()
  }, [ productDetail, token ])

  interface FormValues {
    selectedVariantWithPrice: { [key: string]: string }
    selectedVariants: { [key: string]: string }
    selectedAdditionals: { [key: string]: number }
    notes: string
  }
  
  const initialValues: FormValues = {
    selectedVariantWithPrice: {},
    selectedVariants: {},
    selectedAdditionals: {},
    notes: ''
  }

  useEffect(() => {
    if (!isOpen) {
      setProductFull(null)
      setQuantity(1)
    }
  }, [ isOpen, activeModalId, product ])

  useEffect(() => {
    if ( product.id === productDetail ) {
      openModalById( product.id )
    }
  }, [ productDetail, openModalById, product.id ])

  const handleAddToOrder = ( values : FormValues ) => {

    if( hasVariations || hasAdditionals ){    
      const allVariations = { ...values.selectedVariantWithPrice, ...values.selectedVariants }
      const additionalPrice = Object.entries( values.selectedAdditionals )
        .reduce(( total, [ additionalName, additionalQuantity ] ) => {
          const additional = product?.additionals.find( add => add.name === additionalName )
          return total + ( additional ? additional.price * ( additionalQuantity as number ) : 0 )
        }, 0)

      const price = getVariantPrice( productFull!, values.selectedVariantWithPrice ) + additionalPrice
      const uniqueId = generateUniqueId( product!.id, allVariations, values.selectedAdditionals, values.notes )

      addToOrder({
        ...productFull!,
        price,
        variationPrice: price,
        selectedVariations: allVariations,
        selectedAdditionals: values.selectedAdditionals,
        notes: values.notes,
        uniqueId
      }, quantity )
    } else {
      const uniqueId = `${ product.id }_${ values.notes }`
      addToOrder({
        ...product,
        price: product.price,
        notes: values.notes,
        uniqueId
      }, quantity )
    }   

    closeModal()
    toast.success(`¡${ name } Agregad@!`)
    setTimeout(() => {
      setQuantity(1)
      window.history.back()
    }, 300)
  }

  const areAllVariantsSelected = ( values : any ) => {
    return product?.variations.every( variation => 
      variation.hasPrice 
        ? values.selectedVariantWithPrice[ variation.name ] 
        : values.selectedVariants[ variation.name ]
    )
  }

  return (
    <Modal withBackRoute isOpen={ isOpen } size={ Size._5XL }>
      <ModalHeader>
        <>
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-semibold">{ product.name }</h1>
          <div className="flex items-center gap-1">
            { hasVariations && <span className="text-gray500">Desde:</span> }
            <span className="text-xl font-bold text-accent opacity-60">{ formatCurrency( product.price ) }</span>
          </div>
        </div>
        {
          product.description &&
          <div className="text-gray500 mt-1">{ product.description }</div>
        }
        </>
      </ModalHeader>
        <Formik
          initialValues={ initialValues }
          onSubmit={ handleAddToOrder }
        >
          {({ values, setFieldValue }) => (
            <Form className="overflow-y-auto">
              <ModalBody>
                <div className={`grid grid-cols-6 gap-8 relative ${ !productFull && ( hasVariations || hasAdditionals ) ? "" : "items-start" } `}>
                  <div className='col-span-2 sticky top-10'>
                    <div className="relative z-20 bg-gray50 flex items-center justify-center rounded-lg w-full aspect-square overflow-hidden">
                    { product.image ? (
                      <Image src={ product.image } alt={ product.name } width={ 512 } height={ 512 } className="object-cover aspect-square" />
                    ) : (
                      <i className="fi fi-tr-image-slash text-3xl text-gray500"></i>
                    )}
                    </div>
                  </div>
                  { !productFull && ( hasVariations || hasAdditionals )
                    ? <div className='col-span-4 flex items-center justify-center'><SimpleSpinner/></div>
                    : <div className='col-span-4 flex flex-col gap-8'>
                      { productFull && 
                        <>
                        <OrderProductDetailVariantSelector
                          variations={ productFull?.variations.filter( variation => variation.hasPrice )}
                          selectedVariants={ values.selectedVariantWithPrice }
                          handleVariantChange={( variationName, option ) => {
                            setFieldValue(`selectedVariantWithPrice.${variationName}`, option)
                          }}
                        />
                        <OrderProductDetailVariantSelector
                          variations={ productFull?.variations.filter( variation => !variation.hasPrice )}
                          selectedVariants={ values.selectedVariants }
                          handleVariantChange={( variationName, option ) => {
                            setFieldValue(`selectedVariants.${variationName}`, option)
                          }}
                        />
                        </>
                      }

                      { productFull && 
                        <>
                        {
                          productFull?.additionals.length !== 0 &&
                          <div>
                            <h3 className="text-base font-semibold mb-2">Adicionales:</h3>
                            {
                              productFull?.additionals.map(( additional, index ) => (
                                <div key={ index } className={`${ values.selectedAdditionals[ additional.name ] > 0 ? "border-accent" : "border-transparent" } mb-2 flex items-center bg-gray50 rounded border-2`}>
                                  <div className="flex-1 px-4 py-2">
                                    <div>{ additional.name }</div>
                                    <div className="text-base font-bold">{ formatCurrency( additional.price ) }</div>
                                  </div>
                                  <Counter
                                    value={ values.selectedAdditionals[ additional.name ] || 0 }
                                    onQuantityChange={( count ) => setFieldValue(`selectedAdditionals.${additional.name}`, count)}
                                    acceptZero
                                  />
                                </div>
                              ))
                            }
                          </div>
                        }
                        </>
                      }
                      <div>
                        <h3 className="text-base font-semibold mb-2">Notas:</h3>
                        <TextField
                          name='notes'
                          typeField='textarea'
                          placeholder='Puedes ingresar indicaciones finales para este producto'
                        />
                      </div>
                    </div>
                  }
                </div>
              </ModalBody>
              <ModalFooter>
                <Counter value={ quantity } onQuantityChange={ setQuantity } />
                <Button
                  text="Agregar"
                  size={ Size.LG }
                  color={ Color.ACCENT }
                  variant={ Variant.CONTAINED }
                  disabled={
                    ( hasVariations || hasAdditionals ) && 
                    ( !product || (hasVariations && !areAllVariantsSelected( values )))
                  }
                  submit
                />
              </ModalFooter>
            </Form>
          )}
        </Formik>
    </Modal>
  )
}
