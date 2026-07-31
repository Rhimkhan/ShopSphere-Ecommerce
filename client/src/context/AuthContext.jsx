import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shopsphere_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // Sync profile when authenticated
  useEffect(() => {
    if (user && user.token) {
      userService
        .getProfile()
        .then((data) => {
          setUser((prev) => ({ ...prev, ...data }));
        })
        .catch(() => {
          // Token might be invalid
        });
    }
  }, []);

  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data);
      if (rememberMe) {
        localStorage.setItem('shopsphere_user', JSON.stringify(data));
      } else {
        sessionStorage.setItem('shopsphere_user', JSON.stringify(data));
      }
      toast.success(`Welcome back, ${data.name}!`);
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.adminLogin(email, password);
      setUser(data);
      localStorage.setItem('shopsphere_user', JSON.stringify(data));
      toast.success(`Admin Login Successful. Welcome ${data.name}!`);
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Admin login failed';
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'Customer') => {
    setLoading(true);
    try {
      const data = await authService.register({ name, email, password, role });
      setUser(data);
      localStorage.setItem('shopsphere_user', JSON.stringify(data));
      toast.success(`Account created successfully! Welcome to ShopSphere.`);
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopsphere_user');
    sessionStorage.removeItem('shopsphere_user');
    toast.success('Logged out successfully');
  };

  const updateUserState = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
    localStorage.setItem('shopsphere_user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'Admin',
    login,
    adminLogin,
    register,
    logout,
    updateUserState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
