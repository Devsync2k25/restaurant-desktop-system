/**
 * AUTHENTICATION HOOK - BACKEND INTEGRATION GUIDE
 * ===============================================
 * 
 * BACKEND DEVELOPERS - READ THIS SECTION:
 * ======================================
 * N
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
 * 
 * API INTEGRATION EXAMPLE:
 * =======================
 * const handleLogin = async (username: string, password: string) => {
 *   try {
 *     const response = await fetch('/api/login', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ username, password })
 *     });
 *     
 *     if (response.ok) {
 *       const data = await response.json();
 *       localStorage.setItem('token', data.token);
 *       setCurrentUser(data.user);
 *       setIsAuthenticated(true);
 *     } else {
 *       setLoginError('Invalid credentials');
 *     }
 *   } catch (error) {
 *     setLoginError('Network error');
 *   }
 * };
 */

import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preloaderStep, setPreloaderStep] = useState<'welcome' | 'subtitle' | 'done'>('welcome');

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setLoginError('');
      
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        setPreloaderStep('welcome');
        setTimeout(() => {
          setIsAuthenticated(true);
          setLoginError('');
        }, 10000); // Wait for preloader animation (10 seconds)
        setTimeout(() => setIsLoading(false), 11000); // Hide preloader after animation
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message);
        setIsLoading(false);
      }
    } catch (error) {
      setLoginError('Network error. Please check your connection.');
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
    setLoginError
  };
}; 