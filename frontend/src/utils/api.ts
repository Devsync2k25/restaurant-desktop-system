/**
 * API Configuration and Utilities
 * ==============================
 * Centralized configuration for backend API endpoints
 */

// API Base URL - change this for different environments
export const API_BASE_URL = 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/login`,
  LOGOUT: `${API_BASE_URL}/api/logout`,
  
  // Inventory Management
  INVENTORY: `${API_BASE_URL}/api/inventory`,
  
  // Recipe Management
  RECIPES: `${API_BASE_URL}/api/recipes`,
  MENU_ITEMS: `${API_BASE_URL}/api/menu-items`,
  
  // User Management
  USERS: `${API_BASE_URL}/api/users`,
  ROLES: `${API_BASE_URL}/api/roles`,
  
  // Goods Issuance
  GOODS_ISSUANCE: `${API_BASE_URL}/api/goods-issuance`,
  
  // Analytics & Reports
  DAILY_USAGE: `${API_BASE_URL}/api/daily-usage`,
  WASTE_LOG: `${API_BASE_URL}/api/waste-log`,
  ANALYTICS: `${API_BASE_URL}/api/analytics`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`,
};

// API Request Helper
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(endpoint, defaultOptions);
};

// API Response Helper
export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Error Handler
export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
