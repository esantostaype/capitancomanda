'use client'
import { useEffect, useMemo, useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { Formik, Form, FormikHelpers } from 'formik'
import { Client, Color, OrderItemFull, OrderType, Size, Variant } from '@/interfaces'
import { toast } from 'react-toastify'
import { revalidatePath } from 'next/cache'
import { Button, ModalBody, ModalFooter, ModalPage, RestaurantTable, Spinner, TextField } from '@/components'
import { addOrder } from '@/actions/send-order-action'
import { useUiStore } from '@/store/ui-store'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

interface FormValues {
  table: string
  total: number
  orderType: OrderType | undefined
  notes: string
  order: OrderItemFull[]
  client?: Client
}

export const OrderForm = () => {
  
  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const { activeModalPage, closeModalPage } = useUiStore()
  const [ tabIndex, setTabIndex ] = useState(0)

  const [ selectedTable, setSelectedTable ] = useState<string | null>( null )
  const [ selectedOrderType, setSelectedOrderType ] = useState<OrderType>( OrderType.DINE_IN )

  const initialValues: FormValues = {
    table: '',
    total,
    orderType: OrderType.DINE_IN,
    notes: '',
    order,
    client: undefined
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    
    const orderData = {
      table: selectedTable || '',
      total,
      orderType: selectedOrderType,
      notes: values.notes,
      order,
      client: values.client
    }

    const result = await addOrder( orderData )

    if( !result.success ) {
      result.errors.forEach(( issue: any ) => {
        toast.error( issue )
      })
      return
    }

    toast.success('¡Comanda enviada!')
    clearOrder()
    revalidatePath('/kitchen')
  }

  useEffect(() => {
    const storedOrder = localStorage.getItem('order')
    if ( storedOrder ) {
      const parsedOrder = JSON.parse( storedOrder )
      setOrder( parsedOrder )
    }
  }, [ setOrder ])

  return (
    <ModalPage title='Orden #132345' isOpen={ activeModalPage } backText='Seguir agregando productos'>
      <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
        {({ isSubmitting, setFieldValue }) => (   
        <>
        <Spinner isActive={ isSubmitting }/>
        <Form className="flex flex-col flex-1 overflow-y-auto">
          <ModalBody>
            <div className='flex flex-col gap-8'>
              <div>
                <h3 className="text-lg font-semibold mb-4">Cliente</h3>
                <Tabs selectedIndex={ tabIndex } onSelect={( index ) => setTabIndex( index )} className="flex flex-col flex-1">
                  <TabList className="border-b border-b-gray50 mb-6 z-[999] flex gap-6 text-base font-500 leading-none text-gray500">
                    <Tab>Nuevo</Tab>
                    <Tab>Recurrente</Tab>
                  </TabList>
                  <TabPanel>
                    <div className='grid grid-cols-2 gap-6'>
                      <div className='row-span-1'>
                        <TextField label='Nombre' placeholder='Ingresa el Nombre del Cliente' type='text' name='client.fullName' />
                      </div>
                      <div className='row-span-1'>
                        <TextField label='DNI' placeholder='Ingresa el Nombre del Cliente' type='text' name='client.dni' />
                      </div>
                      <div className='row-span-1'>
                        <TextField label='Teléfono' placeholder='Ingresa el Teléfono del Cliente' type='text' name='client.phone' />
                      </div>
                      <div className='row-span-1'>
                        <TextField label='Correo Electrónico' placeholder='Ingresa el Correo Electrónico del Cliente' type='text' name='client.email' />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <TextField label='Buscar por DNI o Nombre' placeholder='Ingresa el Nombre o DNI del Cliente' type='text' name='searchTerm' />
                  </TabPanel>
                </Tabs>
              </div>

              <div className="w-1/2">
                <h3 className="text-lg font-semibold">Tipo de Órden</h3>
                <ul className="flex gap-4 mt-4">
                  <li 
                    className={`aspect-square flex items-center justify-center flex-1 flex-col gap-2 leading-4 text-center rounded-md w-32 p-6 cursor-pointer border-2 transition-all ${selectedOrderType === OrderType.DINE_IN ? 'border-accent' : 'bg-gray50 border-gray50'}`}
                    onClick={() => setSelectedOrderType(OrderType.DINE_IN)}
                  >
                    <i className="fi fi-tr-utensils text-2xl"></i>
                    Comer en Salón
                  </li>
                  <li 
                    className={`aspect-square flex items-center justify-center flex-1 flex-col gap-2 leading-4 text-center rounded-md w-32 p-6 cursor-pointer border-2 transition-all ${selectedOrderType === OrderType.DELIVERY ? 'border-accent' : 'bg-gray50 border-gray50'}`}
                    onClick={() => setSelectedOrderType(OrderType.DELIVERY)}
                  >
                    <i className="fi fi-tr-grocery-bag text-2xl"></i>
                    Para LLevar
                  </li>
                  <li 
                    className={`aspect-square flex items-center justify-center flex-1 flex-col gap-2 leading-4 text-center rounded-md w-32 p-6 cursor-pointer border-2 transition-all ${selectedOrderType === OrderType.TAKE_AWAY ? 'border-accent' : 'bg-gray50 border-gray50'}`}
                    onClick={() => setSelectedOrderType(OrderType.TAKE_AWAY)}
                  >
                    <i className="fi fi-tr-moped text-2xl"></i>
                    Delivery
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Selecciona una Mesa</h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] mt-8">
                  { Array.from({ length: 11 }).map((_, tableIndex) => (
                    <div 
                      key={tableIndex} 
                      className="flex items-center justify-center aspect-square cursor-pointer"
                      onClick={() => setSelectedTable((tableIndex + 1).toString())}
                    >
                      <div className="relative flex items-center justify-center h-24 w-24">
                        <span className={`relative z-20 text-lg font-bold ${ selectedTable === ( tableIndex + 1 ).toString() ? 'text-gray50' : ' text-gray600'}`}>{ tableIndex + 1 }</span>
                        <RestaurantTable className={`absolute z-10 transition-all ${ selectedTable === ( tableIndex + 1 ).toString() ? 'fill-gray900' : ' fill-gray50'}`}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Comentarios</h3>
                <TextField typeField='textarea' name='notes' />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={ Variant.CONTAINED } text="Cancelar" size={ Size.LG } onClick={ ()=> closeModalPage() }/>
            <Button
              text='Imprimir Comanda'
              color={ Color.ACCENT }
              size={ Size.LG }
              variant={ Variant.GHOST }
              submit
            />
            <Button
              text='Enviar Comanda'
              color={ Color.ACCENT }
              size={ Size.LG }
              variant={ Variant.CONTAINED }
              submit
            />
          </ModalFooter>
        </Form>
        </>
        )}
      </Formik>
    </ModalPage>
  )
}
