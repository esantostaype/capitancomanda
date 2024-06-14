'use client'
import styles from './ModalPage.module.css'
import { useUiStore } from '@/store/ui-store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

interface Props {
  children: React.ReactNode
  title: string
  backText?: string
  path?: string
  withBackRoute?: boolean
}


export const ModalPage = ({ children, title, backText, withBackRoute }: Props ) => {

  const router = useRouter()
  
  const { activeClassModalPage, closeModalPage } = useUiStore()
  // useEffect(() => {
  //   const handleKeyDown = ( event: KeyboardEvent ) => {
  //     if ( event.key === 'Escape' ) {
  //       setOpenModalPage( false )
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyDown )
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown )
  //   }
  // }, [ setOpenModalPage ])
  
  return (
    <section className={ activeClassModalPage ? `${ styles.wrappper } ${ styles.active }` : `${ styles.wrappper }` }>
      <div className={ styles.content }>
        <div className={ styles.header }>
          <div className={ styles.header__back }>
            <Button iconName='arrow-left' mode='primary' size='large' ghost onClick={ ()=> closeModalPage( withBackRoute ) }/>
          </div>
          <div className={ styles.header__caption }>
            <span className={ styles.header__backText }>{ backText }</span>
            <h1 className={ styles.title }>{ title }</h1>
          </div>
        </div>
        <div className={ styles.body }>
          { children }
        </div>
      </div>
      <div className={ styles.background } onClick={ ()=> closeModalPage( withBackRoute ) }></div>
    </section>
  )
}