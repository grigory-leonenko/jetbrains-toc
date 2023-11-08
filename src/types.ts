export interface PageItem {
  id: string
  level: number
  pages?: string[]
  parentId: string
  tabIndex: number
  title: string
}

export type TopicPages = Record<string, PageItem>

export interface TopicsResult {
  entities: {
    pages: TopicPages
  }
  topLevelIds: string[]
}

export type HighlightType = 'light' | 'dark'
