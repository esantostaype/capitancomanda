'use client'

import { Button, IconButton, RestaurantTable, TextField } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { FieldArray } from 'formik'
import { Color, Floor, IconButtonShape, Size, TableStatus, Variant } from '@/interfaces'
import { AdminAddSection } from '@/components'
import { v4 as uuidv4 } from 'uuid'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

interface Props {
  floors: Floor[]
}

export const BranchFormFloors = ({ floors }: Props) => {

  const [newFloorIndex, setNewFloorIndex] = useState<number | null>(null)
  const floorRefs = useRef<Array<HTMLInputElement | null>>([])
  const [tabIndex, setTabIndex] = useState(0)

  if ( floors.length === 0 ) {
    floors.push({
      name: `Ambiente ${ floors.length + 1 }`,
      tables: [
        { status: TableStatus.AVAILABLE, number: '1' },
        { status: TableStatus.AVAILABLE, number: '2' },
        { status: TableStatus.AVAILABLE, number: '3' },
        { status: TableStatus.AVAILABLE, number: '4' }, 
      ]
    })
  }

  useEffect(() => {
    if (floors.length > 0) {
      const lastIndex = floors.length - 1
      floorRefs.current[lastIndex]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (newFloorIndex !== null && floorRefs.current[newFloorIndex]) {
      floorRefs.current[newFloorIndex]?.scrollIntoView({ behavior: 'smooth' })
      floorRefs.current[newFloorIndex]?.focus()
      setNewFloorIndex(null)
    }
  }, [newFloorIndex])

  const handleAddFloor = ( push: any ) => {
    push({
      name: `Ambiente ${ floors.length + 1 }`,
      tables: [
        { status: TableStatus.AVAILABLE, number: '1' },
        { status: TableStatus.AVAILABLE, number: '2' },
        { status: TableStatus.AVAILABLE, number: '3' },
        { status: TableStatus.AVAILABLE, number: '4' }, 
      ]
    })
    setNewFloorIndex( floors.length )
    setTabIndex( floors.length )
  }

  return (
    <FieldArray name="floors">
      {({ push, remove }) => (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="flex flex-col flex-1">
          <TabList className="border-b border-b-gray50 bg-surface sticky top-10 mb-8 -mt-8 z-[999] flex items-start gap-6 h-10 font-500 leading-4 text-gray500">
            { floors.map(( floor, index ) => (
              <Tab key={ index }>
                { index > 0 &&
                  <IconButton
                    color={Color.ERROR}
                    iconName='trash'
                    size={Size.SM}
                    onClick={() => remove( index )}
                  />
                }
                { floor.name }
              </Tab>
            ))}
            <div className="mt-1">
              <IconButton
                size={Size.SM}
                iconName='plus'
                onClick={() => {
                  handleAddFloor(push)
                }}
              />
            </div>
          </TabList>
          { floors.map(( floor, index ) => (
            <TabPanel key={ index }>
              <div className="grid grid-cols-8 gap-4">
                <div className='col-span-4'>
                  <TextField
                    label='Nombre de Ambiente'
                    name={`floors.${index}.name`}
                    placeholder="Ingresa un Nombre de Ambiente"
                    value={floor.name}
                    innerRef={el => floorRefs.current[index] = el}
                  />
                </div>
              </div>
              <FieldArray name={`floors.${index}.tables`}>
                {({ remove: removeTable, push: pushTable }) => (
                  <>
                  <div className="flex items-center gap-4 my-4">
                    <Button
                      text="Agregar Mesa"
                      size={Size.SM}
                      variant={Variant.GHOST}
                      iconName='plus-small'
                      onClick={() => pushTable({ status: TableStatus.AVAILABLE,  number: `${ floor.tables.length + 1 }` })}
                    />
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 md:gap-6">
                    { floor.tables.map(( table, tableIndex ) => (
                      <div key={ tableIndex } className="flex items-center justify-center aspect-square">
                        <div className="group relative flex items-center justify-center h-24 w-24">
                          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-30">
                            <IconButton
                              color={ Color.ERROR }
                              variant={ Variant.CONTAINED }
                              iconName='trash'
                              size={ Size.MD }
                              onClick={() => removeTable( tableIndex )}
                            />
                          </div>
                          <span className="relative z-20 text-lg text-gray600">{ tableIndex + 1 }</span>
                          <RestaurantTable className="absolute fill-gray50 z-10"/>
                        </div>
                      </div>
                    ))}
                  </div>
                  </>
                )}
              </FieldArray>
            </TabPanel>
          ))}
        </Tabs>
      )}
    </FieldArray>
  )
}
