import { createContext, useState, useCallback, useMemo, PropsWithChildren } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useTopics } from './hooks/topics'
import { getHighlightIds, getFilteredParams, getParentIds } from './utils/tree'
import { HighlightType } from './types'

export interface TreeStore {
  openIds: string[]
  visibleIds: Set<string> | null
  machtedIds: Set<string> | null
  highlightIds: Map<string, HighlightType>
  activeId: string | undefined
  filter: string
  toggleOpen: (id: string) => void
  changeActive: (id: string) => void
  applyFilter: (value: string) => void
}

export const TreeContext = createContext<TreeStore | null>(null)

export const TreeProvider = ({ children }: PropsWithChildren) => {
  const [openIds, setOpenIds] = useState<string[]>([])
  const [visibleIds, setVisibleIds] = useState<Set<string> | null>(null)
  const [machtedIds, setMathedIds] = useState<Set<string> | null>(null)
  const [activeId, setActiveId] = useState<string | undefined>()
  const [filter, setFilter] = useState<string>('')
  const topics = useTopics()
  const highlightIds = useMemo(
    () => (activeId ? getHighlightIds(topics, activeId) : new Map()),
    [topics, activeId],
  )

  const toggleOpen = useCallback(
    (id: string) => {
      if (!openIds.includes(id)) {
        setOpenIds([...openIds, id])
      } else {
        setOpenIds(openIds.filter(item => item !== id))
      }
    },
    [openIds],
  )

  const changeActive = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const applyFilter = useDebouncedCallback((value: string) => {
    setFilter(value)

    if (value.length > 1) {
      const params = getFilteredParams(topics, value)
      setVisibleIds(params.visibleIds)
      setMathedIds(params.mathedIds)
      setOpenIds(params.opendIds)
    } else {
      setVisibleIds(null)
      setMathedIds(null)
      setOpenIds(activeId ? getParentIds(topics, activeId) : [])
    }
  }, 300)

  const value = useMemo(
    () => ({
      openIds,
      highlightIds,
      visibleIds,
      machtedIds,
      activeId,
      filter,
      toggleOpen,
      changeActive,
      applyFilter,
    }),
    [
      openIds,
      highlightIds,
      visibleIds,
      machtedIds,
      activeId,
      filter,
      toggleOpen,
      changeActive,
      applyFilter,
    ],
  )

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}
