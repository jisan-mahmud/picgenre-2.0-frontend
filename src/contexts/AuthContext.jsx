import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setTokenGetters } from '../api_call/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Set token getters for axios interceptors
  useEffect(() => {
    setTokenGetters(
      () => accessToken,
      () => refreshToken
    );
  }, [accessToken, refreshToken]);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const token = await firebaseUser.getIdToken();
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        setUser(firebaseUser);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      } else {
        // User is signed out
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

  const login = async (tokens) => {
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = () => {
    return user !== null && accessToken !== null;
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};