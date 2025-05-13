import { apiClient, safeApiCall, ENABLE_MOCK_DATA } from './apiConfig';

// Mock data for development and testing
const mockClients = [
  {
    id: "1",
    name: "John Mwangi",
    age: 67,
    phone: "+254 712 345678",
    email: "john.mwangi@example.com",
    status: "active",
    policyType: "Premium Senior Gold",
    policyNumber: "PSG-2023-1234",
    startDate: "2023-01-15",
    renewalDate: "2024-01-15",
    premium: "KES 48,000",
    claims: 2,
    dependents: 1,
    lastContact: "2023-07-25",
    notes: "Long-term client, interested in adding dental coverage"
  },
  {
    id: "2",
    name: "Sarah Njoroge",
    age: 72,
    phone: "+254 734 567890",
    email: "sarah.njoroge@example.com",
    status: "active",
    policyType: "Senior Comprehensive",
    policyNumber: "SC-2022-5678",
    startDate: "2022-06-10",
    renewalDate: "2023-06-10",
    premium: "KES 65,000",
    claims: 3,
    dependents: 2,
    lastContact: "2023-08-05",
    notes: "Has chronic condition, needs regular follow-up"
  },
  // More mock clients...
];

/**
 * Get all clients with optional filtering and pagination
 * @param {Object} params - Query parameters for filtering and pagination
 * @returns {Promise<Object>} - Clients data with pagination info
 */
export const getClients = async (params = {}) => {
  if (ENABLE_MOCK_DATA) {
    // Return mock data for development
    return {
      success: true,
      data: mockClients,
      pagination: {
        total: mockClients.length,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  }

  try {
    const response = await apiClient.get('/clients', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

/**
 * Get client by ID
 * @param {string} id - Client ID
 * @returns {Promise<Object>} - Client data
 */
export const getClientById = async (id) => {
  if (ENABLE_MOCK_DATA) {
    const client = mockClients.find(c => c.id === id);
    return {
      success: !!client,
      data: client || null,
      message: client ? null : 'Client not found',
    };
  }

  try {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching client ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new client
 * @param {Object} clientData - Client data to create
 * @returns {Promise<Object>} - Created client data
 */
export const createClient = async (clientData) => {
  if (ENABLE_MOCK_DATA) {
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: 'Client created successfully',
      data: newClient,
    };
  }

  try {
    const response = await apiClient.post('/clients', clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

/**
 * Update an existing client
 * @param {string} id - Client ID
 * @param {Object} clientData - Updated client data
 * @returns {Promise<Object>} - Updated client data
 */
export const updateClient = async (id, clientData) => {
  if (ENABLE_MOCK_DATA) {
    return {
      success: true,
      message: 'Client updated successfully',
      data: {
        ...clientData,
        id,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  try {
    const response = await apiClient.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a client
 * @param {string} id - Client ID
 * @returns {Promise<Object>} - Success message
 */
export const deleteClient = async (id) => {
  if (ENABLE_MOCK_DATA) {
    return {
      success: true,
      message: 'Client deleted successfully',
    };
  }

  try {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting client ${id}:`, error);
    throw error;
  }
};

/**
 * Get client statistics
 * @returns {Promise<Object>} - Client statistics data
 */
export const getClientStats = async () => {
  if (ENABLE_MOCK_DATA) {
    return {
      success: true,
      data: {
        totalClients: mockClients.length,
        statusDistribution: {
          active: mockClients.filter(c => c.status === 'active').length,
          inactive: mockClients.filter(c => c.status === 'inactive').length,
          pendingRenewal: mockClients.filter(c => c.status === 'pending_renewal').length,
        },
        upcomingRenewals: 3,
        policyTypeDistribution: [
          { policyType: 'Premium Senior Gold', count: 2 },
          { policyType: 'Senior Comprehensive', count: 1 },
          { policyType: 'Senior Basic Plus', count: 1 },
        ],
      },
    };
  }

  try {
    const response = await apiClient.get('/clients/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching client statistics:', error);
    throw error;
  }
};

// Safe versions of the API calls with fallback to mock data
export const safeGetClients = (params) => 
  safeApiCall(() => getClients(params), { success: true, data: mockClients, pagination: { total: mockClients.length, page: 1, limit: 10, totalPages: 1 }});

export const safeGetClientById = (id) => 
  safeApiCall(() => getClientById(id), { success: true, data: mockClients.find(c => c.id === id) || null });

export const safeCreateClient = (clientData) => 
  safeApiCall(() => createClient(clientData), { success: true, message: 'Client created successfully', data: { ...clientData, id: Date.now().toString() }});

export const safeUpdateClient = (id, clientData) => 
  safeApiCall(() => updateClient(id, clientData), { success: true, message: 'Client updated successfully', data: { ...clientData, id }});

export const safeDeleteClient = (id) => 
  safeApiCall(() => deleteClient(id), { success: true, message: 'Client deleted successfully' });

export const safeGetClientStats = () => 
  safeApiCall(() => getClientStats(), { 
    success: true, 
    data: {
      totalClients: mockClients.length,
      statusDistribution: {
        active: mockClients.filter(c => c.status === 'active').length,
        inactive: mockClients.filter(c => c.status === 'inactive').length,
        pendingRenewal: mockClients.filter(c => c.status === 'pending_renewal').length,
      },
      upcomingRenewals: 3,
      policyTypeDistribution: [
        { policyType: 'Premium Senior Gold', count: 2 },
        { policyType: 'Senior Comprehensive', count: 1 },
        { policyType: 'Senior Basic Plus', count: 1 },
      ],
    }
  });

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
  safeGetClients,
  safeGetClientById,
  safeCreateClient,
  safeUpdateClient,
  safeDeleteClient,
  safeGetClientStats,
};
