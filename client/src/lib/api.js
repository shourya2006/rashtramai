// API utility functions for making authenticated requests

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

/**
 * Get the auth token from storage
 */
const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
};

/**
 * Make an authenticated API request
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-token');
      sessionStorage.removeItem('auth-token');
      throw new Error('Session expired. Please login again.');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * Fetch bills from the API
 */
export const fetchBills = async (page = 1, limit = 10) => {
  try {
    const data = await apiRequest(`/bills?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

/**
 * Fetch bill summary
 */
export const fetchBillSummary = async (billUrl) => {
  try {
    const data = await apiRequest('/bill-summary', {
      method: 'POST',
      body: JSON.stringify({ billUrl }),
    });
    return data;
  } catch (error) {
    console.error('Error fetching bill summary:', error);
    throw error;
  }
};

/**
 * Process a bill PDF
 */
export const processBill = async (billId, pdfUrl, title) => {
  try {
    const data = await apiRequest('/process-bill', {
      method: 'POST',
      body: JSON.stringify({ billId, pdfUrl, title }),
    });
    return data;
  } catch (error) {
    console.error('Error processing bill:', error);
    throw error;
  }
};

/**
 * Get bill summary
 */
export const getBillSummary = async (billId) => {
  try {
    const data = await apiRequest(`/bill-summary?billId=${billId}`);
    return data;
  } catch (error) {
    console.error('Error getting bill summary:', error);
    throw error;
  }
};

/**
 * Send chat message
 */
export const sendChatMessage = async (message, billId) => {
  try {
    const data = await apiRequest('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, billId }),
    });
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Bill Chat API - MongoDB persistence
 */

/**
 * Get or create a bill chat
 */
export const getOrCreateBillChat = async (billId, title, status, pdfUrl, summary) => {
  try {
    const data = await apiRequest('/bill-chats/get-or-create', {
      method: 'POST',
      body: JSON.stringify({ billId, title, status, pdfUrl, summary }),
    });
    return data;
  } catch (error) {
    console.error('Error getting or creating bill chat:', error);
    throw error;
  }
};

/**
 * Get a specific bill chat by billId
 */
export const getBillChat = async (billId) => {
  try {
    const data = await apiRequest(`/bill-chats/${billId}`);
    return data;
  } catch (error) {
    console.error('Error getting bill chat:', error);
    throw error;
  }
};

/**
 * Add a message to a bill chat
 */
export const addMessageToBillChat = async (billId, messageData) => {
  try {
    const data = await apiRequest(`/bill-chats/${billId}/message`, {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
    return data;
  } catch (error) {
    console.error('Error adding message to bill chat:', error);
    throw error;
  }
};

/**
 * Update bill chat summary
 */
export const updateBillChatSummary = async (billId, summary) => {
  try {
    const data = await apiRequest(`/bill-chats/${billId}/summary`, {
      method: 'PATCH',
      body: JSON.stringify({ summary }),
    });
    return data;
  } catch (error) {
    console.error('Error updating bill chat summary:', error);
    throw error;
  }
};

/**
 * Get user's recent bill chats
 */
export const getUserRecentChats = async (limit = 10) => {
  try {
    const data = await apiRequest(`/bill-chats/user/recent?limit=${limit}`);
    return data;
  } catch (error) {
    console.error('Error getting recent chats:', error);
    throw error;
  }
};

/**
 * Clear messages in a bill chat
 */
export const clearBillChatMessages = async (billId) => {
  try {
    const data = await apiRequest(`/bill-chats/${billId}/messages`, {
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    console.error('Error clearing bill chat messages:', error);
    throw error;
  }
};

/**
 * Delete a bill chat
 */
export const deleteBillChat = async (billId) => {
  try {
    const data = await apiRequest(`/bill-chats/${billId}`, {
      method: 'DELETE',
    });
    return data;
  } catch (error) {
    console.error('Error deleting bill chat:', error);
    throw error;
  }
};
