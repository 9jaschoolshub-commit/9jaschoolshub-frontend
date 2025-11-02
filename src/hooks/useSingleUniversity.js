import { useQuery } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const useSingleUniversity = (id) => {
  const getSingleUniversity = async () => {
    const singleUniversity = await universityAPI.getUniversityById(id)
    return singleUniversity
  }
  const queryData = useQuery({
    queryKey: ['single-university'],
    queryFn: getSingleUniversity,
  })

  return queryData
}

export default useSingleUniversity
