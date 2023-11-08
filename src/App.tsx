import { useCallback, ChangeEvent, useState, ReactNode } from 'react'
import { Input, TopicItem, TopicSkeleton } from './components'
import { useLoadingTopics, useRootTopics } from './hooks/topics'
import { useTree } from './hooks/tree'
import styles from './app.module.css'

function App() {
  const [filter, setFilter] = useState<string>('')
  const { visibleIds, applyFilter } = useTree()
  const loading = useLoadingTopics()
  const topics = useRootTopics()
  const visibleTopics = topics.filter(id => visibleIds === null || visibleIds.has(id))
  const hasTopics = visibleTopics.length !== 0

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value)
      applyFilter(event.target.value)
    },
    [applyFilter],
  )

  let content: ReactNode = null

  if (loading) {
    content = (
      <>
        <TopicSkeleton level={0} />
        <TopicSkeleton level={1} />
        <TopicSkeleton level={2} />
        <TopicSkeleton level={0} />
      </>
    )
  } else if (hasTopics) {
    content = visibleTopics.map(id => <TopicItem id={id} key={id} />)
  } else {
    content = <div className={styles.empty}>Nothing to show...</div>
  }

  return (
    <>
      <div className={styles.search}>
        <Input
          placeholder="Search"
          testId="search-input"
          value={filter}
          disabled={loading}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.tree}>{content}</div>
    </>
  )
}

export default App
