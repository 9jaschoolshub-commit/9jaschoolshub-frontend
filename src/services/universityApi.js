// services/universityApi.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem('api_key'); // Token for the key
    if (apiKey) {
      config.headers['API_KEY'] = apiKey; // Attach token to headers
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
)

export const universityAPI = {
  // Get university by ID or slug
  getUniversityById: async (id) => {
    try {
      const response = await api.get(`/universityRoute/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching university by ID:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch university details.'
      );
    }
  },
  
  // Search universities
  searchUniversities: async (query) => {
    try {
      const response = await api.get(`/searchUniversity?search=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching universities:', error);
      throw new Error(
        error.response?.data?.message || 
        'Failed to search universities.'
      );
    }
  },
  
  // Get all universities
  getAllUniversities: async () => {
    try {
      const response = await api.get('/universityRoute');
      return response.data.data;
    } catch (error) { 
      console.error('Error fatching all universitis', error);
      throw new Error (
        error.response?.data?.message || 
        'Failed to fetch universities.'
      )
    }
  },

  // Create a new University
  createUniversity: async (data) => {
    try {
      const response = await api.post('/universityRoute', data);
      return response.data;
    } catch (error) {
      console.error('Error creating university', error)
      throw new Error(
        error.response?.data?.message || 
        'Failed to create university.'
      );
    }
  }
}

export const SearchProgrammes = async (query) => {
  try {
    const response = await api.get(`/searchProgramme?search=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching programmes:', error);
    throw new Error(
      error.response?.data?.message || 
      'Failed to search programmes.'
    );
  }
}