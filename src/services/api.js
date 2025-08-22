import axios from 'axios'
import { mockSignersApi } from './mockApi'

const API_BASE_URL = 'https://online-test-api.achilles.systems'

// Toggle this to switch between mock and real API
const USE_MOCK_API = false // Changed to use real API

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const realSignersApi = {
  // Get all signers (with optional name filter)
  getSigners: (name = '') => {
    const params = name ? { name } : {}
    return apiClient.get('/api/v1/signers', { params })
  },
  
  // Get signer by ID
  getSigner: (id) => apiClient.get(`/api/v1/signers/${id}`),
  
  // Create new signer
  createSigner: (signerData) => {
    const payload = { data: signerData }
    return apiClient.post('/api/v1/signers', payload)
  },
  
  // Update signer
  updateSigner: (id, signerData) => {
    const payload = { data: signerData }
    return apiClient.put(`/api/v1/signers/${id}`, payload)
  },
  
  // Delete signer
  deleteSigner: (id) => apiClient.delete(`/api/v1/signers/${id}`),
}

// Export the appropriate API based on configuration
export const signersApi = USE_MOCK_API ? mockSignersApi : realSignersApi

export default apiClient