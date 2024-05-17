'use client'
import { useState, type FC, type ChangeEvent, useEffect } from 'react'
import { ErrorMessage, Field } from 'formik'
import styles from './TextField.module.css'

interface Select {
    value: string;
    label: string;
}

interface Props {
    label?: string;
    type?: string;
    name: string;
    placeholder?: string;
    asSelect?: boolean;
    options?: Select[];
    errors?: string | undefined;
    touched?: boolean | undefined;
    value?: string;
    defaultValue?: string;
    onChange?: ( e: ChangeEvent<any> ) => void;
}

export const FormField:FC<Props> = ({
    label,
    type,
    name,
    placeholder,
    asSelect,
    options,
    errors,
    touched,
    value,
    defaultValue,
    onChange
}) => {

    const [ isActive, setIsActive ] = useState( false );
    const [ isFilled, setIsFilled ] = useState( false );

    useEffect(() => {
        setIsFilled( !!value );
    }, [ value ]);

    const handleFieldFocus = () => {
        setIsActive(true);
    };

    const handleFieldBlur = () => {
        setIsActive(false);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(!!e.target.value);
        if (onChange) {
            onChange(e);
        }
    };  

    return (
        <div
            className={
                `${ styles.control }
                ${ isActive ? styles.isActive : '' }
                ${ asSelect ? styles.isActive : '' }
                ${ isFilled ? styles.isFilled : '' }
                ${ type === 'file' ? styles.isFilled : '' }
                ${ value || defaultValue ? styles.isFilled : '' }
                ${ errors && touched ? ( styles.isError ) : ( styles.isValid ) }`
            }
            onFocus={ handleFieldFocus }
            onBlur={ handleFieldBlur }
            onChange={ handleFieldChange }
        >
            <label htmlFor={ name } className={ styles.label }>{ label }</label>
            {asSelect ? (
                <select name={name} className={styles.field} autoComplete="off">
                    {options &&
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            ) : type === 'file' ? (
                <input type="file" name={name} className={styles.field} />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={styles.field}
                    autoComplete="off"
                    defaultValue={ defaultValue }
                />
            )}
            <div className={styles.errors}>
                {errors && touched && <span>{errors}</span>} {/* Display error if touched */}
            </div>
        </div>
    );
};