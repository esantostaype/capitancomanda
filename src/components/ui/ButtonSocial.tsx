'use client'
import Image from 'next/image'
import styles from './ButtonSocial.module.css'

interface Props {
  text?: string
  icon?: string
  onClick?: any
}

export const ButtonSocial = ({ text, icon, onClick }: Props) => {

	return (
    <button className={ styles.socialButton } onClick={ onClick }>
      <Image src={ `/images/${ icon }.svg` } width="16" height="16" alt={ `Social Media ${ text }` } />
      { text }
    </button>
	)
}