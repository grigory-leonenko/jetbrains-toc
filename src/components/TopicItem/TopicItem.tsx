import { memo, useCallback, useMemo, MouseEvent } from 'react'
import cx from 'classnames'
import { useTopic } from '../../hooks/topics'
import { useTree } from '../../hooks/tree'
import { DEFAULT_PADDING, EXTRA_PADDING, LEVEL_PADDING } from '../../constants'
import { ArrowIcon } from '../../icons'
import { splitTitle } from './utils'
import styles from './style.module.css'

interface Props {
  id: string
}

export const TopicItem = memo(({ id }: Props) => {
  const topic = useTopic(id)
  const {
    filter,
    openIds,
    visibleIds,
    machtedIds,
    highlightIds,
    activeId,
    toggleOpen,
    changeActive,
  } = useTree()
  const open = useMemo(() => openIds.includes(id), [openIds, id])
  const active = id === activeId
  const pages = topic.pages ?? []
  const visiblePages = pages.filter(page => visibleIds === null || visibleIds.has(page))
  const hasPages = visiblePages.length !== 0

  const handleClickButton = useCallback(() => {
    changeActive(id)
    toggleOpen(id)
  }, [id, toggleOpen, changeActive])

  const handleClickArrow = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      toggleOpen(id)
    },
    [id, toggleOpen],
  )

  const title = useMemo(() => {
    if (machtedIds && machtedIds.has(id)) {
      const [start, highlight, end] = splitTitle(topic.title, filter)
      return (
        <>
          {start}
          <span className={styles.textHighlight}>{highlight}</span>
          {end}
        </>
      )
    } else {
      return topic.title
    }
  }, [filter, id, machtedIds, topic.title])

  const paddingLeft = useMemo(
    () => (hasPages ? DEFAULT_PADDING : EXTRA_PADDING) + LEVEL_PADDING * topic.level,
    [hasPages, topic.level],
  )

  return (
    <>
      <div
        role="button"
        aria-pressed="false"
        data-test-id={`topic-item-${id}`}
        style={{ paddingLeft }}
        className={cx(styles.button, {
          [styles.buttonActive]: active,
          [styles.buttonHighlightLight]: highlightIds.get(id) === 'light',
          [styles.buttonHighlightDark]: highlightIds.get(id) === 'dark',
        })}
        onClick={handleClickButton}
      >
        {hasPages && (
          <div className={cx(styles.icon, { [styles.iconOpen]: open })} onClick={handleClickArrow}>
            <ArrowIcon />
          </div>
        )}
        <p className={styles.text} title={topic.title}>
          {title}
        </p>
      </div>
      <div className={styles.pages}>
        {open ? visiblePages.map(page => <TopicItem id={page} key={page} />) : null}
      </div>
    </>
  )
})
