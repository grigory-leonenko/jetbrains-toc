import { memo, ChangeEventHandler } from 'react'
import styles from './style.module.css'

interface Props {
  value: string
  disabled?: boolean
  placeholder?: string
  onChange: ChangeEventHandler
}

export const Input = memo(({ value, disabled, placeholder, onChange }: Props) => {
  return (
    <input
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      className={styles.input}
      onChange={onChange}
    />
  )
})
