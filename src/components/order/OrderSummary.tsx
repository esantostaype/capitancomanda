'use client'
import { useEffect, useMemo, useState } from 'react'
import { useOrderStore } from '@/store/order-store'
import { IconButton, OrderForm, OrderSummaryItem } from '@/components'
import { formatCurrency } from '@/utils'
import { Button } from '@/components'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Color, IconButtonShape, Size, Variant } from '@/interfaces'
import { useUiStore } from '@/store/ui-store'

export const OrderSummary = () => {
  
  const order = useOrderStore(( state ) => state.order )
  const setOrder = useOrderStore((state) => state.setOrder)
  const clearOrder = useOrderStore(( state ) => state.clearOrder )
  const total = useMemo(() => order.reduce(( total, item ) => total + ( item.quantity * item.price ), 0), [ order ])
  const { openModalPage } = useUiStore()

  const subtotal = total / 1.18
  const igv = total - subtotal

  useEffect(() => {
    const storedOrder = localStorage.getItem('order')
    if ( storedOrder ) {
      const parsedOrder = JSON.parse( storedOrder )
      setOrder( parsedOrder )
    }
  }, [ setOrder ])

  const [ listRef ] = useAutoAnimate()

  return (
    <div className="flex flex-col relative bg-surface border-l border-l-gray50 flex-[0_0_20rem] h-screen overflow-y-auto">
      { order.length === 0
        ? (
        <div className="w-full flex-1 flex items-center justify-center text-base text-gray500">
          <div className="text-center">
            <i className="fi fi-rr-empty-set text-3xl"></i>
            <h3>La Comanda está Vacía</h3>
          </div>
        </div>
        )
        : (
        <>
        <div className="bg-surface border-b border-b-gray50 p-6 pb-2 sticky top-0 z-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Orden</h3>
          </div>
          <div className="flex justify-between items-center font-bold">
            <div>Item</div>
            <div>Subtotal</div>
          </div>
        </div>
        <div className="flex-1 relative z-10 px-6">
          <ul className="flex flex-col" ref={ listRef }>
            { order.map( item => (
              <OrderSummaryItem key={ item.uniqueId } item={ item } />
            ))}
          </ul>
        </div>
        <div className="sticky bottom-0 bg-surface z-20">
          <div className="py-4 px-6 border-t border-b border-gray50">
            <table className="w-full text-gray600">
              <tr>
                <td>Subtotal:</td>
                <td className="text-right text-foreground font-semibold">{ formatCurrency( subtotal ) }</td>
              </tr>
              <tr>
                <td>IGV:</td>
                <td className="text-right text-foreground font-semibold">{ formatCurrency( igv ) }</td>
              </tr>
              <tr>
                <td className="pt-2">Total:</td>
                <td className="text-accent text-right pt-2 font-semibold">{ formatCurrency( total ) }</td>
              </tr>
            </table>
          </div>
          <div className='flex gap-4 p-6'>
            <IconButton iconName='trash' color={ Color.ERROR } variant={ Variant.GHOST } size={ Size.LG } shape={ IconButtonShape.SQUARE } onClick={ () => clearOrder() } />
            <Button
              text='Continuar'
              color={ Color.ACCENT }
              size={ Size.LG }
              variant={ Variant.CONTAINED }
              onClick={ () => openModalPage() }
              full
            />
          </div>
        </div>
        </>
        )
      }
    </div>
  );
}