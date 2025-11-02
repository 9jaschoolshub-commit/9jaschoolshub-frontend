import { useMutation, useQueryClient } from '@tanstack/react-query'
import { universityAPI } from '../services/universityApi'

const updateUniversity = () => {
  const updateUniversityAction = async ({ id, data }) => {
    await universityAPI.updateUniversity(id, data)
  }

  const queryClient = useQueryClient()
  const updateUniversityFunction = useMutation({
    mutationFn: updateUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] })
      queryClient.invalidateQueries({ queryKey: ['single-university'] })
    },
  })

  return updateUniversityFunction
}

export default updateUniversity
