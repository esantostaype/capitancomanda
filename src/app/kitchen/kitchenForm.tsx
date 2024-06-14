'use client'
import useSWR from 'swr'
import { Comanda, ToastNotification } from '@/components'
import ComandaSlider from '@/components/kitchen/ComandaSlider'
import Image from 'next/image'
import { OrderWithProducts } from '@/interfaces'
import { apiUrl } from '@/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

type Props = {
  token: string
}

export default function KitchenForm({ token }: Props) {
  
  const receivedUrl = `${ apiUrl }/orders/received`
  const preparationUrl = `${ apiUrl }/orders/in-preparation`

  const fetcherReceived = () => fetch( receivedUrl,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  ).then( res => res.json() ).then( data => data )

  const { data: receivedData, isLoading: receivedLoading } = useSWR<OrderWithProducts[]>(
    receivedUrl,
    fetcherReceived,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  const fetcherPreparation = () => fetch( preparationUrl,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  ).then( res => res.json() ).then( data => data )

  const { data: preparationData, isLoading: preparationLoading } = useSWR<OrderWithProducts[]>(
    preparationUrl,
    fetcherPreparation,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false
    }
  )

  const [ listRef ] = useAutoAnimate()

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
                <ul className='kitchen__list' ref={ listRef }>
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
      <ToastNotification/>
    </section>
  )
}