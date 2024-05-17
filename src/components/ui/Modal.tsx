'use client'
import styles from './Modal.module.css'
import { useAdminStore } from '@/store/admin-store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

interface Props {
  children: React.ReactNode
  title: string
  backText?: string
}


export const Modal = ({ children, title, backText }: Props ) => {

  const router = useRouter()
  
  const { openModal, setOpenModal } = useAdminStore()
  const handleCloseModal = () => {
    setOpenModal( false )
    setTimeout(() => {
      router.back()
    }, 500)
  }
  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' ) {
        setOpenModal( false )
      }
    }
    window.addEventListener('keydown', handleKeyDown )
    return () => {
      window.removeEventListener('keydown', handleKeyDown )
    }
  }, [])
  
  return (
    <section className={ openModal ? `${ styles.wrappper } ${ styles.active }` : `${ styles.wrappper }` }>
      <div className={ styles.content }>
        <div className={ styles.header }>
          <div className={ styles.header__back }>
            <Button iconName='arrow-left' mode='primary' size='large' ghost  onClick={ ()=> handleCloseModal() }/>
          </div>
          <div className={ styles.header__caption }>
            <span className={ styles.header__backText }>{ backText }</span>
            <h1 className={ styles.title }>{ title }</h1>
          </div>
        </div>
        { children }
      </div>
      <div className={ styles.background } onClick={ ()=> handleCloseModal() }></div>
    </section>
  )
}