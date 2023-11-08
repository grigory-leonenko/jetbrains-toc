export const splitTitle = (title: string, filter: string) => {
  const startIndex = title.toLowerCase().indexOf(filter.toLowerCase())
  const endIndex = startIndex + filter.length

  return [
    title.substring(0, startIndex),
    title.substring(startIndex, endIndex),
    title.substring(endIndex, title.length + 1),
  ]
}
