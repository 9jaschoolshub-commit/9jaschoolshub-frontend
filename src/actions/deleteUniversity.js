import { useMutation, useQueryClient } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const deleteUniversity = () => {
  const deleteUniversityAction = async (id) => {
    await universityAPI.deleteUniversity(id)
  }

  const queryClient = useQueryClient()
  const deleteUniversityFunction = useMutation({
    mutationFn: deleteUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] })
      queryClient.invalidateQueries({ queryKey: ['single-university'] })
    },
  })

  return deleteUniversityFunction
}

export default deleteUniversity
