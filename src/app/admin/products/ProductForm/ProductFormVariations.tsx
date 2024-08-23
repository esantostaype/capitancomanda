'use client'

import { Button, IconButton, Modal, Table, Td, TextField } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldArray } from 'formik'
import { useUiStore } from '@/store/ui-store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Color, ProductVariation, Size, Variant } from '@/interfaces'
import { AdminAddSection } from '@/components'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  variations: ProductVariation[]
}

export const ProductFormVariations = ({ variations }: Props ) => {
  
  const [ newVariationIndex, setNewVariationIndex ] = useState<number | null>(null)
  const { activeModalId, openModalById, closeModal } = useUiStore()
  const variationRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if ( variations.length > 0 ) {
      const lastIndex = variations.length - 1
      variationRefs.current[ lastIndex ]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if ( newVariationIndex !== null && variationRefs.current[ newVariationIndex ]) {
      variationRefs.current[ newVariationIndex ]?.scrollIntoView({ behavior: 'smooth' })
      variationRefs.current[ newVariationIndex ]?.focus()
      setNewVariationIndex( null )
    }
  }, [ newVariationIndex ])

  const hasVariationWithPrice = variations.some(variation => variation.hasPrice);

  const handleAddVariation = ( push: any, hasPrice: boolean ) => {
    push({
      id: uuidv4(),
      name: '',
      hasPrice,
      options: hasPrice ? [{ id: uuidv4(), name: '', price: null }] : [{ id: uuidv4(), name: '' }]
    });
    setNewVariationIndex(variations.length);
    closeModal();
  }

  return (
    <>
    <FieldArray name="variations">
      {({ remove, push }) => (
        <>
          <Modal isOpen={ activeModalId === 'variation' } size={ Size.LG }>
            <div className="text-center p-8">
              <h3 className="font-semibold text-lg mb-4">¿La Variación tendrá Precio?</h3>
              <p>Si una variación tiene un precio asignado, ese será el nuevo precio del producto.</p>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  text='Sí'
                  variant={ Variant.CONTAINED }
                  onClick={() => handleAddVariation(push, true)}
                  className="min-w-32"
                />
                <Button
                  text='No'
                  variant={ Variant.CONTAINED }
                  onClick={() => handleAddVariation(push, false)}
                  className="min-w-32"
                />
              </div>
            </div>
          </Modal>
          {
            variations.length > 0 && (
              <div className="flex flex-col gap-8 mb-8">
                <>
                { variations.map((variation, index) => {
                  const headers = [
                    { label: 'Opción', width: '480px' },
                    { label: variation.hasPrice ? 'Precio' : '', width: '160px' },
                    { label: '', width: '20px' }
                  ]
                  return (
                    <>
                    <div key={index} className="grid grid-cols-12 gap-4 border-b-2 border-b-gray50 pb-6">
                      <div className='col-span-5 flex items-start gap-4'>
                        <IconButton
                          color={Color.ERROR}
                          iconName='trash'
                          variant={Variant.GHOST}
                          onClick={() => remove(index)}
                        />
                        <TextField
                          name={`variations.${index}.name`}
                          placeholder="Ingresa una Variación"
                          value={variation.name}
                          innerRef={el => variationRefs.current[index] = el}
                        />
                      </div>
                      <div className="col-span-7">
                        <FieldArray name={`variations.${index}.options`}>
                          {({ remove: removeOption, push: pushOption }) => (
                            <>
                              <Table thead={headers}>
                                {variation.options.map((option, optIndex) => (
                                  <tr key={optIndex} className="group">
                                    <Td>
                                      <Field
                                        type="text"
                                        name={`variations.${index}.options.${optIndex}.name`}
                                        value={option.name}
                                        className={`${!option.name ? "border border-gray100 -ml-2 px-2" : "border border-transparent"} hover:border hover:border-gray100 focus:border focus:border-gray100 -ml-2 px-2 outline-none py-2 rounded`}
                                        placeholder='Opción'
                                      />
                                    </Td>
                                    {variation.hasPrice ? (
                                      <Td>
                                        <Field
                                          type="number"
                                          name={`variations.${index}.options.${optIndex}.price`}
                                          value={option.price}
                                          className={`${!option.price ? "border border-gray100 -ml-2 px-2" : "border border-transparent"} hover:border hover:border-gray100 focus:border focus:border-gray100 -ml-2 px-2 outline-none py-2 rounded`}
                                          placeholder='Precio'
                                        />
                                      </Td>
                                    ) : (
                                      <Td> </Td>
                                    )}
                                    <Td>
                                      {optIndex > 0 &&
                                        <IconButton
                                          color={Color.ERROR}
                                          iconName='trash'
                                          variant={Variant.GHOST}
                                          onClick={() => removeOption(optIndex)}
                                          size={Size.SM}
                                        />
                                      }
                                    </Td>
                                  </tr>
                                ))}
                              </Table>
                              <div className="mt-4">
                                <Button
                                  text="Agregar Opción"
                                  size={Size.SM}
                                  variant={Variant.GHOST}
                                  iconName='plus-small'
                                  onClick={() => pushOption({ id: uuidv4(), name: '', price: variation.hasPrice ? null : undefined })}
                                />
                              </div>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    </div>                    
                    </>
                  )
                })}
                </>
              </div>
            )
          }
          <AdminAddSection
            buttonText='Agregar Variación'
            emptyText='Este producto aun no tiene Variaciones'
            empty={ variations.length === 0 }
            onClick={() => {
              if (!hasVariationWithPrice) {
                openModalById('variation');
              } else {
                handleAddVariation(push, false);
              }
            }}
          />
        </>
      )}
    </FieldArray>
    </>
  )
}
