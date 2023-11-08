import { memo } from 'react'
import { DEFAULT_PADDING, LEVEL_PADDING } from '../../constants'
import styles from './style.module.css'

interface Props {
  level: number
}

export const TopicSkeleton = memo(({ level }: Props) => {
  return (
    <div
      style={{
        paddingLeft: DEFAULT_PADDING + LEVEL_PADDING * level,
      }}
      className={styles.skeleton}
    >
      <div className={styles.glitter} />
    </div>
  )
})
