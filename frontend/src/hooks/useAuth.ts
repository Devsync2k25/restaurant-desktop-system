import { useState } from 'react';

export const useAuth = (users: any[] = []) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preloaderStep, setPreloaderStep] = useState<'welcome' | 'subtitle' | 'done'>('welcome');

  const handleLogin = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoading(true); // Show preloader
      setPreloaderStep('welcome');
      setTimeout(() => {
        setIsAuthenticated(true);
        setLoginError('');
      }, 10000); // Wait for preloader animation (10 seconds)
      setTimeout(() => setIsLoading(false), 11000); // Hide preloader after animation
    } else {
      setLoginError('Invalid username or password');
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