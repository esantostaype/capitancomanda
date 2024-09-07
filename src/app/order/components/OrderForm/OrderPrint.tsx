import React, { forwardRef, useMemo } from 'react'
import { OrderItemFull, Client, OrderType, orderTypeTranslations, Category } from '@/interfaces'
import { useRestaurantStore } from '@/store/global-store'

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

  const groupedOrder = useMemo(() => {
    const grouped = orderData.order.reduce((acc, item) => {
      if (!acc[item.category.name]) {
        acc[item.category.name] = {
          category: item.category,
          items: []
        };
      }
      acc[item.category.name].items.push(item);
      return acc;
    }, {} as Record<string, { category: Category, items: OrderItemFull[] }>)
  
    return Object.values(grouped).sort((a, b) => {
      return a.category.orderNumber - b.category.orderNumber
    });
  }, [ orderData.order ])
  
  const { restaurant } = useRestaurantStore()

  return (
    <div ref={ref} className="uppercase leading-[1.125em] font-jetbrains text-base w-[120mm] p-[8mm] text-black">
      <div className="mb-3 text-center">
        <div className="flex justify-between gap-4">
          <div>Restify/@{ restaurant?.name }</div>
          <div>03/09/2024-11:06:32</div>
        </div>
        <h1 className="text-2xl font-extrabold leading-none mt-2 mb-1 flex gap-2 items-center">
          <span className="flex-1 overflow-hidden w-1 text-nowrap text-xs">* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *</span>
          <span>N°{ parseInt( orderData.orderNumber ) }</span>
          <span className="flex-1 overflow-hidden w-1 text-nowrap text-xs">* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *</span>
        </h1>
      </div>
      <div>
        <div className="pb-2 flex justify-between gap-4 leading-tight">
          <div>
            <div>Mozo: <strong>Pedro Ramirez</strong></div>
            <div>Tipo: <strong>{ orderTypeTranslations[ orderData.orderType ] }</strong></div>            
            { orderData.client && (
              <div>
                Cliente: <strong>{ orderData.client.fullName }</strong>
              </div>
            )}
          </div>
          <div className="text-right font-bold">
            <div>Mesa:{ orderData.table }</div>
            <div>{ orderData.floor }</div>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full">
          <tbody className="leading-[1.125em]">
            { groupedOrder.map(({ category, items }) => (
              <>
                <tr>
                  <td colSpan={ 2 }>
                    <div className="font-bold flex gap-2 items-center mt-4 text-lg overflow-hidden max-w-full flex-wrap">
                      <span>{category.name}</span>
                      <span className="flex-1 overflow-hidden w-1 text-nowrap text-xs">* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *</span>
                    </div>
                  </td>
                </tr>
                { items.map(item => (
                  <tr key={ item.id }>
                    <td className="text-xl font-extrabold align-text-top pr-4">
                      <div className="mt-2">{ item.quantity }</div>         
                    </td>
                    <td className="align-text-top">
                      <div className="text-xl font-extrabold mt-2">{ item.name }</div>
                      { item.selectedVariations && (
                        <div>
                          { Object.entries( item.selectedVariations ).map(([ variation, option ]) => (
                            <div key={ variation } className="my-1">{ variation }: <strong className="font-extrabold">{ option }</strong></div>
                          ))}
                        </div>
                      )}
                      { item.selectedAdditionals && Object.entries( item.selectedAdditionals )
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([additionalName, quantity]) => (
                          <div key={ additionalName } className="my-1">
                            <strong className="font-extrabold">{ quantity }<span className="lowercase">x</span> { additionalName }</strong>
                          </div>
                        ))
                      }
                      {
                        item.notes &&
                        <div className="mb-2">
                          Nota: <strong className="font-extrabold">{ item.notes }</strong>
                        </div>
                      }
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        {
          orderData.notes &&
          <div className="border-t border-t-black py-3">
            Nota: <strong className="font-extrabold">{ orderData.notes }</strong>
          </div>
        }
      </div>
    </div>
  )
})

OrderPrint.displayName = 'OrderPrint'
