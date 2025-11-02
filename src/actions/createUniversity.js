import { useMutation, useQueryClient } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const createUniversity = () => {
  const createUniversityAction = async (data) => {
    await universityAPI.createUniversity(data)
  }

  const queryClient = useQueryClient()
  const createUniversityFunction = useMutation({
    mutationFn: createUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] })
    },
  })

  return createUniversityFunction
}

export default createUniversity
