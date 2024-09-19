'use client'
import { RestaurantTable } from '@/components'
import { useBranch} from '@/hooks'
import { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useOrderStore } from '@/store/order-store'

interface Props {
  token?: string
  branchId?: string
}

export const OrderTables = ({ token, branchId }: Props) => {

  const { data: branch } = useBranch({ branchId, token })
  const [ tabFloorIndex, setTabFloorIndex ] = useState(0)
  const { selectedFloor, setSelectedFloor, selectedTable, setSelectedTable } = useOrderStore()

  useEffect(() => {
    if ( branch?.floors ) {
      const floorIndex = branch.floors.findIndex( floor => floor.name === selectedFloor)
      if ( floorIndex !== -1 ) {
        setTabFloorIndex( floorIndex )
      }
    }
  }, [ selectedFloor, branch ])

  return (
    <div>
      <Tabs selectedIndex={ tabFloorIndex } onSelect={( index ) => {
        setTabFloorIndex( index )
        setSelectedFloor( branch?.floors[index].id || null )
      }}>
        <div className="flex flex-1 flex-col md:flex-initial p-4 md:px-6 md:py-4 md:border-b md:border-b-gray50 sticky top-14 z-[999] md:bg-surface">          
          <TabList className="tables-tab grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:flex md:flex-wrap md:items-center gap-4 md:gap-3">
            { branch?.floors.map(( floor, index ) => (
              <Tab key={ index }>{ floor.name }</Tab>
            ))}
          </TabList>
        </div>
        { branch?.floors.map(( floor ) => (
          <TabPanel key={ floor.id }>
            <div className="flex flex-1 flex-col p-4 md:p-6">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 md:gap-6">
                { floor.tables.map(( table ) => (
                  <div
                    key={ table.id }
                    className="flex items-center justify-center aspect-square cursor-pointer"
                    onClick={() => setSelectedTable( table.id || '' )}
                  >
                    <div className="relative flex items-center justify-center w-16 h-16 md:h-24 md:w-24">
                      <span className={`relative z-20 text-lg font-bold ${ selectedTable === table.id ? 'text-gray50' : ' text-gray600'}`}>
                        { table.number }
                      </span>                              
                      <RestaurantTable className={`w-16 h-16 md:w-24 md:h-24 absolute z-10 transition-all ${selectedTable === table.id ? 'fill-gray900' : 'fill-gray50'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}