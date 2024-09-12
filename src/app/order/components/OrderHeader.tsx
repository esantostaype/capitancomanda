'use client'
import { useUiStore } from '@/store/ui-store'
import { setSession } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export const OrderHeader = () => {

  const { openOrderSummary, closeOrderSummary, activeOrderSummary } = useUiStore()

  return (
    <header className='fixed bottom-0 md:bottom-auto md:sticky md:top-0 px-4 md:px-6 md:pr-20 xl:pr-6 flex items-center w-full border-t border-t-gray50 md:border-t-0 md:border-b md:border-b-gray50 bg-surface h-14 z-[99999999] md:z-[9999]'>
      <div className="flex items-center justify-center md:justify-between gap-4 w-full">
        <nav className="flex items-center w-full md:w-auto">
          <ul className="text-center justify-between text-[9px] md:text-sm flex items-center md:gap-6 uppercase md:font-semibold w-full">
            <li className="hidden md:block ">                
              <Link href="/order" className="flex justify-center">
                <Image src="/images/logo-restify.svg" width="24" height="24" alt="Capitán Comanda" />
              </Link>
            </li>
            <li className="flex-1 md:flex-auto">
              <Link href='/order/tables' className="flex flex-col gap-1">
                <i className="block md:hidden fi fi-rr-apps text-sm"></i>
                Mesas
              </Link>
            </li>
            <li className="flex-1 md:flex-auto">
              <Link href='/order/menu' className="flex flex-col gap-1">
                <i className="block md:hidden fi fi-rr-room-service text-sm"></i>
                Menú
              </Link>
            </li>
            <li className="flex-1 md:flex-auto block md:hidden ">                
              <Link href="/order" className="flex justify-center">
                <Image src="/images/logo-restify.svg" width="24" height="24" alt="Capitán Comanda" />
              </Link>
            </li>
            <li className="flex-1 md:flex-auto">
              <Link href='/order/orders' className="flex flex-col gap-1">
                <i className="block md:hidden fi fi-rr-apps text-sm"></i>
                Historial
              </Link>
            </li>
            <li className="flex-1 md:flex-auto block md:hidden ">
              <button onClick={ !activeOrderSummary ? openOrderSummary : closeOrderSummary } className="flex flex-col gap-1 items-center uppercase">
                <i className="fi-rr-shopping-bag text-sm"></i>
                Comanda
              </button>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block">
          Meser@: <strong></strong>
        </div>
      </div>
    </header>
  )
}