import { TopicPages, HighlightType } from '../types'

// sourceId used for bypass optimization of children branches
const getChildsIds = (pages: TopicPages, targetId: string): string[] => {
  const record = pages[targetId]

  if (record.pages) {
    return [...record.pages, ...record.pages.flatMap(id => getChildsIds(pages, id))]
  }

  return []
}

const getBranchIds = (pages: TopicPages, targetId: string): string[] => {
  let target = pages[targetId]

  while (target.parentId !== 'ij') {
    target = pages[target.parentId]
  }

  return [...getChildsIds(pages, target.id), target.id]
}

export const getParentIds = (pages: TopicPages, targetId: string): string[] => {
  const result: string[] = []
  let target = pages[targetId]

  while (target.parentId !== 'ij') {
    result.push(target.parentId)
    target = pages[target.parentId]
  }

  return result
}

export const getHighlightIds = (pages: TopicPages, activeId: string) => {
  const highlightIds = new Map<string, HighlightType>()
  const record = pages[activeId]
  const branchIds = getBranchIds(pages, activeId)
  let chunkIds: string[] = []

  // Highlight as dark any active branch after zero level
  if (record.pages && record.level > 0) {
    chunkIds = [...getChildsIds(pages, record.id), record.id]
  }

  // Highlight as dark any parent branch for item without children after level one
  if (!record.pages && record.level > 1) {
    chunkIds = [...getChildsIds(pages, record.parentId), record.parentId]
  }

  branchIds.forEach(id => highlightIds.set(id, 'light'))
  chunkIds.forEach(id => highlightIds.set(id, 'dark'))

  return highlightIds
}

export const getFilteredParams = (pages: TopicPages, filter: string) => {
  console.log(filter)
  const visibleIds = new Set<string>()
  const mathedIds = new Set<string>()
  const opendIds: string[] = []

  for (const [id, page] of Object.entries(pages)) {
    if (page.title.toLowerCase().includes(filter.toLowerCase())) {
      mathedIds.add(id)
      visibleIds.add(id)

      getParentIds(pages, id).forEach(parentId => {
        visibleIds.add(parentId)
        opendIds.push(parentId)
      })
      getChildsIds(pages, id).forEach(childId => {
        visibleIds.add(childId)
      })
    }
  }

  return { visibleIds, mathedIds, opendIds }
}
