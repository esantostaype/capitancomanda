'use client'

import { IconButton, Table, Td } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldArray } from 'formik'
import { Color, MeasurementUnit, measurementUnitTranslations, ProductIngredient, Size, Variant } from '@/interfaces'
import { AdminAddSection } from '@/components'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  ingredients: ProductIngredient[]
}

export const ProductFormIngredients = ({ ingredients }: Props ) => {

  const unitOptions = [
    { value: '', label: 'Selecciona una Unidad' },
    ...Object.values(MeasurementUnit).filter(unit => typeof unit === 'string').map(unit => ({
      value: unit,
      label: measurementUnitTranslations[ unit as MeasurementUnit ]
    }))
  ]
  
  const [ newIngredientIndex, setNewIngredientIndex ] = useState<number | null>(null)
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if ( ingredients.length > 0 ) {
      const lastIndex = ingredients.length - 1
      ingredientRefs.current[ lastIndex ]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if ( newIngredientIndex !== null && ingredientRefs.current[newIngredientIndex]) {
      ingredientRefs.current[newIngredientIndex]?.scrollIntoView({ behavior: 'smooth' })
      ingredientRefs.current[newIngredientIndex]?.focus()
      setNewIngredientIndex(null)
    }
  }, [ newIngredientIndex ])

  const headers = [
    { label: 'Ingrediente', width: '240px' },
    { label: 'Cantidad', width: '240px' },
    { label: 'Unidad' },
    { label: '', width: '50px' }
  ]

  return (
    <FieldArray name="ingredients">
      {({ remove, push }) => (
        <>
        {
          ingredients.length > 0 && (
            <>
            <Table thead={ headers }>
              { ingredients.map(( ingredient, index) => (
                <tr key={index} className="group">
                  <Td>
                    <Field
                      type="text"
                      name={`ingredients.${index}.name`}
                      placeholder="Ingresa el Ingrediente"
                      value={ ingredient.name }
                      className="outline-none"
                      innerRef={ (el: HTMLInputElement | null) => ingredientRefs.current[index] = el }
                    />
                  </Td>
                  <Td>
                    <Field
                      type="number"
                      name={`ingredients.${index}.quantity`}
                      placeholder="Ingresa la Cantidad"
                      value={ ingredient.quantity }
                      className="outline-none"
                    />
                  </Td>
                  <Td>
                    <Field
                      as="select"
                      name={`ingredients.${ index }.unit`}
                      className="outline-none"
                    >
                      { unitOptions.map( option => (
                        <option key={ option.value } value={ option.value }>
                          { option.label }
                        </option>
                      ))}
                    </Field>
                  </Td>
                  <Td>
                    <div className="table__flex table__actions">
                      <IconButton
                        color={ Color.ERROR }
                        iconName='trash'
                        variant={ Variant.GHOST }
                        onClick={() => remove(index)}
                        size={ Size.SM }
                      />
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
            </>
          )
        }
        <AdminAddSection
          buttonText='Agregar Ingrediente'
          emptyText='Este producto aun no tiene ingredientes'
          empty={ ingredients.length === 0 }
          onClick={() => {
            push({ id: uuidv4(), name: '', quantity: null })
            setNewIngredientIndex( ingredients.length )
          }}
        />
        </>
      )}
    </FieldArray>
  )
}