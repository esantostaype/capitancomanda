'use client'
import useSWR from 'swr'
import { Comanda } from '@/components'
import ComandaSlider from '@/components/kitchen/ComandaSlider'
import Image from 'next/image'
import { OrderWithProducts } from '@/types'
import { useEffect } from 'react'
import { createNotificationSound } from '@/utils'

export default function KitchenPage() {

  const notificationSound = createNotificationSound()
  
  const receivedUrl = '/api/orders/received'
  const preparationUrl = '/api/orders/in-preparation'

  const fetcherReceived = () => fetch( receivedUrl ).then( res => res.json() ).then( data => data )

  const { data: receivedData, error: receivedError, isLoading: receivedLoading } = useSWR<OrderWithProducts[]>(
    receivedUrl,
    fetcherReceived,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  const fetcherPreparation = () => fetch( preparationUrl ).then( res => res.json() ).then( data => data )

  const { data: preparationData, error: preparationError, isLoading: preparationLoading } = useSWR<OrderWithProducts[]>(
    preparationUrl,
    fetcherPreparation,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  useEffect(() => {
    if ( receivedData && receivedData.length > 0 ) {
      const hasNewReceivedOrder = receivedData.some(( order ) => order.status === 'Recibida');
      if ( hasNewReceivedOrder ) {
        notificationSound.play();
      }
    }
  }, [ receivedData ]);

  return (
    <section className="kitchen">
      <div className="kitchen__logo">
        <Image src="/images/logo.svg" width="64" height="64" alt="Capitán Comanda" />
      </div>
      <section className="kitchen__content">
        <section className='kitchen__in-preparation'>
          <h3 className='kitchen__title'>En Preparación</h3>
          { preparationLoading ? ( "Cargando..." ):
            (
              preparationData && (
                <ul className='kitchen__list'>
                {
                  preparationData.map(( order ) => (
                    <Comanda key={ order.id } order={ order } className='inPreparation' />
                  ))
                }
                </ul>
              )
            )
          }
          
          
        </section>
        <section className='kitchen__received'>
          <h3 className='kitchen__title'>Recibidas</h3>
          { receivedLoading ? ( "Cargando..." ):
            (
              receivedData && (
                <ComandaSlider orders={ receivedData } />
              )
            )
          }
          
        </section>
      </section>
    </section>
  )
}