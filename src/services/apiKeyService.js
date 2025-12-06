import useStore from '../hooks/useStore'
import axios from 'axios'

export const getApiKeyFromServer = async () => {
  const apiKey = useStore.getState().apiKey
  if (apiKey) {
    return apiKey
  }
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/getApiKey`)
    const apiKey = res.data.apiKey
    useStore.getState.setApiKey(apiKey)
    return apiKey
  } catch (error) {
    console.error('Failed to get API key:', error)
    throw new Error('Unable to retrieve API key')
  }
}
