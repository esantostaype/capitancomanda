'use client'
import styles from './AdminHeader.module.css'

type Props = {
  title: string
}

export const AdminHeader = ({ title }: Props ) => {

  return (
    <header className={ styles.content }>
      <h1 className={ styles.title }>{ title }</h1>
    </header>
  )
}