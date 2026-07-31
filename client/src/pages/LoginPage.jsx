import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaEnvelope, FaUserShield, FaUser } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const { login, adminLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (isAdminMode ? '/admin/dashboard' : '/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAdminMode) {
        await adminLogin(email, password);
        navigate('/admin/dashboard');
      } else {
        await login(email, password, rememberMe);
        navigate(from);
      }
    } catch (err) {
      // Error handled by AuthContext toast
    }
  };

  const fillDemoCustomer = () => {
    setIsAdminMode(false);
    setEmail('customer@shopsphere.com');
    setPassword('Customer@123456');
  };

  const fillDemoAdmin = () => {
    setIsAdminMode(true);
    setEmail('admin@shopsphere.com');
    setPassword('Admin@123456');
  };

  return (
    <CustomerLayout>
      <div className="max-w-md mx-auto py-12">
        <div className="glass-panel rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-glow">
              {isAdminMode ? <FaUserShield /> : <FaLock />}
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans">
              {isAdminMode ? 'Admin Portal Authentication' : 'Sign In to ShopSphere'}
            </h2>
            <p className="text-xs text-gray-500">
              {isAdminMode ? 'Enter administrator credentials' : 'Access your cart, order history & wishlist'}
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIsAdminMode(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                !isAdminMode
                  ? 'bg-white dark:bg-dark-card text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Customer Portal
            </button>
            <button
              type="button"
              onClick={() => setIsAdminMode(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                isAdminMode
                  ? 'bg-white dark:bg-dark-card text-amber-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Admin Portal
            </button>
          </div>

          {/* Quick Demo Shortcuts */}
          <div className="p-3 rounded-2xl bg-primary-50/50 dark:bg-primary-950/40 border border-primary-200/50 dark:border-primary-800 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-300">
              One-Click Demo Credentials:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 text-[11px] font-semibold border hover:border-primary-500 flex items-center justify-center gap-1"
              >
                <FaUser className="text-primary-600" /> Customer Demo
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 text-[11px] font-semibold border hover:border-amber-500 flex items-center justify-center gap-1"
              >
                <FaUserShield className="text-amber-500" /> Admin Demo
              </button>
            </div>
          </div>

          {/* Main Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="input-field text-xs pl-10 py-2.5"
                  required
                />
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs pl-10 py-2.5"
                  required
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary-600"
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="font-semibold text-primary-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-xs py-3">
              {loading ? 'Authenticating...' : isAdminMode ? 'Sign In as Admin' : 'Sign In'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-primary-600 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default LoginPage;
