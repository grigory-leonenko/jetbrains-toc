import { useState, useCallback, ChangeEvent } from 'react'
import { Input, TopicItem, TopicSkeleton } from './components'
import styles from './app.module.css'

function App() {
  const [search, setSearch] = useState<string>('')

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  return (
    <>
      <div className={styles.search}>
        <Input value={search} placeholder="Search" onChange={handleSearch} />
      </div>
      <div className={styles.tree}>
        <TopicItem level={0} active={true} open={true} onClick={() => {}} />
        <TopicItem level={0} active={false} open={true} onClick={() => {}} />
        <TopicItem level={1} active={false} open={true} onClick={() => {}} />
        <TopicItem level={2} active={false} open={true} onClick={() => {}} />
        <TopicSkeleton level={0} />
        <TopicSkeleton level={1} />
        <TopicSkeleton level={2} />
      </div>
    </>
  )
}

export default App
