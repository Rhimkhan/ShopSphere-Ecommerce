import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import orderService from '../../services/orderService';
import toast from 'react-hot-toast';
import { FaEdit, FaFilePdf } from 'react-icons/fa';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('Pending');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setTrackingNumber(order.trackingNumber || '');
    setModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await orderService.updateOrderStatus(selectedOrder._id, {
        status: newStatus,
        trackingNumber,
      });
      toast.success('Order status updated!');
      setModalOpen(false);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter((o) => o.orderStatus === statusFilter);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
              Customer Orders Workflow
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Review placed orders, update fulfillment statuses, and issue invoices
            </p>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-xs py-2 w-48"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 overflow-x-auto">
          {loading ? (
            <Skeleton className="h-16" count={5} />
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/50">
                    <td className="py-3 font-mono font-bold">#{o._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 font-medium text-gray-800 dark:text-gray-200">
                      {o.user?.name || 'Customer'}
                      <span className="block text-[10px] text-gray-400">{o.user?.email}</span>
                    </td>
                    <td className="py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <OrderStatusBadge status={o.orderStatus} />
                    </td>
                    <td className="py-3 font-extrabold text-gray-900 dark:text-white">
                      ${o.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <a
                        href={orderService.getInvoiceUrl(o._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 inline-block"
                        title="Download Invoice PDF"
                      >
                        <FaFilePdf />
                      </a>
                      <button
                        onClick={() => handleOpenStatusModal(o)}
                        className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                        title="Update Order Status"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Update Order Status">
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Select Fulfillment Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input-field text-xs py-2.5"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Shipment Tracking Number
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. TRK-984029"
              className="input-field text-xs py-2.5 font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn-secondary text-xs py-2.5"
            >
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary text-xs py-2.5">
              {submitting ? 'Updating...' : 'Save Order Status'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
