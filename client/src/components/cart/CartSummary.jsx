import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import CouponSection from './CouponSection';

const CartSummary = ({ checkoutButton = true }) => {
  const { subtotal, discountAmount, taxAmount, shippingAmount, grandTotal, cartItems } = useCart();

  return (
    <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-6">
      <h3 className="text-base font-extrabold text-gray-900 dark:text-white font-sans pb-4 border-b border-gray-200 dark:border-gray-800">
        Order Summary
      </h3>

      {/* Pricing Breakdown */}
      <div className="space-y-3 text-xs">
        <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Coupon Discount</span>
            <span className="font-bold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
          <span>Estimated Tax (8%)</span>
          <span className="font-bold text-gray-900 dark:text-white">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400 font-medium">
          <span>Shipping Fee</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {shippingAmount === 0 ? (
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">FREE</span>
            ) : (
              `$${shippingAmount.toFixed(2)}`
            )}
          </span>
        </div>
      </div>

      <CouponSection />

      {/* Total */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Grand Total</span>
          <span className="text-2xl font-black text-primary-600 dark:text-primary-400 font-sans">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {checkoutButton && (
        <Link
          to="/checkout"
          className={`btn-primary w-full text-center py-3 ${cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
        >
          Proceed to Checkout <FaArrowRight className="text-xs" />
        </Link>
      )}

      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
        <FaShieldAlt className="text-emerald-500" /> Guaranteed 256-Bit SSL Encryption
      </div>
    </div>
  );
};

export default CartSummary;
