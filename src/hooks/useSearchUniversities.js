import { useQuery } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const useSearchUniversities = (searchQuery) => {
  const getSearchUniversities = async () => {
    const searchUniversities = await universityAPI.searchUniversities(
      searchQuery
    )
    return searchUniversities
  }
  const queryData = useQuery({
    queryKey: ['search-universities'],
    queryFn: getSearchUniversities,
  })

  return queryData
}

export default useSearchUniversities
