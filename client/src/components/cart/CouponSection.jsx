import React, { useState } from 'react';
import { FaTag, FaTimes } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CouponSection = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      await applyCoupon(code.trim());
      setCode('');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-surface/50 border border-gray-200/60 dark:border-gray-800 space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200">
        <span className="flex items-center gap-1.5">
          <FaTag className="text-primary-600" /> Have a Coupon or Promo Code?
        </span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
          <div>
            <span className="font-bold uppercase tracking-wider">{appliedCoupon.code}</span>
            <span className="ml-2 font-medium">({appliedCoupon.discountPercentage}% OFF)</span>
          </div>
          <button onClick={removeCoupon} className="p-1 text-emerald-600 hover:text-rose-600">
            <FaTimes />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. SAVER20, WELCOME10"
            className="input-field text-xs uppercase"
          />
          <button type="submit" disabled={loading} className="btn-secondary text-xs px-4 flex-shrink-0">
            {loading ? '...' : 'Apply'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CouponSection;
