'use client'
import styles from './Button.module.css'
import Link from 'next/link'

interface Props {
  text?: string
  mode?: 'primary' | 'success' | 'info' | 'warning' | 'error'
  iconName?: string
  size?: 'small' | 'normal' | 'large'
  full?: boolean
  ghost?: boolean
  onClick?: any
  disabled?: boolean
  submit?: boolean
  href?: string | '#'
  div?: boolean
}

export const Button = ({ text, mode, size, iconName, full, ghost, onClick, disabled, submit, href, div }: Props) => {

  let buttonClass = styles.button

  switch ( mode ) {
    case 'primary':
      buttonClass = `${ styles.button } ${ styles.primary }`
      break
    case 'success':
      buttonClass = `${ styles.button } ${ styles.success }`
      break
    case 'info':
      buttonClass = `${ styles.button } ${ styles.info }`
      break
    case 'warning':
      buttonClass = `${ styles.button } ${ styles.warning }`
      break
    case 'error':
      buttonClass = `${ styles.button } ${ styles.error }`
      break
    default:
      buttonClass = `${ styles.button }`
      break
  }

  { size === 'small' && ( buttonClass += ` ${ styles.small }` ) }
  { size === 'large' && ( buttonClass += ` ${ styles.large }` ) }
  { iconName && !text && ( buttonClass += ` ${ styles.iconOnly }`) }
  { full && ( buttonClass += ` ${ styles.full }`) }
  { ghost && ( buttonClass += ` ${ styles.ghost }`) }

  const buttonType = submit ? 'submit' : 'button'

	return (
    <>
    { href ? (
      <Link href={ href } className={ buttonClass } onClick={ onClick }>
        { iconName && <i className={`fi fi-rr-${iconName}`}></i>}
        { text }
      </Link>
    ): ( div ? (
      <div className={ buttonClass }>
        { iconName && <i className={`fi fi-rr-${iconName}`}></i>}
        { text }
      </div>
    ) : (
      <button className={ buttonClass } onClick={ onClick } disabled={ disabled } type={ buttonType }>
        { iconName && <i className={`fi fi-rr-${iconName}`}></i>}
        { text }
      </button>
    )
      
    )}      
    </>
	)
}