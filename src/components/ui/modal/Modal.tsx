'use client'
import { useUiStore } from '@/store/ui-store'
import { useEffect } from 'react'
import { IconButton, ModalBackground } from '@/components'
import { Size, Variant } from '@/interfaces'
import { Skeleton } from '@mui/material'

interface Props {
  children: React.ReactNode
  title?: React.ReactNode
  size?: Size
  withBackRoute?: boolean
  isOpen?: boolean
  isEditMode?: boolean
}


export const Modal = ({ children, title, size, withBackRoute, isOpen, isEditMode }: Props ) => {
  
  const { activeClassModal, activeModal, activeModalById, openModal, closeModal } = useUiStore()
  
  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' && withBackRoute && activeModal ) {
        closeModal( true )
      } else if( event.key === 'Escape' ) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [ closeModal, activeModal, withBackRoute ])

  useEffect(() => {  
    if ( isOpen ) {
      openModal()
    }
  }, [ isOpen, openModal ])

  
  let sizeClass = ""

  switch ( size ) {
    case Size.XS:
      sizeClass = "w-full sm:max-w-xs sm:rounded-xl"
      break
    case Size.SM:
      sizeClass = "w-full sm:max-w-sm sm:rounded-xl"
      break
    case Size.MD:
      sizeClass = "w-full sm:max-w-md sm:rounded-xl"
      break
    case Size.LG:
      sizeClass = "w-full sm:max-w-lg sm:rounded-xl"
      break
    case Size.XL:
      sizeClass = "w-full sm:max-w-xl sm:rounded-xl"
      break
    case Size._2XL:
      sizeClass = "w-full md:max-w-2xl md:rounded-xl"
      break
    case Size._3XL:
      sizeClass = "w-full lg:max-w-3xl lg:rounded-xl"
      break
    case Size._4XL:
      sizeClass = "w-full lg:max-w-4xl lg:rounded-xl"
      break
    case Size._5XL:
      sizeClass = "w-full xl:max-w-5xl xl:rounded-xl"
      break
    case Size._6XL:
      sizeClass = "w-full xl:max-w-6xl xl:rounded-xl"
      break
    case Size._7XL:
      sizeClass = "w-full 2xl:max-w-7xl 2xl:rounded-xl"
      break
    default:
      sizeClass = "w-full sm:max-w-xl sm:rounded-xl"
      break
  }
  
  return (
    <>
    {
      ( isOpen ) && (
        <section className={`${ activeClassModal ? "pointer-events-auto" : "pointer-events-none" } flex flex-col items-center justify-center fixed h-vdh w-full top-0 left-0 z-[9999]`}>
          <div className={`${ activeClassModal ? "animate-enterModal" : "animate-leaveModal bottom-[-20px] opacity-0" } bg-surface flex flex-col flex-1 ${ sizeClass } flex flex-col relative z-[9999] bottom-auto h-vdh max-h-vdh md:h-auto md:max-h-[90vdh] overflow-hidden`}>
            <div className="hidden md:block absolute md:top-3 xl:top-4 right-4 z-30">
              <IconButton onClick={ ()=> closeModal( withBackRoute ) } iconName='cross-small' variant={ Variant.GHOST } />
            </div>
            {
              !title && isEditMode
              ? <div className="py-6 px-8 border-b border-b-gray50 sticky top-0">
                  <Skeleton animation="wave" variant="rounded" width={ 200 } height={ 26 } className="bg-gray50" />
                </div>
              : title && <div className="py-6 px-8 border-b border-b-gray50 sticky top-0">
                  <h1 className="text-xl font-semibold">{ title }</h1>
                </div>
            }
            { children }
          </div>
          <ModalBackground onClick={ ()=> closeModal( withBackRoute ) } active={ activeClassModal } />
        </section>
      )
  }
  </>
  )
}