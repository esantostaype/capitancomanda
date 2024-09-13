'use client'
import { usePathname } from 'next/navigation'
import { useUiStore } from '@/store/ui-store'
import Image from 'next/image'
import Link from 'next/link'

export const OrderHeader = () => {
  
  const pathname = usePathname()
  const { openOrderSummary, closeOrderSummary, activeOrderSummary, closeModal } = useUiStore()

  const handleOpenOrderSummary = () => {
    openOrderSummary()
    closeModal()
  }

  const handleCloseOrderSummary = () => {
    closeOrderSummary()
    closeModal()
  }

  return (
    <header className='fixed bottom-0 md:bottom-auto md:sticky md:top-0 px-4 md:px-6 md:pr-20 xl:pr-6 flex items-center w-full border-t border-t-gray50 md:border-t-0 md:border-b md:border-b-gray50 bg-surface h-16 md:h-14 z-[99999999] md:z-[99]'>
      <div className="flex items-center justify-center md:justify-between gap-4 w-full">
        <nav className="flex items-center w-full md:w-auto">
          <ul className="text-center justify-between text-[9px] md:text-sm flex items-center md:gap-6 uppercase md:font-semibold w-full text-gray600">
            <li className="hidden md:block ">
              <Link href="/order" className="flex justify-center">
                <Image src="/images/logo-restify-light.svg" className="block dark:hidden" width="24" height="24" alt="Capitán Comanda" />
                <Image src="/images/logo-restify-dark.svg" className="hidden dark:block" width="24" height="24" alt="Capitán Comanda" />
              </Link>
            </li>
            <li className={`${ pathname === '/order/tables' && !activeOrderSummary ? "text-accent" : "" } flex-1 md:flex-auto`}>
              <Link href='/order/tables' className="flex flex-col gap-[6px]" onClick={() => closeModal() }>
                <i className="block md:hidden fi fi-rr-apps text-base"></i>
                Mesas
              </Link>
            </li>
            <li className={`${ pathname.startsWith('/order/menu') && !activeOrderSummary ? "text-accent" : "" } flex-1 md:flex-auto`}>
              <Link href='/order/menu' className="flex flex-col gap-[6px]" onClick={() => closeModal() }>
                <i className="block md:hidden fi fi-rr-room-service text-base"></i>
                Menú
              </Link>
            </li>
            <li className="flex-1 md:flex-auto block md:hidden">
              <Link href="/order" className="flex justify-center" onClick={() => closeModal() }>
                <Image src="/images/logo-restify-light.svg" className="block dark:hidden" width="24" height="24" alt="Capitán Comanda" />
                <Image src="/images/logo-restify-dark.svg" className="hidden dark:block" width="24" height="24" alt="Capitán Comanda" />
              </Link>
            </li>
            <li className={`${ pathname === '/order/orders' && !activeOrderSummary ? "text-accent" : "" } flex-1 md:flex-auto`}>
              <Link href='/order/orders' className="flex flex-col gap-[6px]" onClick={() => closeModal() }>
                <i className="block md:hidden fi fi-rr-list text-base"></i>
                Historial
              </Link>
            </li>
            <li className={`${ activeOrderSummary ? "text-accent" : "" } flex-1 md:flex-auto block md:hidden`}>
              <button onClick={ !activeOrderSummary ? handleOpenOrderSummary : handleCloseOrderSummary } className="flex flex-col gap-[6px] items-center uppercase text-center w-full">
                <i className="fi-rr-shopping-bag text-base"></i>
                Órden
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