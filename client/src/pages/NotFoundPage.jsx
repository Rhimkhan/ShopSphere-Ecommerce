import React from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <CustomerLayout>
      <div className="text-center py-20 max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center text-3xl">
          <FaExclamationTriangle />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white font-sans">
          404 - Page Not Found
        </h1>
        <p className="text-xs text-gray-500">
          The requested page URL could not be found or has been moved.
        </p>
        <Link to="/" className="btn-primary text-xs inline-flex items-center gap-2">
          <FaHome /> Return to Homepage
        </Link>
      </div>
    </CustomerLayout>
  );
};

export default NotFoundPage;
