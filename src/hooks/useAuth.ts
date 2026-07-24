import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('sihrms_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Session expired');
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials: { email: string; password: string; role: 'patient' | 'doctor' | 'admin' }) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await authService.login(credentials);
        localStorage.setItem('sihrms_token', res.token);
        setUser(res.user);
        return res.user;
      } catch (err: any) {
        setError(err.message || 'Login failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      role: 'patient' | 'doctor' | 'admin';
      name: string;
      extraData?: Record<string, any>;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await authService.register(data);
        localStorage.setItem('sihrms_token', res.token);
        setUser(res.user);
        return res.user;
      } catch (err: any) {
        setError(err.message || 'Registration failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  useEffect(() => {
    fetchUser();

    const handleSessionExpired = () => {
      setUser(null);
    };

    window.addEventListener('healthorbit-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('healthorbit-session-expired', handleSessionExpired);
    };
  }, [fetchUser]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser: fetchUser,
  };
}
