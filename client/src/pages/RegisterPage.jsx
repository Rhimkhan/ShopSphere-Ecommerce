import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Customer');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password, role);
      navigate(role === 'Admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      // Error handled in AuthContext toast
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-md mx-auto py-12">
        <div className="glass-panel rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-glow">
              <FaUserPlus />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans">
              Create Your Account
            </h2>
            <p className="text-xs text-gray-500">
              Join ShopSphere to save wishlist items, track orders & enjoy coupons
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input-field text-xs pl-10 py-2.5"
                  required
                />
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

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
                Password (min 6 chars)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs pl-10 py-2.5"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-xs pl-10 py-2.5"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Account Type / Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field text-xs py-2.5"
              >
                <option value="Customer">Customer Account</option>
                <option value="Admin">Administrator Account</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-xs py-3">
              {loading ? 'Creating Account...' : 'Register Account'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default RegisterPage;
