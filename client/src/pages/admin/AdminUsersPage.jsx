import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Skeleton from '../../components/common/Skeleton';
import Badge from '../../components/common/Badge';
import adminService from '../../services/adminService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboardStats()
      .then((data) => setUsers(data.recentCustomers || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
            Registered Customers Overview
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage customer profiles and inspect registered user accounts
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 overflow-x-auto">
          {loading ? (
            <Skeleton className="h-16" count={4} />
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Registered Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/50">
                    <td className="py-3 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      {u.name}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="py-3">
                      <Badge variant={u.role === 'Admin' ? 'warning' : 'primary'}>{u.role}</Badge>
                    </td>
                    <td className="py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
