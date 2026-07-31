import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import { FaEnvelope, FaKey } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sentToken, setSentToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      toast.success('Password reset token generated successfully!');
      if (res.resetToken) {
        setSentToken(res.resetToken);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send reset link';
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
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl shadow-md">
              <FaKey />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-sans">
              Forgot Password
            </h2>
            <p className="text-xs text-gray-500">
              Enter your registered account email address to receive password reset instructions
            </p>
          </div>

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

            <button type="submit" disabled={loading} className="btn-primary w-full text-xs py-3">
              {loading ? 'Sending Request...' : 'Send Password Reset Link'}
            </button>
          </form>

          {sentToken && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Password Reset Token Generated:
              </p>
              <code className="block p-2 rounded bg-white dark:bg-dark-card font-mono text-[11px] select-all break-all">
                {sentToken}
              </code>
              <Link
                to={`/reset-password/${sentToken}`}
                className="btn-accent text-[11px] py-1.5 px-3 inline-block mt-2"
              >
                Proceed to Reset Password &rarr;
              </Link>
            </div>
          )}

          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link to="/login" className="text-xs font-bold text-primary-600 hover:underline">
              &larr; Back to Login
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ForgotPasswordPage;
