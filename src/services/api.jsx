
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://50.18.118.246/api';

// Helper to get token from localStorage
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Generic request function
async function request(endpoint, { method = 'GET', body, queryParams, headers = {} } = {}) {
  let url = `${BASE_URL}${endpoint}`;
  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += `?${queryString}`;
  }

  const token = getAuthToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    // You can customize error handling here (e.g., auto-logout on 401)
    throw new Error(data.message || 'Network request failed');
  }

  return data;
}

// Auth API
// Auth API
export async function loginUser(credentials) {
  console.log(credentials);
  // credentials = { customer_name, username, password }
  const endpoint = '/cp_login'; // BASE_URL + '/cp_login'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      customer_name: credentials.customer_name,
      username: credentials.username,
      password: credentials.password,
    },
  };
  // The generic `request` helper stringifies the body for you
  const data = await request(endpoint, options);
  return data; // expects { message, token, user_type }
}

export function logoutUser() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
}

// User management (Admin)
export async function fetchUsers(queryParams) {
  // Optional filters, e.g., { search: 'alice' }
  return await request('/users', { method: 'GET', queryParams });
}

export async function createUser(userData) {
  return await request('/users', { method: 'POST', body: userData });
}

export async function updateUser(userId, userData) {
  return await request(`/users/${userId}`, { method: 'PUT', body: userData });
}

export async function disableUser(userId) {
  return await request(`/users/${userId}/disable`, { method: 'PATCH' });
}

// Device management (Admin)
export async function fetchDevices(queryParams) {
  return await request('/devices', { method: 'GET', queryParams });
}

export async function createDevice(deviceData) {
  return await request('/devices', { method: 'POST', body: deviceData });
}

export async function updateDevice(deviceId, deviceData) {
  return await request(`/devices/${deviceId}`, { method: 'PUT', body: deviceData });
}

export async function archiveDevice(deviceId) {
  return await request(`/devices/${deviceId}/archive`, { method: 'PATCH' });
}
