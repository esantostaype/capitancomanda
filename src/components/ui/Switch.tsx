'use client'
import { ChangeEvent } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  checked: boolean
  onChange: ( checked: boolean ) => void
  yesno?: boolean
  label?: string
  size?: 'small' | 'normal' | 'large'
  disabled?: boolean
}

const getSizeStyles = (size?: string) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 12px;
        gap: 8px;

        .switch__button {
          width: 34px;
          height: 20px;
        }

        .switch__button:after {
          top: 3px;
          left: 3px;
          width: 14px;
          height: 14px;
          border-radius: 14px;
        }

        input:checked + .switch__button:after {
          left: calc(100% - 3px);
          transform: translateX(-100%);
        }

        .switch__button:active:after {
          width: 20px;
        }
      `
    case 'large':
      return css`
        font-size: 16px;
        gap: 12px;

        .switch__button {
          width: 64px;
          height: 36px;
        }

        .switch__button:after {
          top: 5px;
          left: 5px;
          width: 26px;
          height: 26px;
          border-radius: 26px;
        }

        input:checked + .switch__button:after {
          left: calc(100% - 5px);
          transform: translateX(-100%);
        }

        .switch__button:active:after {
          width: 34px;
        }
      `
    default:
      return css`
        font-size: 14px;
        gap: 8px;
        
        .switch__button {
          width: 48px;
          height: 28px;
        }

        .switch__button:after {
          top: 4px;
          left: 4px;
          width: 20px;
          height: 20px;
          border-radius: 20px;
        }

        input:checked + .switch__button:after {
          left: calc(100% - 4px);
          transform: translateX(-100%);
        }

        .switch__button:active:after {
          width: 32px;
        }
      `
  }
}

const SwitchContainer = styled.div<{ size?: string }> `
  align-items: center;
  display: flex;
  flex: 1;
  ${ props => getSizeStyles( props.size ) }
`

const SwitchInput = styled.input `
  display: none;
  height: 0;
  width: 0;
  visibility: hidden;
`

const SwitchButton = styled.label `
  cursor: pointer;
  width: 48px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  display: block;
  border-radius: 100px;
  position: relative;
  transition: 0.3s;

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 20px;
    transition: 0.3s;
  }

  ${ SwitchInput }:checked + & {
    background: rgb(var(--primary));
  }

  ${ SwitchInput }:checked + &:after {
    left: calc(100% - 4px);
    transform: translateX(-100%);
  }

  &:active:after {
    width: 32px;
  }
`

const SwitchLabel = styled.label `
  cursor: pointer;
`

export const Switch = ({ yesno, checked, onChange, label, size, disabled }: Props) => {

  const handleToggleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    onChange( e.target.checked )
  }

  return (
    <>
      <SwitchContainer size={ size }>
        <SwitchInput
          type="checkbox"
          id="switch"
          name="switch"
          checked={ checked }
          onChange={ handleToggleChange }
          disabled={ disabled }
        />
        <SwitchButton htmlFor="switch" className="switch__button" />
        <SwitchLabel htmlFor="switch" className="switch__label">{ label }</SwitchLabel>
      </SwitchContainer>
    </>
  )
}
