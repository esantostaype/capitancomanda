'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { Formik, Form } from 'formik'
import { Client, Color, OrderItemFull, OrderType, Size, Variant } from '@/interfaces'
import { toast } from 'react-toastify'
import { Button, ModalBody, ModalFooter, ModalPage, Spinner, TextField } from '@/components'
import { addOrder } from '@/actions/order-actions'
import { useUiStore } from '@/store/ui-store'
import OrderFormTypeItem from './OrderFormTypeItem'
import { useGlobalStore } from '@/store/global-store'
import { ClientSearch } from './ClientSearch'
import { OrderPrint } from './OrderPrint'
import { useReactToPrint } from 'react-to-print'

interface Props {
  token?: string
  branchId?: string
  waiter: string
}

interface FormValues {
  floor: string
  table: string
  total: number
  orderType: OrderType | undefined
  notes: string
  order: OrderItemFull[]
  client?: Client | null
}

export const OrderForm = ({ token, waiter }: Props) => {

  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const { activeModalPage, closeModalPage, closeModal } = useUiStore()
  const { findLastOrder } = useOrderStore()
  const [ orderNumber, setOrderNumber ] = useState("00001")
  const [ clientSelected, setClientSelected ] = useState<Client | null>( null )
  const [ isClientSelected, setIsClientSelected ] = useState( false )
  const { toggleUpdateTrigger, updateTrigger } = useGlobalStore()

  const {
    selectedFloorId,
    selectedFloorName,
    setSelectedFloorId,
    setSelectedFloorName,
    selectedTableId,
    selectedTableNumber,
    setSelectedTableId,
    setSelectedTableNumber
  } = useOrderStore()
  const [ selectedOrderType, setSelectedOrderType ] = useState<OrderType>( OrderType.DINE_IN )
  const [ notes, setNotes ] = useState<string>('')

  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem('order')
    if ( storedOrder ) {
      const parsedOrder = JSON.parse( storedOrder )
      setOrder( parsedOrder )
    }
  }, [ setOrder ])

  useEffect(() => {
    if (!activeModalPage) {
      setSelectedOrderType( OrderType.DINE_IN )
      setClientSelected( null )
      setIsClientSelected( false )
      setNotes('')
    }
  }, [ activeModalPage ])

  const initialValues: FormValues = {
    floor: '',
    table: '',
    total,
    orderType: OrderType.DINE_IN,
    notes: '',
    order,
    client: clientSelected
  }

  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const orderNumber = await findLastOrder()
        setOrderNumber( orderNumber )
      } catch ( error ) {
      }
    }
  
    fetchOrderNumber()
  }, [ findLastOrder, updateTrigger ])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => closeModal(true),
  })
  
  const handleSubmit = async ( values: FormValues ) => {
    
    const orderData = {
      order,
      floor: selectedFloorId,
      table: selectedTableId,
      total,
      orderType: selectedOrderType,
      notes: values.notes,
      client: values.client || clientSelected
    }

    if( !selectedTableId ) {
      toast.error('Por favor, selecciona una mesa')
      return
    }

    if( !selectedFloorId ) {
      toast.error('Por favor, selecciona un ambiente')
      return
    }
    await addOrder( orderData )
    setSelectedFloorName('')
    setSelectedFloorId('')
    setSelectedTableId('')
    setSelectedTableNumber('')
    handlePrint()
    closeModalPage()
    clearOrder()
    toggleUpdateTrigger()
  }
  
  return (
    <ModalPage title={`Orden #${ orderNumber } `} isOpen={ activeModalPage } backText='Seguir agregando productos'>
      <Formik initialValues={ initialValues } onSubmit={ handleSubmit } enableReinitialize={ true }>
        {({ isSubmitting, setFieldValue }) => (   
        <>
        <Spinner isActive={ isSubmitting }/>
        <Form className="flex flex-col flex-1 overflow-y-auto">
          <ModalBody>
            <div className='flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12'>
              <div>
                <h3 className="text-lg md:text-2xl text-gray500 font-bold mb-2 md:mb-4">Cliente</h3>                  
                <div className='flex flex-col md:grid md:grid-cols-2 gap-6'>
                  <div className="md:grid grid-cols-2 col-span-2 gap-6 relative">
                    <div className="col-span-1">
                      <ClientSearch onSelectClient={( client ) => {
                        setClientSelected( client )
                        setIsClientSelected( true )
                      }} token={ token } />
                    </div>
                    
                    { isClientSelected && (
                      <div className="col-span-1">
                        <Button 
                          variant={ Variant.GHOST }
                          text="Limpiar"
                          size={ Size.LG }
                          color={ Color.ACCENT }
                          onClick={() => {
                            setIsClientSelected( false )
                            setClientSelected( null )
                            setFieldValue('client', null)
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {
                    isClientSelected
                    ? <>
                    <div className="col-span-1">
                      <TextField placeholder='Nombre' type='text' name='client.fullName' value={clientSelected?.fullName || ''} disabled />
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='DNI' type='text' name='client.dni' value={clientSelected?.dni || ''} disabled />
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='Teléfono' type='text' name='client.phone' value={clientSelected?.phone || ''} disabled />
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='Correo Electrónico' type='text' name='client.email' value={clientSelected?.email || ''} disabled />
                    </div>
                    </>
                    : <>
                    <div className="col-span-1">
                      <TextField placeholder='Nombre' type='text' name='client.fullName'/>
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='DNI' type='text' name='client.dni'/>
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='Teléfono' type='text' name='client.phone'/>
                    </div>
                    <div className="col-span-1">
                      <TextField placeholder='Correo Electrónico' type='text' name='client.email'/>
                    </div>
                    </>
                  }
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-2xl text-gray500 font-bold mb-2 md:mb-4">Tipo de Órden</h3>
                <ul className="flex flex-wrap gap-4">
                  <OrderFormTypeItem
                    type={ OrderType.DINE_IN }
                    isSelected={ selectedOrderType === OrderType.DINE_IN }
                    onClick={() => setSelectedOrderType( OrderType.DINE_IN ) }
                  />
                  <OrderFormTypeItem
                    type={ OrderType.TAKE_AWAY }
                    isSelected={ selectedOrderType === OrderType.TAKE_AWAY }
                    onClick={() => setSelectedOrderType( OrderType.TAKE_AWAY ) }
                  />
                  <OrderFormTypeItem
                    type={ OrderType.DELIVERY }
                    isSelected={ selectedOrderType === OrderType.DELIVERY }
                    onClick={() => setSelectedOrderType( OrderType.DELIVERY ) }
                  />
                </ul>
              </div>

              {/* <div>
                <h3 className="text-lg md:text-2xl text-gray500 font-bold mb-2 md:mb-4">Selecciona una Mesa</h3>
                <Tabs selectedIndex={ tabFloorIndex } onSelect={( index ) => {
                    setTabFloorIndex( index )
                    setSelectedFloorId( branch?.floors[index].name || null )
                    setSelectedTableId( null )
                  }} className="flex flex-col flex-1">
                  <TabList className="border-b border-b-gray50 mb-6 z-[999] flex gap-4 md:gap-6 text-base font-500 leading-none text-gray500">
                    { branch?.floors.map(( floor, index ) => (
                      <Tab key={ index }>{ floor.name }</Tab>
                    ))}
                  </TabList>
                  { branch?.floors.map(( floor, floorIndex ) => (
                    <TabPanel key={ floorIndex }>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4 md:gap-6">
                        { floor.tables.map(( table, tableIndex ) => (
                          <div
                            key={ tableIndex }
                            className="flex items-center justify-center aspect-square cursor-pointer"
                            onClick={() => setSelectedTableId(( tableIndex + 1 ).toString())}
                          >
                            <div className="relative flex items-center justify-center w-16 h-16 md:h-24 md:w-24">
                              <span className={`relative z-20 text-lg font-bold ${ selectedTableId === ( tableIndex + 1 ).toString() ? 'text-gray50' : ' text-gray600'}`}>
                                { tableIndex + 1 }
                              </span>                              
                              <RestaurantTable className={`w-16 h-16 md:w-24 md:h-24 absolute z-10 transition-all ${selectedTableId === ( tableIndex + 1 ).toString() ? 'fill-gray900' : 'fill-gray50'}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
              </div> */}

              <div>
                <h3 className="text-lg md:text-2xl text-gray500 font-bold mb-2 md:mb-4">Notas</h3>
                <TextField typeField='textarea' name='notes' onChange={(e) => {
                  setFieldValue('notes', e.target.value)
                  setNotes(e.target.value)
                }}/>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="pb-16 md:pb-0 flex justify-end gap-4 w-full">
              <Button variant={ Variant.GHOST } text="Cancelar" size={ Size.LG } onClick={ ()=> closeModalPage() }/>
              <Button
                submit
                className="flex-1"
                text='Enviar'
                color={Color.ACCENT}
                size={Size.LG}
                variant={Variant.CONTAINED}
              />
              {/* <Button
                text='Enviar Comanda'
                color={ Color.ACCENT }
                size={ Size.LG }
                variant={ Variant.CONTAINED }
                submit
              /> */}
            </div>
          </ModalFooter>
        </Form>
        </>
        )}
      </Formik>
      <div style={{ display: 'none' }}>
        <OrderPrint ref={ componentRef } orderData={{
          order,
          orderNumber,
          floor: selectedFloorName || '',
          table: selectedTableNumber || '',
          total,
          orderType: selectedOrderType,
          notes,
          client: clientSelected,
          waiter: waiter
        }} />
      </div>
    </ModalPage>
  )
}