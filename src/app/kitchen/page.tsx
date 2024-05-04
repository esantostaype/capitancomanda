'use client'
import useSWR from 'swr'
import { Comanda } from '@/components'
import ComandaSlider from '@/components/kitchen/ComandaSlider'
import Image from 'next/image'
import { OrderWithProducts } from '@/types'
import { useEffect } from 'react'
import { apiUrl, createNotificationSound } from '@/utils'

export default function KitchenPage() {

  const notificationSound = createNotificationSound()
  
  const receivedUrl = `${ apiUrl }/orders/received`
  const preparationUrl = `${ apiUrl }/orders/in-preparation`

  const fetcherReceived = () => fetch( receivedUrl ).then( res => res.json() ).then( data => data )

  const { data: receivedData, isLoading: receivedLoading } = useSWR<OrderWithProducts[]>(
    receivedUrl,
    fetcherReceived,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  const fetcherPreparation = () => fetch( preparationUrl ).then( res => res.json() ).then( data => data )

  const { data: preparationData, isLoading: preparationLoading } = useSWR<OrderWithProducts[]>(
    preparationUrl,
    fetcherPreparation,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  useEffect(() => {
    if ( notificationSound && receivedData && receivedData.length > 0 ) {
      const hasNewReceivedOrder = receivedData.some((order) => order.status === 'Recibida')
      if ( hasNewReceivedOrder ) {
        notificationSound.play()
      }
    }
  }, [ notificationSound, receivedData ])

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
                    <Comanda key={ order.id } order={ order } status='ready' textButton='Listo' className='inPreparation' />
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