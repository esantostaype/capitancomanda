'use client'

import { IconButton, Table, Td } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldArray } from 'formik'
import { Color, ProductFormValues, Size, Variant } from '@/interfaces'
import { AddSection } from './AddSection'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  isAuthor: boolean
  values: ProductFormValues
}

export const ProductFormIngredients = ({ isAuthor, values }: Props ) => {
  
  const [ newIngredientIndex, setNewIngredientIndex ] = useState<number | null>(null)
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if ( values.ingredients.length > 0 ) {
      const lastIndex = values.ingredients.length - 1
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
          values.ingredients.length > 0 && (
            <>
            <Table thead={ headers }>
              { values.ingredients.map(( ingredient, index) => (
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
                    Gr.
                  </Td>
                  <Td>
                    <div className="table__flex table__actions">
                      <IconButton
                        color={ Color.ERROR }
                        iconName='trash'
                        variant={ Variant.GHOST }
                        onClick={() => remove(index)}
                        size={ Size.SMALL }
                        disabled={ !isAuthor }
                      />
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
            </>
          )
        }
        <AddSection
          buttonText='Agregar Ingrediente'
          emptyText='Este producto no tiene ingredientes aun'
          empty={ values.ingredients.length === 0 }
          isAuthor={ isAuthor }
          onClick={() => {
            push({ id: uuidv4(), name: '', quantity: null })
            setNewIngredientIndex( values.ingredients.length )
          }}
        />
        </>
      )}
    </FieldArray>
  )
}