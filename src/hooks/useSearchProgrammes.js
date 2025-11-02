import { useQuery } from '@tanstack/react-query'
import { searchProgrammes } from '../services/universityApi'

const useSearchProgrammes = (searchQuery) => {
  const getSearchProgrammes = async () => {
    const searchProgrammesResult = await searchProgrammes(searchQuery)
    return searchProgrammesResult
  }
  const queryData = useQuery({
    queryKey: ['search-programmes'],
    queryFn: getSearchProgrammes,
  })
  return queryData
}

export default useSearchProgrammes
