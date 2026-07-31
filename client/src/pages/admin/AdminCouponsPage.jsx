import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/common/Modal';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaTicketAlt } from 'react-icons/fa';

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: 15,
    expirationDate: '2030-12-31',
    minPurchaseAmount: 50,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCoupons();
      setCoupons(data || []);
    } catch (error) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCoupon(formData);
      toast.success('Promo coupon code created!');
      setModalOpen(false);
      setFormData({ code: '', discountPercentage: 15, expirationDate: '2030-12-31', minPurchaseAmount: 50 });
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Delete coupon code?')) {
      try {
        await adminService.deleteCoupon(id);
        toast.success('Coupon removed');
        fetchCoupons();
      } catch (error) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
              Promo Coupons & Discounts
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Create promotional discount codes and manage minimum purchase rules
            </p>
          </div>

          <button onClick={() => setModalOpen(true)} className="btn-primary text-xs py-2.5 px-4">
            <FaPlus /> Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div key={c._id} className="glass-card rounded-3xl p-5 border border-gray-200/60 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaTicketAlt className="text-amber-500 text-lg" />
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white tracking-wider font-mono">
                    {c.code}
                  </span>
                </div>
                <button onClick={() => handleDeleteCoupon(c._id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl">
                  <FaTrash className="text-xs" />
                </button>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <p>Discount: <strong className="text-emerald-600 font-extrabold">{c.discountPercentage}% OFF</strong></p>
                <p>Min Purchase: <strong>${c.minPurchaseAmount}</strong></p>
                <p className="text-[11px] text-gray-400">Expires: {new Date(c.expirationDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Coupon Code">
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Coupon Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. FLASH30"
              className="input-field text-xs py-2.5 font-mono uppercase"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Discount (% OFF) *</label>
            <input
              type="number"
              value={formData.discountPercentage}
              onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
              className="input-field text-xs py-2.5"
              required
              min={1}
              max={100}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Min Purchase ($)</label>
            <input
              type="number"
              value={formData.minPurchaseAmount}
              onChange={(e) => setFormData({ ...formData, minPurchaseAmount: Number(e.target.value) })}
              className="input-field text-xs py-2.5"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Expiration Date *</label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="input-field text-xs py-2.5"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary text-xs py-2.5">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2.5">
              Create Coupon
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCouponsPage;
