import { useContext } from 'react'
import { TreeStore, TreeContext } from '../store'

export const useTree = () => {
  return useContext(TreeContext) as TreeStore
}
