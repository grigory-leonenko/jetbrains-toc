import { useQuery } from 'react-query'
import { TopicsResult } from '../types'

export const useTopicsQuery = () => {
  return useQuery<TopicsResult>({
    queryKey: ['topics'],
    queryFn: () => fetch(`http://localhost:8000/topics`).then(res => res.json()),
    refetchOnWindowFocus: false,
  })
}

export const useTopicsData = () => {
  return useTopicsQuery().data
}

export const useLoadingTopics = () => {
  return useTopicsQuery().isLoading
}

export const useRootTopics = () => {
  return useTopicsData()?.topLevelIds ?? []
}

export const useTopics = () => {
  return useTopicsData()?.entities.pages ?? {}
}

export const useTopic = (id: string) => {
  const topics = useTopicsData()

  const topic = topics?.entities.pages[id]

  if (!topic) {
    throw new Error(`Topic with id ${id} not exist.`)
  }

  return topic
}
