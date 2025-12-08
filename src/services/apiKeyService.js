import useStore from '../hooks/useStore'
import axios from 'axios'

export const getApiKeyFromServer = async () => {
  const saved_key = useStore.getState().api_key
  if (saved_key) {
    return saved_key
  }
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/v1/client-init`)
    const api_key = res.data.apiKey
    useStore.setState({ api_key })
  } catch (error) {
    console.error('Failed to get API key:', error)
    throw new Error('Unable to retrieve API key')
  }
}
