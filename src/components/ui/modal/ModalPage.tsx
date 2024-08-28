'use client'
import { useUiStore } from '@/store/ui-store'
import { IconButton, ModalBackground } from '@/components'
import { Color, Size, Variant } from '@/interfaces'
import { useEffect } from 'react'
import { Skeleton } from '@mui/material'

interface Props {
  children: React.ReactNode
  title: string
  backText?: string
  path?: string
  withBackRoute?: boolean
  withTabs?: boolean
  isOpen?: boolean
  isEditMode?: boolean
}

export const ModalPage = ({ children, title, backText, withBackRoute, withTabs, isOpen, isEditMode }: Props ) => {
  
  const { activeClassModalPage, openModalPage, closeModalPage } = useUiStore()

  // useEffect(() => {
  //   const handleKeyDown = ( event: KeyboardEvent ) => {
  //     if ( event.key === 'Escape' ) {
  //       closeModalPage(withBackRoute)
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyDown )
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown )
  //   }
  // }, [closeModalPage, openModalPage, withBackRoute])

  
  
  useEffect(() => {  
    if ( isOpen ) {
      openModalPage()
    }
  }, [ isOpen, openModalPage ])
  
  return (
    <>
    {
      ( isOpen ) && (
        <section className={ activeClassModalPage ? "pointer-events-auto" : "pointer-events-none" }>
          <div className={`${ activeClassModalPage ? "animate-enterModalPage" : "animate-leaveModalPage right-[-100%]" } bg-surface fixed overflow-hidden top-0 right-0 w-1/2 z-[9999] flex flex-col mt-6 h-[calc(100vh-1.5rem)] border-t border-l border-gray50 rounded-tl-2xl`}>
            <div className={`flex items-center gap-4 p-8 border-b border-gray50 ${ withTabs ? "pb-16" : "" } `}>
              <IconButton iconName='arrow-left' color={ Color.ACCENT } size={ Size.LG } variant={ Variant.GHOST } onClick={ ()=> closeModalPage( withBackRoute ) }/>
              <div>
                <span className="text-gray600">{ backText }</span>                
                {
                  !title && isEditMode
                  ? <div className="mt-1"><Skeleton animation="wave" variant="rounded" width={ 320 } height={ 32 } className="bg-gray50" /></div>
                  : <h1 className="text-3xl font-semibold">{ title }</h1>
                }
              </div>
            </div>
            { children }
          </div>
          <ModalBackground onClick={ ()=> closeModalPage( withBackRoute ) } active={ activeClassModalPage } />
        </section>
      )
    }
    </>
  )
}