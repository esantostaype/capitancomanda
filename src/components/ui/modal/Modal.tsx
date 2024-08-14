'use client'
import { useUiStore } from '@/store/ui-store'
import { useEffect } from 'react'
import { IconButton, ModalBackground } from '@/components'

interface Props {
  children: React.ReactNode
  title?: string
  size?: 'small' | 'normal' | 'large'
  withBackRoute?: boolean
}


export const Modal = ({ children, title, withBackRoute }: Props ) => {
  
  const { activeClassModal, closeModal } = useUiStore()
  
  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' ) {
        closeModal( withBackRoute )
      }
    }
    window.addEventListener('keydown', handleKeyDown )
    return () => {
      window.removeEventListener('keydown', handleKeyDown )
    }
  }, [ closeModal, withBackRoute ])
  
  return (
    <section className={`${ activeClassModal ? "pointer-events-auto" : "pointer-events-none" } flex items-center justify-center fixed h-screen w-full top-0 left-0 z-[9999] overflow-y-auto py-8`}>
      <div className={`${ activeClassModal ? "animate-enterModal" : "animate-leaveModal bottom-[-20px] opacity-0" } bg-surface flex-1 max-w-lg flex flex-col rounded-xl relative z-[9999] bottom-0`}>
        <div className="absolute top-4 right-4">
          <IconButton onClick={ ()=> closeModal( withBackRoute ) } iconName='cross-small'/>
        </div>
        {
          title &&
          <div className="py-6 px-8 border-b border-b-gray50">
            <h2 className="text-xl font-semibold">{ title }</h2>
          </div>
        }
        { children }
      </div>
      <ModalBackground onClick={ ()=> closeModal( withBackRoute ) } active={ activeClassModal } />
    </section>
  )
}