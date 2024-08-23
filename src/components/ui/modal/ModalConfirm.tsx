'use client'
import { useUiStore } from '@/store/ui-store'
import { useEffect } from 'react'
import { IconButton, ModalBackground } from '@/components'
import { Button } from '@/components'
import { Color, Variant } from '@/interfaces'

interface Props {
  title: string
  detail?: string
  buttonConfirmText: string
  onClickConfirm: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
  onClickCancel: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
}


export const ModalConfirm = ({ title, detail, buttonConfirmText, onClickConfirm, onClickCancel }: Props ) => {
  
  const { activeClassModalConfirm, closeModalConfirm } = useUiStore()
  
  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' ) {
        closeModalConfirm()
      }
    }
    window.addEventListener('keydown', handleKeyDown )
    return () => {
      window.removeEventListener('keydown', handleKeyDown )
    }
  }, [ closeModalConfirm ])
  
  return (
    <section className={`${ activeClassModalConfirm ? "pointer-events-auto" : "pointer-events-none" } flex items-center justify-center fixed h-screen w-full top-0 left-0 z-[9999] overflow-y-auto py-8`}>
      <div className={`${ activeClassModalConfirm ? "animate-enterModal" : "animate-leaveModal bottom-[-20px] opacity-0" } p-8 bg-surface flex-1 max-w-lg flex flex-col rounded-xl relative z-[9999] bottom-0`}>
        <div className="absolute top-4 right-4">
          <IconButton onClick={ ()=> closeModalConfirm() } iconName='cross-small'/>
        </div>
        <div className="text-center flex flex-col gap-4 items-center">
          <div className='relative h-16 w-16 flex items-center justify-center text-2xl rounded-full overflow-hidden'>
            <i className="fi fi-rr-trash z-20 relative"></i>
            <div className="opacity-20 bg-error absolute top-0 left-0 w-full h-full z-10"></div>
          </div>
          <h3 className="text-lg font-semibold">{ title }</h3>
          <p>{ detail }</p>
          <div className="flex gap-4 justify-center">
            <Button text='Cancelar' variant={ Variant.CONTAINED } onClick={ onClickCancel } />
            <Button text={ buttonConfirmText } variant={ Variant.CONTAINED } color={ Color.ERROR } onClick={ onClickConfirm } />
          </div>
        </div>
      </div>
      <ModalBackground onClick={ ()=> closeModalConfirm() } active={ activeClassModalConfirm } />
    </section>
  )
}