'use client'
import styles from './Modal.module.css'
import { useUiStore } from '@/store/ui-store'
import { useEffect } from 'react'
import { Button } from './Button'

interface Props {
  children: React.ReactNode
  title?: string
  backText?: string
  size?: 'small' | 'normal' | 'large'
  withBackRoute?: boolean
}


export const Modal = ({ children, title, backText, size, withBackRoute }: Props ) => {
  
  const { activeClassModal, closeModal } = useUiStore()

  let modalClass = styles.wrappper
  { size === 'small' && ( modalClass += ` ${ styles.small }` ) }
  { size === 'large' && ( modalClass += ` ${ styles.large }` ) }
  
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
    <section className={ activeClassModal ? `${ modalClass } ${ styles.active }` : modalClass }>
      <div className={ styles.content }>
        <div className={ styles.close }>
          <Button onClick={ ()=> closeModal( withBackRoute ) } mode='withoutBg' iconName='cross-small'/>
        </div>
        {
          title &&
          <div className={ styles.header }>
            <div className={ styles.header__caption }>
              <span className={ styles.header__backText }>{ backText }</span>
              <h2 className={ styles.title }>{ title }</h2>
            </div>
          </div>
        }
        <div className={ styles.body }>
          { children }
        </div>
      </div>
      <div className={ styles.background } onClick={ ()=> closeModal( withBackRoute ) }></div>
    </section>
  )
}