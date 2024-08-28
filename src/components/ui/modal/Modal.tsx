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
  
  const { activeClassModal, activeModal, openModal, closeModal } = useUiStore()
  
  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' && withBackRoute && activeModal ) {
        closeModal( withBackRoute && activeModal )
      } else if( event.key === 'Escape' ) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModal, closeModal, withBackRoute])

  useEffect(() => {  
    if ( isOpen ) {
      openModal()
    }
  }, [ isOpen, openModal ])

  
  let sizeClass = ""

  switch ( size ) {
    case Size.XS:
      sizeClass = "max-w-xs"
      break
    case Size.SM:
      sizeClass = "max-w-sm"
      break
    case Size.MD:
      sizeClass = "max-w-md"
      break
    case Size.LG:
      sizeClass = "max-w-lg"
      break
    case Size.XL:
      sizeClass = "max-w-xl"
      break
    case Size._2XL:
      sizeClass = "max-w-2xl"
      break
    case Size._3XL:
      sizeClass = "max-w-3xl"
      break
    case Size._4XL:
      sizeClass = "max-w-4xl"
      break
    case Size._5XL:
      sizeClass = "max-w-5xl"
      break
    case Size._6XL:
      sizeClass = "max-w-6xl"
      break
    case Size._7XL:
      sizeClass = "max-w-7xl"
      break
    default:
      sizeClass = ""
      break
  }
  
  return (
    <>
    {
      ( isOpen ) && (
        <section className={`${ activeClassModal ? "pointer-events-auto" : "pointer-events-none" } flex items-center justify-center fixed h-screen w-full top-0 left-0 z-[9999] py-8`}>
          <div className={`${ activeClassModal ? "animate-enterModal" : "animate-leaveModal bottom-[-20px] opacity-0" } bg-surface flex-1 ${ sizeClass } flex flex-col rounded-xl relative z-[9999] bottom-auto max-h-[90vh] overflow-hidden`}>
            <div className="absolute top-4 right-4 z-30">
              <IconButton onClick={ ()=> closeModal( withBackRoute ) } iconName='cross-small' variant={ Variant.GHOST } />
            </div>
            <div className="py-6 px-8 border-b border-b-gray50 sticky top-0">                
              {
                !title && isEditMode
                ? <Skeleton animation="wave" variant="rounded" width={ 200 } height={ 26 } className="bg-gray50" />
                : <h1 className="text-xl font-semibold">{ title }</h1>
              }
            </div>
            { children }
          </div>
          <ModalBackground onClick={ ()=> closeModal( withBackRoute ) } active={ activeClassModal } />
        </section>
      )
  }
  </>
  )
}