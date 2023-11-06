import { MouseEventHandler } from 'react'
import cx from 'classnames'
import { DEFAULT_PADDING, LEVEL_PADDING } from '../../constants'
import { ArrowIcon } from '../../icons'
import styles from './style.module.css'

interface Props {
  active?: boolean
  open: boolean
  level: number
  onClick: MouseEventHandler
}

export const TopicItem = ({ active, open, level = 0, onClick }: Props) => {
  return (
    <div
      role="button"
      aria-pressed="false"
      style={{
        paddingLeft: DEFAULT_PADDING + LEVEL_PADDING * level,
      }}
      className={cx(styles.button, {
        [styles.buttonActive]: active,
        [styles.buttonFirstLevel]: level === 1 && !active,
        [styles.buttonSecondLevel]: level > 1 && !active,
      })}
      onClick={onClick}
    >
      <div className={cx(styles.icon, { [styles.iconOpen]: open })}>
        <ArrowIcon />
      </div>
      <p className={styles.text}>Topic name</p>
    </div>
  )
}
