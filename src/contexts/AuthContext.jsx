import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setTokenGetters } from '../api_call/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Wire up axios interceptors to always read the latest tokens from localStorage.
  useEffect(() => {
    setTokenGetters(
      () => localStorage.getItem('accessToken'),
      () => localStorage.getItem('refreshToken'),
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const storedAccessToken  = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        setUser(firebaseUser);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      } else {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (tokens) => {
    localStorage.setItem('accessToken',  tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const isAuthenticated = () => user !== null && accessToken !== null;

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};