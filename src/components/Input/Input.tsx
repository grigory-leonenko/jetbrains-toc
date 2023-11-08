import { memo, ChangeEventHandler } from 'react'
import styles from './style.module.css'

interface Props {
  value: string
  disabled?: boolean
  placeholder?: string
  testId?: string
  onChange: ChangeEventHandler
}

export const Input = memo(({ value, disabled, placeholder, testId, onChange }: Props) => {
  return (
    <input
      data-test-id={testId}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      className={styles.input}
      onChange={onChange}
    />
  )
})
