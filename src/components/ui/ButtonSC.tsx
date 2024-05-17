'use client'
import Link from 'next/link'
import styled, { css } from 'styled-components'

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

const baseButtonStyles = css`
  background-color: grey;
  align-items: center;
  color: #000;
  cursor: pointer;
  display: flex;
  border-radius: 8px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.05em;
  line-height: 1em;
  gap: 8px;
  padding: 1em 2em;
  text-transform: uppercase;

  &.large {
    font-size: 1.125em;
  }

  &.small {
    border-radius: 6px;
    font-size: 12px;
    padding: 0.8em 1.2em;
    width: auto;
  }

  &.small i {
    font-size: 14px;
  }

  &.primary {
    background-color: rgb(var(--primary));
  }

  &.primary.ghost {
    background-color: rgba(var(--primary), 0.1);
    color: rgb(var(--primary));
  }

  &.success {
    background-color: rgba(var(--primary), 0.1);
    color: rgb(var(--primary));
  }

  &.success.ghost {
    background-color: rgba(var(--success), 0.1);
    color: rgb(var(--success));
  }

  &.info {
    background-color: rgba(var(--primary), 0.1);
    color: rgb(var(--primary));
  }

  &.info.ghost {
    background-color: rgba(var(--info), 0.1);
    color: rgb(var(--info));
  }

  &.warning {
    background-color: rgba(var(--primary), 0.1);
    color: rgb(var(--primary));
  }

  &.warning.ghost {
    background-color: rgba(var(--warning), 0.1);
    color: rgb(var(--warning));
  }

  &.error {
    background-color: rgba(var(--error), 0.1);
    color: rgb(var(--error));
  }

  &.error.ghost {
    background-color: rgba(var(--error), 0.1);
    color: rgb(var(--error));
  }

  &.full {
    width: 100%;
  }

  &.iconOnly {
    height: 40px;
    padding: 0;
    width: 40px;
  }

  &.iconOnly.small {
    height: 32px;
    width: 32px;
  }

  &.iconOnly.large {
    height: 48px;
    width: 48px;
  }
`

const StyledButton = styled.button`${ baseButtonStyles }`
const StyledLink = styled( Link )`${ baseButtonStyles }`
const StyledDiv = styled.div`${ baseButtonStyles }`

export const ButtonSC = ({ text, mode, size, iconName, full, ghost, onClick, disabled, submit, href, div }: Props) => {

  let buttonClass = ''

  switch ( mode ) {
    case 'primary':
      buttonClass = 'primary'
      break
    case 'success':
      buttonClass = 'success'
      break
    case 'info':
      buttonClass = 'info'
      break
    case 'warning':
      buttonClass = 'warning'
      break
    case 'error':
      buttonClass = 'error'
      break
    default:
      break
  }

  if ( size === 'small' ) buttonClass += ' small'
  if ( size === 'large' ) buttonClass += ' large'
  if ( iconName && !text ) buttonClass += ' iconOnly'
  if ( full ) buttonClass += ' full'
  if ( ghost ) buttonClass += ` ${ mode } ghost`

  const buttonType = submit ? 'submit' : 'button'

  if (href) {
    return (
      <StyledLink href={ href } className={ buttonClass } onClick={ onClick }>
        { iconName && <i className={`fi fi-rr-${ iconName }`}></i>}
        { text}
      </StyledLink>
    )
  } else if (div) {
    return (
      <StyledDiv className={ buttonClass }>
        { iconName && <i className={`fi fi-rr-${ iconName }`}></i>}
        { text}
      </StyledDiv>
    )
  } else {
    return (
      <StyledButton className={ buttonClass } onClick={ onClick } disabled={ disabled } type={ buttonType }>
        { iconName && <i className={`fi fi-rr-${ iconName }`}></i>}
        { text}
      </StyledButton>
    )
  }
}
