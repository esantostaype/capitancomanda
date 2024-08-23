'use client'
import Image from 'next/image'
import { useOrderStore } from '@/store/order-store'
import { Color, Variant, OrderItemFull, Size, Product } from '@/interfaces'
import { Button, Counter, Modal, ModalBody, ModalFooter, ModalHeader, TextField } from '@/components'
import { toast } from 'react-toastify'
import { fetchData, formatCurrency, generateUniqueId, getVariantPrice, orderVariants } from '@/utils'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { OrderProductDetailVariantSelector } from './OrderProductDetailVariantSelector'
import { Formik, Form } from 'formik'

type Props = {
  token: string
}

export const OrderProductDetail = ({ token }: Props) => {


  const searchParams = useSearchParams()
  const productDetail = searchParams.get('p')

  const addToOrder = useOrderStore(( state ) => state.addToOrder )
  const { openModal, activeModal, closeModal } = useUiStore()

  const [ quantity, setQuantity ] = useState<number>(1)
  const [ product, setProduct ] = useState<OrderItemFull | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if ( productDetail ) {
        try {
          const data: OrderItemFull = await fetchData({ url: `/products/${ productDetail }`, token })
          setProduct( data )
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
    if ( !activeModal ) {
      setQuantity(1)
    }
  }, [ activeModal ])

  const handleAddToOrder = ( values : FormValues ) => {
    const allVariants = { ...values.selectedVariantWithPrice, ...values.selectedVariants }

    const additionalPrice = Object.entries( values.selectedAdditionals )
      .reduce(( total, [ additionalName, additionalQuantity ] ) => {
        const additional = product?.additionals.find( add => add.name === additionalName )
        return total + ( additional ? additional.price * ( additionalQuantity as number ) : 0 )
      }, 0)

    const price = getVariantPrice( product!, values.selectedVariantWithPrice ) + additionalPrice
    const uniqueId = generateUniqueId( product!.id, allVariants, values.selectedAdditionals, values.notes )

    addToOrder({
      ...product!,
      price,
      variationPrice: price,
      selectedVariations: allVariants,
      selectedAdditionals: values.selectedAdditionals,
      notes: values.notes
    }, quantity, allVariants, values.selectedAdditionals, values.notes, uniqueId )

    closeModal()
    toast.success(`¡${product?.name} Agregad@!`)
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

  const activeProductDetail = ( productDetail === product?.id )

  return (
    <Modal withBackRoute isOpen={ activeProductDetail } size={ Size._5XL } >
      { product &&
      <>
      <ModalHeader>
        <>
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-semibold">{ product?.name }</h1>
          {
            !product?.variations.some( variation => variation.hasPrice ) && (
              <span className="text-xl font-bold text-accent opacity-60">{ formatCurrency( product?.price ) }</span>
            )
          }
        </div>
        {
          product?.description &&
          <div className="text-gray500 mt-1">{ product?.description }</div>
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
              <div className="grid grid-cols-6 gap-8 relative items-start">
                <div className='col-span-2 sticky top-8'>
                  <div className="relative z-20 bg-gray50 flex items-center justify-center rounded-lg w-full aspect-square overflow-hidden">
                  { product?.image ? (
                    <Image src={ product?.image } alt={ product?.name } width={ 512 } height={ 512 } className="object-cover aspect-square" />
                  ) : (
                    <i className="fi fi-tr-image-slash text-3xl text-gray500"></i>
                  )}
                  </div>
                </div>
                <div className='col-span-4 flex flex-col gap-8'>
                  <OrderProductDetailVariantSelector
                    variations={ product?.variations.filter( variation => variation.hasPrice )}
                    selectedVariants={ values.selectedVariantWithPrice }
                    handleVariantChange={( variationName, option ) => {
                      setFieldValue(`selectedVariantWithPrice.${variationName}`, option)
                    }}
                  />
                  <OrderProductDetailVariantSelector
                    variations={ product?.variations.filter( variation => !variation.hasPrice )}
                    selectedVariants={ values.selectedVariants }
                    handleVariantChange={( variationName, option ) => {
                      setFieldValue(`selectedVariants.${variationName}`, option)
                    }}
                  />
                  
                  {
                    product?.additionals.length !== 0  &&
                    <div>
                      <h3 className="text-base font-semibold mb-2">Adicionales:</h3>
                      {
                        product?.additionals.map(( additional, index ) => (
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
                  <div>
                    <h3 className="text-base font-semibold mb-2">Notas:</h3>
                    <TextField
                      name='notes'
                      typeField='textarea'
                      placeholder='Puedes ingresar indicaciones finales para este producto'
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Counter value={ quantity } onQuantityChange={ setQuantity } />
              <Button
                text="Agregar"
                size={ Size.LG }
                color={ Color.ACCENT }
                variant={ Variant.CONTAINED }
                disabled={ !areAllVariantsSelected( values ) }
                submit
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
      </>
      }
    </Modal>
  )
}
