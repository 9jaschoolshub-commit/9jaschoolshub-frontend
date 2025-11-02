import axios from 'axios'
// import useStore from "../hooks/useStore";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds
  timeoutErrorMessage: "The request timed out. Kindly try again or refresh your page"
});

api.interceptors.request.use(
  (config) => {
    // Get API key from Zustand store (useStore)
    const apiKey = 'logic here'

    if (apiKey) {
      config.headers['API_KEY'] = apiKey // Attach token to headers
    }

    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

export const universityAPI = {
  // Get university by ID or slug
  getUniversityById: async (id) => {
    try {
      const response = await api.get(`/universityRoute/${id}`)
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch university details.'
      )
    }
  },

  // Search universities
  searchUniversities: async (query) => {
    try {
      const response = await api.get(`/searchUniversity?search=${query}`)
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to search universities.'
      )
    }
  },

  // Get all universities
  getAllUniversities: async () => {
    try {
      const response = await api.get("/universityRoute");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch universities.'
      )
    }
  },

  // Create a new University
  createUniversity: async (data) => {
    try {
      const response = await api.post('/universityRoute', data)
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to create university.'
      )
    }
  },

  // Update a university
  updateUniversity: async (id, data) => {
    try {
      const response = await api.patch(`/universityRoute/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to update university.'
      )
    }
  },

  // Delete a university
  deleteUniversity: async (id) => {
    try {
      const response = await api.delete(`/universityRoute/${id}`)
      return response.data
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete university.'
      )
    }
  },
}

export const searchProgrammes = async (query) => {
  try {
    const response = await api.get(`/searchProgramme?search=${query}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to search programmes.'
    )
  }
}
