import { useQuery } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const useAllUniversities = () => {
  const getAllUniversities = async () => {
    const allUniversities = await universityAPI.getAllUniversities()
    return allUniversities
  }
  const queryData = useQuery({
    queryKey: ['universities'],
    queryFn: getAllUniversities,
  })

  return queryData
}
export default useAllUniversities
