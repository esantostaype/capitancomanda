import React, { forwardRef } from 'react'
import { OrderItemFull, Client, OrderType, orderTypeTranslations } from '@/interfaces'
import { useRestaurantStore } from '@/store/global-store'
import Image from 'next/image';

interface OrderPrintProps {
  orderData: {
    orderNumber: string
    order: OrderItemFull[]
    floor: string
    table: string
    total: number
    orderType: OrderType
    notes: string
    client?: Client | null
  }
}

export const OrderPrint = forwardRef<HTMLDivElement, OrderPrintProps>(({ orderData }, ref) => {
  
  const { restaurant } = useRestaurantStore()

  return (
    <div ref={ref} className="text-base w-[120mm] p-[8mm] text-black">
      <div className="mb-4 text-center">        
        <h2 className="leading-none text-gray600">Restify/@{ restaurant?.name }</h2>
        <h1 className="text-2xl font-bold leading-none mt-1 mb-2">Comanda #{ parseInt( orderData.orderNumber ) }</h1>
      </div>
      <div className="border-t border-t-black border-b border-b-black">
        <div className="flex justify-between items-center py-2">
          <div>
            <p>Fecha: 03/09/2024</p>
            <p>Hora: 11:06:32</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl leading-none">Mesa: { orderData.table }</div>
            <div>{ orderData.floor }</div>
          </div>
        </div>
        <div className="uppercase py-2 px-4 font-bold text-center border-t border-t-black leading-none">
          { orderTypeTranslations[ orderData.orderType ] }
        </div>
      </div>
      { orderData.client && (
        <div>
          <p><strong>Cliente:</strong> { orderData.client.fullName }</p>
        </div>
      )}
      <ul>
        { orderData.order.map(item => (
          <li key={ item.id }>
            { item.name} - { item.quantity } x ${ item.price.toFixed(2) }
          </li>
        ))}
      </ul>
    </div>
  )
})

OrderPrint.displayName = 'OrderPrint'
