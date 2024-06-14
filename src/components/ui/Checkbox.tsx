'use client'
import styles from './Checkbox.module.css'

interface Props {
  label: string
  name: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const Checkbox = ({ label, name, checked, onChange, className = '', ...rest }: Props) => {
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}