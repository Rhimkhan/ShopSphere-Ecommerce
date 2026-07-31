import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import SalesChart from '../../components/admin/SalesChart';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Skeleton from '../../components/common/Skeleton';
import adminService from '../../services/adminService';
import { FaUsers, FaShoppingBag, FaDollarSign, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminService.getDashboardStats(), adminService.getSalesAnalytics()])
      .then(([statsRes, chartRes]) => {
        setStats(statsRes);
        setChartData(chartRes || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
            Admin Overview & Insights
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time analytics for revenue, orders, customers, and inventory
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-32" count={4} />
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Revenue"
                value={`$${stats?.totalRevenue?.toFixed(2) || '0.00'}`}
                icon={FaDollarSign}
                color="emerald"
                subtext="Gross earnings from orders"
              />
              <StatsCard
                title="Total Orders"
                value={stats?.totalOrders || 0}
                icon={FaShoppingBag}
                color="indigo"
                subtext="Placed customer transactions"
              />
              <StatsCard
                title="Total Customers"
                value={stats?.totalUsers || 0}
                icon={FaUsers}
                color="amber"
                subtext="Registered customer accounts"
              />
              <StatsCard
                title="Active Products"
                value={stats?.totalProducts || 0}
                icon={FaBoxOpen}
                color="rose"
                subtext="Catalog items in inventory"
              />
            </div>

            {/* Sales Chart Analytics */}
            <SalesChart data={chartData} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders Table */}
              <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white font-sans">
                    Recent Customer Orders
                  </h3>
                  <Link to="/admin/orders" className="text-xs font-bold text-primary-600 hover:underline">
                    View All Orders &rarr;
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stats?.recentOrders?.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/50">
                          <td className="py-3 font-mono font-bold">#{order._id.slice(-6).toUpperCase()}</td>
                          <td className="py-3 font-medium text-gray-800 dark:text-gray-200">
                            {order.user?.name || 'Customer'}
                          </td>
                          <td className="py-3">
                            <OrderStatusBadge status={order.orderStatus} />
                          </td>
                          <td className="py-3 font-bold text-gray-900 dark:text-white">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white font-sans flex items-center gap-2">
                  <FaExclamationTriangle className="text-amber-500" /> Low Stock Alerts
                </h3>

                {stats?.lowStockAlerts?.length === 0 ? (
                  <p className="text-xs text-gray-500">All product inventories are well-stocked.</p>
                ) : (
                  <div className="space-y-3">
                    {stats?.lowStockAlerts?.map((prod) => (
                      <div
                        key={prod._id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs"
                      >
                        <div>
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 line-clamp-1">{prod.name}</h4>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400">SKU: {prod.sku}</span>
                        </div>
                        <span className="font-extrabold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2.5 py-1 rounded-xl">
                          {prod.stock} Left
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
