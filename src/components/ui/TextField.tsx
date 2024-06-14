'use client'
import { useState, type FC, type ChangeEvent, useEffect, RefObject, Ref } from 'react'
import { ErrorMessage, Field } from 'formik'
import styles from './TextField.module.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Role } from '@/interfaces'

interface Select {
	value: string | number | Role
	label: string
}

export interface TextFieldProps {
	label?: string
	type?: string
	typeField?: string
	name: string
	placeholder?: string
	asSelect?: boolean
	options?: any
	errors?: string | undefined
	touched?: boolean | undefined
	value?: any
	defaultValue?: string
	innerRef?: Ref<any>;
	disabled?: boolean
	price?: boolean
	onChange?: ( e: ChangeEvent<any> ) => void
}

export const TextField: FC<TextFieldProps> = ({
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
	innerRef,
	disabled,
	price,
	onChange
}) => {

	const [ isActive, setIsActive ] = useState( false )
	const [ isFilled, setIsFilled ] = useState( false )

	useEffect(() => {
			setIsFilled( !!value )
	}, [ value ])

	const handleFieldFocus = () => {
			setIsActive(true)
	}

	const handleFieldBlur = () => {
			setIsActive(false)
	}

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setIsFilled(!!e.target.value)
			if ( onChange ) {
					onChange( e )
			}
	}

	const [ listRef ] = useAutoAnimate()

	return (
		<div            
			className={
				`${ styles.control }
				${ isActive ? styles.isActive : '' }
				${ asSelect ? styles.isSelect : '' }
				${ isFilled ? styles.isFilled : '' }
				${ disabled && 'disabled' }
				${ price && styles.price }
				${ typeField === 'file' ? styles.isFilled : '' }
				${ value ? styles.isFilled : '' }
				${ errors && touched ? ( styles.isError ) : ( touched && !errors ? styles.setValid : styles.isValid ) }`
			}
			onFocus={ handleFieldFocus }
			onBlur={ handleFieldBlur }
			onChange={ handleFieldChange }
		>
			<label htmlFor={ name } className={ styles.label }>{ label }</label>
			{ asSelect ? (
				<Field
						as="select"
						name={ name }
						className={ styles.field }
						autoComplete="off"
						isClearable={true}
						disabled={ disabled }
				>
						{ options &&
								options.map(( option: any ) => (
										<option key={ option.value } value={ option.value }>
												{ option.label }
										</option>
								))}
				</Field>
			) : typeField === 'file' ? (
				<input type="file" name={ name } className={ styles.field } />
			) : (
				<Field
						as={ typeField }
						type={ type }
						name={ name }
						placeholder={ placeholder }
						className={ styles.field }
						autoComplete="off"
						innerRef={ innerRef }
						disabled={ disabled }
				/>
			)}
			<div ref={ listRef }>
				<ErrorMessage
					name={ name }
					component="span"
					className={ `${ styles.errors }` }
				/>
			</div>
		</div>
	)
}
