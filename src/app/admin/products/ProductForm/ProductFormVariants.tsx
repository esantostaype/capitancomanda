'use client'

import { Button, IconButton, Modal, TextField } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { FieldArray } from 'formik'
import { useUiStore } from '@/store/ui-store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Color, ProductFormValues, Size, Variant } from '@/interfaces'
import { AddSection } from './AddSection'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  isAuthor: boolean
  values: ProductFormValues
}

export const ProductFormVariants = ({ isAuthor, values }: Props ) => {
  
  const [ newVariantIndex, setNewVariantIndex ] = useState<number | null>(null)
  const { activeModal, openModal, closeModal } = useUiStore()
  const variantRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if ( values.variants.length > 0 ) {
      const lastIndex = values.variants.length - 1
      variantRefs.current[ lastIndex ]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if ( newVariantIndex !== null && variantRefs.current[ newVariantIndex ]) {
      variantRefs.current[ newVariantIndex ]?.scrollIntoView({ behavior: 'smooth' })
      variantRefs.current[ newVariantIndex ]?.focus()
      setNewVariantIndex( null )
    }
  }, [ newVariantIndex ])

  const [ listRef ] = useAutoAnimate()

  const hasVariantWithPrice = values.variants.some(variant => variant.hasPrice);

  const handleAddVariant = (push: any, hasPrice: boolean) => {
    push({
      id: uuidv4(),
      name: '',
      hasPrice,
      options: hasPrice ? [{ id: uuidv4(), name: '', price: null }] : [{ id: uuidv4(), name: '' }]
    });
    setNewVariantIndex(values.variants.length);
    closeModal();
  };

  return (
    <FieldArray name="variants">
      {({ remove, push }) => (
        <>
          {
            activeModal && (
              <Modal>
                <div className="confirm">
                  <h3 className="confirm__title">¿La Variación tendrá Precio?</h3>
                  <p>Si una variación tiene un precio asignado, ese será el nuevo precio del producto.</p>
                  <div className="confirm__buttons">
                    <Button
                      text='Sí'
                      variant={ Variant.CONTAINED }
                      onClick={() => handleAddVariant(push, true)}
                    />
                    <Button
                      text='No'
                      variant={ Variant.CONTAINED }
                      onClick={() => handleAddVariant(push, false)}
                    />
                  </div>
                </div>
              </Modal>
            )
          }
          {
            values.variants.length > 0 && (
              <div className="flex flex-col gap-8 mb-8">
                { values.variants.map((variant, index) => (
                  <div key={ index } className="grid grid-cols-12 gap-4 border-b-2 border-b-gray50 pb-6">                            
                    <div className="col-span-1">
                      <IconButton
                        color={ Color.ERROR }
                        iconName='trash'
                        variant={ Variant.GHOST }
                        onClick={() => remove(index)}
                      />
                    </div>
                    <div className='col-span-5'>
                      <TextField
                        label='Variación'
                        name={`variants.${index}.name`}
                        placeholder="Ingresa una Variación"
                        value={variant.name}
                        innerRef={ el => variantRefs.current[index] = el }
                      />
                    </div>
                    <div className="col-span-6">
                      <FieldArray name={`variants.${index}.options`}>
                        {({ remove: removeOption, push: pushOption }) => (
                          <>
                          <ul className="flex flex-col gap-4" ref={ listRef }>
                            { variant.options.map((option, optIndex) => (
                              <li key={optIndex} className="grid grid-cols-8 gap-4">
                                <div className={`${ variant.hasPrice ? "col-span-4" : "col-span-7" } `}>
                                  <TextField
                                    label="Opción"
                                    name={`variants.${index}.options.${optIndex}.name`}
                                    placeholder="Nombre"
                                    value={option.name}
                                  />
                                </div>
                                {
                                  variant.hasPrice && (
                                    <div className="col-span-3">
                                      <TextField
                                        label="Precio"
                                        type="number"
                                        name={`variants.${index}.options.${optIndex}.price`}
                                        placeholder="Precio"
                                        value={option.price}
                                      />
                                    </div>
                                  )
                                }
                                {
                                  optIndex > 0 ? (
                                  <div className="col-span-1">
                                    <IconButton
                                      iconName='trash'
                                      variant={ Variant.GHOST }
                                      onClick={() => removeOption( optIndex )}
                                      disabled={ !isAuthor }
                                    />
                                  </div> ) : (
                                  <div className="col-span-1"></div>
                                  )
                                }
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            {
                              variant.hasPrice ? (
                                <Button
                                  text="Agregar Opción"
                                  size={ Size.SMALL }
                                  variant={ Variant.GHOST }
                                  iconName='plus-small' onClick={() => pushOption({ id: uuidv4(), name: '', price: null })}
                                  disabled={ !isAuthor }
                                />
                              ) : (
                                <Button
                                  text="Agregar Opción"
                                  size={ Size.SMALL }
                                  variant={ Variant.GHOST }
                                  iconName='plus-small' onClick={() => pushOption({ id: uuidv4(), name: '' })}
                                  disabled={ !isAuthor }
                                />
                              )
                            }
                          </div>
                          </>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
          <AddSection
            buttonText='Agregar Variación'
            emptyText='Este producto no tiene Variaciones aun'
            empty={ values.variants.length === 0 }
            isAuthor={ isAuthor }
            onClick={() => {
              if (!hasVariantWithPrice) {
                openModal();
              } else {
                handleAddVariant(push, false);
              }
            }}
          />
        </>
      )}
    </FieldArray>
  )
}
