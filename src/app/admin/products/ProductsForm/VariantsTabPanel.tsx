import { FieldArray, Field } from 'formik'
import { Button, TextField, Modal } from '@/components'
import { useState, useRef, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Product } from '@/interfaces'

type VariantsTabPanelProps = {
  values: any
  errors: any
  touched: any
  product: Product | undefined
  branchId: string | undefined
  activeModal: boolean
  openModal: () => void
  closeModal: () => void
}

export const VariantsTabPanel = ({
  values,
  product,
  branchId,
  activeModal,
  openModal,
  closeModal
}: VariantsTabPanelProps) => {
  const [newVariantIndex, setNewVariantIndex] = useState<number | null>(null)
  const variantRefs = useRef<Array<HTMLInputElement | null>>([])
  const [listRef] = useAutoAnimate()

  useEffect(() => {
    if (newVariantIndex !== null && variantRefs.current[newVariantIndex]) {
      variantRefs.current[newVariantIndex]?.scrollIntoView({ behavior: 'smooth' })
      variantRefs.current[newVariantIndex]?.focus()
      setNewVariantIndex(null)
    }
  }, [newVariantIndex])

  const removeEmptyOptions = (formValues: any): any => {
    const newVariants = formValues.variants
      .map((variant: any) => ({
        ...variant,
        options: variant.options.filter((option: any) => option.name || option.price)
      }))
      .filter((variant: any) => variant.name || variant.options.length > 0)
    return {
      ...formValues,
      variants: newVariants
    }
  }

  const handleAddVariant = (push: any) => {
    openModal()
    setNewVariantIndex(values.variants.length)
  }

  return (
    <div className="block__body__content isPage">
      <FieldArray name="variants">
        {({ remove, push }) => (
          <>
            <div className='form__options__header'>
              {product?.user.branchId === branchId && (
                <Button
                  text="Agregar Variación"
                  ghost
                  size='small'
                  iconName='plus-small'
                  onClick={handleAddVariant}
                />
              )}
              {values.variants.length === 0 && (
                <div className='form__options__null'>
                  <i className="fi fi-rr-empty-set"></i>
                  <span>Este producto no tiene variaciones aun</span>
                </div>
              )}
            </div>
            {activeModal && (
              <Modal>
                <div className="confirm">
                  <h3 className="confirm__title">¿La Variación tendrá Precio?</h3>
                  <p>Si una variación tiene un precio asignado, ese será el nuevo precio del producto.</p>
                  <div className="confirm__buttons">
                    <Button text='Sí' onClick={() => {
                      push({ name: '', hasPrice: true, options: [{ name: '', price: null }] })
                      setNewVariantIndex(values.variants.length)
                      closeModal()
                    }} />
                    <Button text='No' onClick={() => {
                      push({ name: '', hasPrice: false, options: [{ name: '' }] })
                      setNewVariantIndex(values.variants.length)
                      closeModal()
                    }} />
                  </div>
                </div>
              </Modal>
            )}
            {values.variants && (
              <div className='form__options'>
                {values.variants.map((variant: any, index: number) => (
                  <div key={index} className="form__options__row">
                    <div className='form__options__content'>
                      <Button
                        mode='error'
                        iconName='trash'
                        ghost onClick={() => remove(index)}
                      />
                      <div className='form__options__name'>
                        <TextField
                          label='Variación'
                          type="text"
                          name={`variants.${index}.name`}
                          placeholder="Ingresa una Variación"
                          value={variant.name}
                          innerRef={el => variantRefs.current[index] = el}
                        />
                      </div>
                      <FieldArray name={`variants.${index}.options`}>
                        {({ remove: removeOption, push: pushOption }) => (
                          <ul className='form__options__list' ref={listRef}>
                            {variant.options.map((option: any, optIndex: number) => (
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
                                {variant.hasPrice && (
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
                                )}
                                {optIndex > 0 ? (
                                  <div style={{ width: '40px' }}>
                                    <Button
                                      iconName='trash'
                                      size='small'
                                      ghost onClick={() => removeOption(optIndex)}
                                      disabled={product?.user.branchId !== branchId}
                                    />
                                  </div>) : (
                                  <div style={{ width: '40px' }}>
                                  </div>
                                )}
                              </li>
                            ))}
                            <div className='form__options__footer'>
                              {variant.hasPrice ? (
                                <Button
                                  text="Agregar Opción"
                                  mode='withoutBg'
                                  size='small'
                                  iconName='plus-small' onClick={() => pushOption({ name: '', price: null })}
                                  disabled={product?.user.branchId !== branchId}
                                />
                              ) : (
                                <Button
                                  text="Agregar Opción"
                                  mode='withoutBg'
                                  size='small'
                                  iconName='plus-small' onClick={() => pushOption({ name: '' })}
                                  disabled={product?.user.branchId !== branchId}
                                />
                              )}
                            </div>
                          </ul>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </FieldArray>
    </div>
  )
}
