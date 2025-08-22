/**
 * AUTHENTICATION HOOK - BACKEND INTEGRATION GUIDE
 * ===============================================
 * 
 * BACKEND DEVELOPERS - READ THIS SECTION:
 * ======================================
 * 
 * CURRENT IMPLEMENTATION:
 * ======================
 * - Uses mock user data from constants.ts
 * - Simple username/password validation
 * - No real session management
 * - No JWT tokens or secure authentication
 * 
 * REQUIRED BACKEND CHANGES:
 * ========================
 * 1. Replace mock authentication with API calls:
 *    - POST /api/login with username/password
 *    - Return JWT token and user data
 *    - Implement proper password hashing (bcrypt)
 * 
 * 2. Add session management:
 *    - Store JWT token in localStorage/sessionStorage
 *    - Include token in all API requests
 *    - Implement token refresh mechanism
 * 
 * 3. Add logout functionality:
 *    - POST /api/logout to invalidate token
 *    - Clear local storage
 *    - Redirect to login page
 * 
 * 4. Add role-based middleware:
 *    - Validate user permissions on protected routes
 *    - Check role access for different features
 *    - Implement proper error handling
 */

import { useState } from 'react';
import { API_ENDPOINTS, apiRequest, handleApiResponse, handleApiError } from '../utils/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preloaderStep, setPreloaderStep] = useState<'welcome' | 'subtitle' | 'done'>('welcome');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setLoginError('');
      
      const response = await apiRequest(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      const data = await handleApiResponse<any>(response);
      console.log('Login response:', data); // Debug log
      
      // Check if login was successful and user data exists
      if (data.message === 'Login successful' && data.user) {
        setCurrentUser(data.user);
        setPreloaderStep('welcome');
        
        // Quick transition to authenticated state
        setTimeout(() => {
          setIsAuthenticated(true);
          setLoginError('');
          setIsLoading(false);
          setShouldRedirect(true); // Signal that redirect should happen
        }, 2000); // Reduced to 2 seconds for better UX
      } else {
        throw new Error('Invalid login response format');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setLoginError(handleApiError(error));
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return {
    isAuthenticated,
    currentUser,
    loginError,
    isLoading,
    preloaderStep,
    setPreloaderStep,
    handleLogin,
    handleLogout,
    setLoginError,
    shouldRedirect,
    setShouldRedirect
  };
}; 