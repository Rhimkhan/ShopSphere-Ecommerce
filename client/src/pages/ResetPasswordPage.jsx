import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const { token: tokenParam } = useParams();
  const [token, setToken] = useState(tokenParam || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      toast.success('Password reset successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to reset password';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-md mx-auto py-12">
        <div className="glass-panel rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl shadow-md">
              <FaLock />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans">
              Set New Password
            </h2>
            <p className="text-xs text-gray-500">
              Enter your reset token and your new account password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Reset Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter reset token string"
                className="input-field text-xs py-2.5 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                New Password (min 6 chars)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field text-xs py-2.5"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field text-xs py-2.5"
                required
                minLength={6}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-xs py-3">
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ResetPasswordPage;
