'use client'
import useSWR from 'swr'
import { OrderWithProducts } from '@/types'
import { useEffect, useState } from 'react'
import { getSpicyLevelText, createNotificationSound } from '@/utils'

export const ReadyOrders = () => {

  const notificationSound = createNotificationSound()
  
  const url = '/api/orders/ready'

  const fetcher = () => fetch( url ).then( res => res.json() ).then( data => data )

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  const [ lastOrder, setLastOrder ] = useState<OrderWithProducts | null>(null)

  useEffect(() => {
    if ( data && data.length > 0 ) {
      const latestOrder = data[0]
      setLastOrder( latestOrder )

      const timerId = setTimeout(() => {
        setLastOrder( null )
      }, 5000)

      return () => {
        clearTimeout( timerId )
      }
    }
  }, [ data ])

  const handleConfirm = () => {
    setLastOrder( null )
  }

  useEffect(() => {
    if ( lastOrder && lastOrder.status === 'Lista' ) {
      notificationSound.play()
    }
  }, [ lastOrder ])

  return (
    <section className="ready">
      <div className="ready__content">
        {data && (
          <ul className="ready__list">
            {data.map((order) => (
              <li
                key={order.id}
              >
                <h2>Mesa # {order.table}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>     
      {
        lastOrder && (
          <div className="ready-order active">
            <div className="ready-order__content">
              <div className="ready-order__icon"><i className="fi fi-rr-concierge-bell"></i></div>
              <h3 className="ready-order__title">¡La Órden de la Mesa # { lastOrder.table } está lista!</h3>
            </div>
            <div className="ready-order__summary">
              <strong>Resumen:</strong><br/>
              {
                lastOrder.orderProducts.map(( item ) => (
                  <span key={ item.id }>
                    ({`x${item.quantity}`}) {item.product.name} <span>{ getSpicyLevelText( item.spicyLevelNumber! )}</span>
                    <br/>
                  </span>
                ))
              }
            </div>
            <button className="button ghost-button" onClick={handleConfirm}>Finalizar</button>
          </div>
        )
      }
    </section>
  )
}