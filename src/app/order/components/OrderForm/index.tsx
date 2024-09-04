'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { Formik, Form, FormikHelpers } from 'formik'
import { Branch, Client, Color, OrderItemFull, OrderType, Size, Variant } from '@/interfaces'
import { toast } from 'react-toastify'
import { Button, ModalBody, ModalFooter, ModalPage, RestaurantTable, Spinner, TextField } from '@/components'
import { addOrder } from '@/actions/order-actions'
import { useUiStore } from '@/store/ui-store'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import OrderFormTypeItem from './OrderFormTypeItem'
import { useGlobalStore } from '@/store/global-store'
import { setSession } from '@/utils/session'
import { fetchData } from '@/utils'
import { ClientSearch } from './ClientSearch'
import { OrderPrint } from './OrderPrint'
import ReactToPrint from 'react-to-print'

type Props = {
  token: string
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

export const OrderForm = ({ token }: Props) => {

  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const { activeModalPage, closeModalPage } = useUiStore()
  const { findLastOrder } = useOrderStore()
  const [ tabFloorIndex, setTabFloorIndex ] = useState(0)
  const [ orderNumber, setOrderNumber ] = useState("")
  const [ clientSelected, setClientSelected ] = useState<Client | null>( null )
  const [ isClientSelected, setIsClientSelected ] = useState( false )
  const { toggleUpdateTrigger, updateTrigger } = useGlobalStore()

  const [ selectedFloor, setSelectedFloor ] = useState<string | null>( null )
  const [ selectedTable, setSelectedTable ] = useState<string | null>( null )
  const [ selectedOrderType, setSelectedOrderType ] = useState<OrderType>( OrderType.DINE_IN )
  const [ branch, setBranch ] = useState<Branch>()

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
      setTabFloorIndex(0)
      setSelectedTable(null)
      setSelectedOrderType( OrderType.DINE_IN )
      setClientSelected( null )
      setIsClientSelected( false )
    }
  }, [ activeModalPage ])

  useEffect(() => {
    const fetchBranch = async () => {
      const { branchId, token } = await setSession()
      if ( branchId ) {
        const data = await fetchData({ url: `/branches/${branchId}`, token })
        setBranch(data)
        if (data?.floors.length > 0) {
          setSelectedFloor(data.floors[0].name)
        }
      }
    }
    fetchBranch()
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

  const handleSubmit = async ( values: FormValues ) => {
    
    const orderData = {
      order,
      floor: selectedFloor || '',
      table: selectedTable || '',
      total,
      orderType: selectedOrderType,
      notes: values.notes,
      client: values.client || clientSelected
    }

    if( !selectedTable ) {
      toast.error('Por favor, selecciona una mesa')
      return
    }
    await addOrder( orderData )
    toast.success('¡Comanda enviada!')
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
            <div className='flex flex-col gap-16'>
              <div>
                <h3 className="row-span-1 text-2xl text-gray500 font-bold mb-4">Cliente</h3>                  
                <div className='grid grid-cols-2 gap-6'>
                  <div className="grid grid-cols-2 col-span-2 gap-6 relative">
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
                  <div className="col-span-1">
                    <TextField placeholder='Nombre' type='text' name='client.fullName' value={clientSelected?.fullName || ''} disabled={ isClientSelected } />
                  </div>
                  <div className="col-span-1">
                    <TextField placeholder='DNI' type='text' name='client.dni' value={clientSelected?.dni || ''} disabled={ isClientSelected } />
                  </div>
                  <div className="col-span-1">
                    <TextField placeholder='Teléfono' type='text' name='client.phone' value={clientSelected?.phone || ''} disabled={ isClientSelected } />
                  </div>
                  <div className="col-span-1">
                    <TextField placeholder='Correo Electrónico' type='text' name='client.email' value={clientSelected?.email || ''} disabled={ isClientSelected } />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl text-gray500 font-bold">Tipo de Órden</h3>
                <ul className="flex flex-wrap gap-4 mt-4">
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

              <div>
                <h3 className="text-2xl text-gray500 font-bold mb-4">Selecciona una Mesa</h3>
                <Tabs selectedIndex={ tabFloorIndex } onSelect={( index ) => {
                    setTabFloorIndex( index )
                    setSelectedFloor( branch?.floors[index].name || null )
                    setSelectedTable( null )
                  }} className="flex flex-col flex-1">
                  <TabList className="border-b border-b-gray50 mb-6 z-[999] flex gap-6 text-base font-500 leading-none text-gray500">
                    { branch?.floors.map(( floor ) => (
                      <Tab key={ floor.id }>{ floor.name }</Tab>
                    ))}
                  </TabList>
                  { branch?.floors.map(( floor, floorIndex ) => (
                    <TabPanel key={floor.id}>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] mt-8">
                        {Array.from({ length: floor.tables }).map((_, tableIndex) => (
                          <div
                            key={tableIndex}
                            className="flex items-center justify-center aspect-square cursor-pointer"
                            onClick={() => setSelectedTable((tableIndex + 1).toString())}
                          >
                            <div className="relative flex items-center justify-center h-24 w-24">
                              <span className={`relative z-20 text-lg font-bold ${selectedTable === (tableIndex + 1).toString() ? 'text-gray50' : ' text-gray600'}`}>
                                {tableIndex + 1}
                              </span>
                              <RestaurantTable className={`absolute z-10 transition-all ${selectedTable === (tableIndex + 1).toString() ? 'fill-gray900' : 'fill-gray50'}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
              </div>

              <div>
                <h3 className="text-2xl text-gray500 font-bold mb-4">Comentarios</h3>
                <TextField typeField='textarea' name='notes' />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={ Variant.GHOST } text="Cancelar" size={ Size.LG } onClick={ ()=> closeModalPage() }/>
            <ReactToPrint
              trigger={() => <Button text='Imprimir Comanda' color={Color.ACCENT} size={Size.LG} variant={Variant.GHOST} />}
              content={() => componentRef.current}
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
      <div style={{ display: 'none' }}>
        <OrderPrint ref={componentRef} orderData={{
          order,
          orderNumber,
          floor: selectedFloor || '',
          table: selectedTable || '',
          total,
          orderType: selectedOrderType,
          notes: '',
          client: clientSelected
        }} />
      </div>
    </ModalPage>
  )
}