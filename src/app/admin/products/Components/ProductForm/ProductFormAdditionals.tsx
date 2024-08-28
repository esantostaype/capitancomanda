'use client'

import { IconButton, Table, Td } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldArray } from 'formik'
import { Color, ProductAdditional, ProductFormValues, Size, Variant } from '@/interfaces'
import { AdminAddSection } from '@/components'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  additionals: ProductAdditional[]
}

export const ProductFormAdditionals = ({ additionals }: Props ) => {
  
  const [ newAdditionalIndex, setNewAdditionalIndex ] = useState<number | null>(null)
  const additionalRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if ( additionals.length > 0 ) {
      const lastIndex = additionals.length - 1
      additionalRefs.current[ lastIndex ]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if ( newAdditionalIndex !== null && additionalRefs.current[newAdditionalIndex]) {
      additionalRefs.current[newAdditionalIndex]?.scrollIntoView({ behavior: 'smooth' })
      additionalRefs.current[newAdditionalIndex]?.focus()
      setNewAdditionalIndex(null)
    }
  }, [ newAdditionalIndex ])

  const headers = [
    { label: 'Nombre', width: '480px' },
    { label: 'Precio', width: '240px' },
    { label: '', width: '50px' }
  ]

  return (
    <FieldArray name="additionals">
      {({ remove, push }) => (
        <>
        {
          additionals.length > 0 && (
            <>
            <Table thead={ headers }>
              { additionals.map(( ingredient, index) => (
                <tr key={index} className="group">
                  <Td>
                    <Field
                      type="text"
                      name={`additionals.${index}.name`}
                      placeholder="Ingresa el Nombre"
                      value={ ingredient.name }
                      className="outline-none"
                      innerRef={ (el: HTMLInputElement | null) => additionalRefs.current[index] = el }
                    />
                  </Td>
                  <Td>
                    <Field
                      type="number"
                      name={`additionals.${index}.price`}
                      placeholder="Ingresa el Precio"
                      value={ ingredient.price }
                      className="outline-none"
                    />
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
          buttonText='Agregar Adicional'
          emptyText='Este producto aun no tiene adicionales'
          empty={ additionals.length === 0 }
          onClick={() => {
            push({ id: uuidv4(), name: '', quantity: null })
            setNewAdditionalIndex( additionals.length )
          }}
        />
        </>
      )}
    </FieldArray>
  )
}