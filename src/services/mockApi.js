// Mock API service for development/testing purposes
// This simulates the API behavior when the real API is not available

let mockSigners = [
  {
    id: 1,
    name: "John Doe",
    npwp: "123456789012345",
    email: "john.doe@example.com",
    phone: "+6281234567890",
    address: "Jl. Sudirman No. 123, Jakarta"
  },
  {
    id: 2,
    name: "Jane Smith", 
    npwp: "987654321098765",
    email: "jane.smith@example.com",
    phone: "+6281234567891",
    address: "Jl. Thamrin No. 456, Jakarta"
  },
  {
    id: 3,
    name: "Bob Johnson",
    npwp: "456789123456789",
    email: "bob.johnson@example.com", 
    phone: "+6281234567892",
    address: "Jl. Gatot Subroto No. 789, Jakarta"
  }
]

let nextId = 4

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockSignersApi = {
  // Get all signers
  getSigners: async () => {
    await delay(500) // Simulate network delay
    return {
      data: [...mockSigners]
    }
  },
  
  // Get signer by ID
  getSigner: async (id) => {
    await delay(300)
    const signer = mockSigners.find(s => s.id == id)
    if (!signer) {
      throw new Error('Signer not found')
    }
    return {
      data: { ...signer }
    }
  },
  
  // Create new signer
  createSigner: async (signerData) => {
    await delay(800)
    const newSigner = {
      id: nextId++,
      ...signerData
    }
    mockSigners.push(newSigner)
    return {
      data: { ...newSigner }
    }
  },
  
  // Update signer
  updateSigner: async (id, signerData) => {
    await delay(600)
    const index = mockSigners.findIndex(s => s.id == id)
    if (index === -1) {
      throw new Error('Signer not found')
    }
    mockSigners[index] = {
      id: parseInt(id),
      ...signerData
    }
    return {
      data: { ...mockSigners[index] }
    }
  },
  
  // Delete signer
  deleteSigner: async (id) => {
    await delay(400)
    const index = mockSigners.findIndex(s => s.id == id)
    if (index === -1) {
      throw new Error('Signer not found')
    }
    mockSigners.splice(index, 1)
    return {
      data: { success: true }
    }
  }
}