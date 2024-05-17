'use client'
import { useState, type FC, type ChangeEvent, useEffect } from 'react'
import { ErrorMessage, Field } from 'formik'
import styled, { css } from 'styled-components'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Select {
	value: string | number
	label: string
}

interface Props {
	label?: string
	type?: string
	typeField?: string
	name: string
	placeholder?: string
	asSelect?: boolean
	options?: Select[]
	errors?: string | undefined
	touched?: boolean | undefined
	value?: string | Text | number | null
	defaultValue?: string
	onChange?: ( e: ChangeEvent<any> ) => void
}

const Control = styled.div<{ isActive: boolean; isFilled: boolean; asSelect: boolean; typeField?: string; errors?: string; touched?: boolean }>`
  position: relative;

	.label {
		color: rgba(var(--foreground), 0.5);
		pointer-events: none;
		left: 16px;
		line-height: 1em;
		padding: 0 6px;
		position: absolute;
		top: 22px;
		transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;
	}

	.field {
		border: 2px solid var(--border);
		padding: 16px 20px;
		width: 100%;
		transition: all 0.3s ease;
	}

	.field option {
		padding: 8px 16px;
	}

	${ props => ( props.isActive || props.isFilled || props.asSelect || props.typeField === 'file') && css`
		.label {
			background-color: rgb(var(--background));
			color: rgba(var(--foreground), 0.75);
			font-size: 12px;
			top: -5px;
		}
	`}

	.field::placeholder {
		color: rgba(var(--foreground), 0);
		transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;
	}

	${ props => props.isActive && css`
		.field {
			border-color: rgb(var(--primary));
		}
		.field::placeholder {
			color: rgba(var(--foreground), 0.3);
		}
	`}

	${ props => props.errors && props.touched && css`
		.field {
			border: 2px solid rgb(var(--error));
			color: rgb(var(--error));
		}
		.label {
			color: rgb(var(--error));
		}
		.field:focus-visible {
			color: rgb(var(--error));
			transition: all 0s ease;
		}
	`}
`

const ErrorMessageStyled = styled(ErrorMessage) `
	color: rgb(var(--error));
	display: block;
	font-size: 12px;
	left: 0;
	margin-top: 6px;
	text-align: left;
	width: 100%;
`

export const TextField: FC<Props> = ({ 
  label,
  type,
  typeField,
  name,
  placeholder,
  asSelect,
  options,
  errors,
  touched,
  value,
  onChange 
}) => { 
  const [ isActive, setIsActive ] = useState( false )
  const [ isFilled, setIsFilled ] = useState( false )

  useEffect(() => { 
    setIsFilled( !!value )
  }, [ value ])

  const handleFieldFocus = () => { 
    setIsActive( true )
  }

  const handleFieldBlur = () => { 
    setIsActive( false )
  }

  const handleFieldChange = ( e: React.ChangeEvent<HTMLInputElement> ) => { 
    setIsFilled( !!e.target.value )
    if ( onChange ) { 
      onChange( e )
    }
  }

  const [ listRef ] = useAutoAnimate()

  return ( 
    <Control
      isActive={ isActive }
      isFilled={ isFilled }
      asSelect={ !!asSelect }
      typeField={ typeField }
      errors={ errors }
      touched={ touched }
      onFocus={ handleFieldFocus }
      onBlur={ handleFieldBlur }
      onChange={ handleFieldChange }
    >
      <label htmlFor={ name } className="label">
        { label }
      </label>
      { asSelect ? (
        <Field as="select" name={ name } className="field" autoComplete="off">
          { options &&
            options.map(( option ) => ( 
              <option key={ option.value } value={ option.value }>
                { option.label }
              </option>
            )) }
        </Field>
      ) : ( 
        <Field as={ typeField } type={ type } name={ name } placeholder={ placeholder } className="field" autoComplete="off" />
      )}
      <div ref={ listRef }>
        <ErrorMessageStyled name={ name } component="span" className="fadeIn errors" />
      </div>
    </Control>
  )
}