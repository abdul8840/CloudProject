import { API_BASE_URL } from '../utils/constants.js';

/**
 * Make API request using fetch
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    credentials: 'include', // Important for cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data,
        },
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * GET request
 */
export const get = (endpoint, options = {}) => {
  return apiClient(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * POST request
 */
export const post = (endpoint, data, options = {}) => {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * PUT request
 */
export const put = (endpoint, data, options = {}) => {
  return apiClient(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE request
 */
export const del = (endpoint, options = {}) => {
  return apiClient(endpoint, {
    method: 'DELETE',
    ...options,
  });
};