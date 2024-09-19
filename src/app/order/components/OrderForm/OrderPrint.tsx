import React, { forwardRef, useMemo } from 'react'
import { OrderItemFull, Client, OrderType, orderTypeTranslations, Category } from '@/interfaces'
import { useRestaurantStore } from '@/store/global-store'

interface Props {
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

export const OrderPrint = forwardRef<HTMLDivElement, Props>(({ orderData }, ref) => {

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
    <div ref={ref} className="uppercase leading-[1.125em] text-lg w-[105mm] text-black">
      <div className="mb-3 text-center">
        <div>
          03/09/2024 - 11:06:32
        </div>
        <h1 className="text-2xl font-bold leading-none mt-2 mb-1 flex gap-2 items-center">
          <span className="flex-1 font-normal text-base overflow-hidden w-1 text-nowrap"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
          <span>N°{ parseInt( orderData.orderNumber ) }</span>
          <span className="flex-1 font-normal text-base overflow-hidden w-1 text-nowrap"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
        </h1>
      </div>
      <div>
        <div className="pb-2 flex justify-between gap-4 leading-tight">
          <div>
            <div>Mozo: <span className="font-semibold">Pedro Ramirez</span></div>
            <div>Tipo: <span className="font-semibold">{ orderTypeTranslations[ orderData.orderType ] }</span></div>            
            { orderData.client && (
              <div>
                Cliente: <span>Juan Pérez</span>
              </div>
            )}
          </div>
          <div className="text-right font-semibold">
            <div>Mesa: 3</div>
            <div>Terraza</div>
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
                    <div className="font-semibold flex gap-2 items-center mt-8 text-base overflow-hidden max-w-full flex-wrap">
                      <span>{category.name}</span>
                      <span className="flex-1 overflow-hidden w-1 text-nowrap text-base"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
                    </div>
                  </td>
                </tr>
                { items.map(item => (
                  <tr key={ item.id }>
                    <td className="text-2xl font-bold align-text-top pr-4">
                      <div className="leading-[1.1em] mt-3">{ item.quantity }x</div>         
                    </td>
                    <td className="align-text-top text-xl">
                      <div className="leading-[1.1em] text-2xl font-bold mt-3">{ item.name }</div>
                      { item.selectedVariations && (
                        <div>
                          { Object.entries( item.selectedVariations ).map(([ variation, option ]) => (
                            <div key={ variation } className="my-1">{ variation }: <span className="font-bold">{ option }</span></div>
                          ))}
                        </div>
                      )}
                      { item.selectedAdditionals && Object.entries( item.selectedAdditionals )
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([additionalName, quantity]) => (
                          <div key={ additionalName } className="my-1">
                            <span className="font-bold">{ quantity }<span className="lowercase">x</span> { additionalName }</span>
                          </div>
                        ))
                      }
                      {
                        item.notes &&
                        <div className="mb-2">
                          Nota: <span className="font-semibold">{ item.notes }</span>
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
            Nota: <span className="font-semibold">{ orderData.notes }</span>
          </div>
        }
      </div>
    </div>
  )
})

OrderPrint.displayName = 'OrderPrint'
