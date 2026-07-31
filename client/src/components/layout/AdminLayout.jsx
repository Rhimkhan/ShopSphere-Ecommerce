import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  FaChartPie,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaTags,
  FaTicketAlt,
  FaStore,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaFileCsv,
} from 'react-icons/fa';
import adminService from '../../services/adminService';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaChartPie },
    { label: 'Products', path: '/admin/products', icon: FaBoxOpen },
    { label: 'Orders', path: '/admin/orders', icon: FaShoppingBag },
    { label: 'Customers', path: '/admin/users', icon: FaUsers },
    { label: 'Categories', path: '/admin/categories', icon: FaTags },
    { label: 'Coupons', path: '/admin/coupons', icon: FaTicketAlt },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 overflow-hidden">
      {/* Sidebar Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white font-sans">
                Admin<span className="text-amber-500">Hub</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all ${
                    active
                      ? 'bg-primary-600 text-white shadow-glow'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="text-base" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <button
            onClick={() => adminService.exportOrdersCSV()}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors"
          >
            <FaFileCsv className="text-sm" /> Export Orders CSV
          </button>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 font-semibold text-xs hover:bg-gray-200 transition-colors"
          >
            <FaStore /> Back to Storefront
          </Link>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              {darkMode ? <FaSun className="text-amber-400" /> : <FaMoon className="text-indigo-600" />}
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 p-2 hover:bg-rose-50 rounded-xl"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64">
        {/* Top bar for mobile trigger & user info */}
        <header className="h-16 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300"
          >
            <FaBars className="text-lg" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {user?.name} (Admin)
            </span>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full object-cover border border-amber-500"
            />
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
