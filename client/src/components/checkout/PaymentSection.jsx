import React from 'react';
import { FaCreditCard, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const PaymentSection = ({ paymentMethod, onSelectPaymentMethod, cardDetails, onCardDetailsChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
        <FaCreditCard className="text-primary-600" /> Select Payment Method
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stripe Option */}
        <div
          onClick={() => onSelectPaymentMethod('Stripe')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center gap-3 ${
            paymentMethod === 'Stripe'
              ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 shadow-glow'
              : 'border-gray-200/80 dark:border-gray-800 bg-white dark:bg-dark-surface/50'
          }`}
        >
          <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600">
            <FaCreditCard className="text-lg" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Credit / Debit Card (Stripe)</h4>
            <p className="text-[11px] text-gray-500">Instant online payment processing</p>
          </div>
        </div>

        {/* Cash On Delivery Option */}
        <div
          onClick={() => onSelectPaymentMethod('Cash On Delivery')}
          className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center gap-3 ${
            paymentMethod === 'Cash On Delivery'
              ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 shadow-glow'
              : 'border-gray-200/80 dark:border-gray-800 bg-white dark:bg-dark-surface/50'
          }`}
        >
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <FaMoneyBillWave className="text-lg" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Cash On Delivery (COD)</h4>
            <p className="text-[11px] text-gray-500">Pay cash upon doorstep package delivery</p>
          </div>
        </div>
      </div>

      {/* Mock Stripe Payment Card Form */}
      {paymentMethod === 'Stripe' && (
        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-dark-surface/60 border border-gray-200/80 dark:border-gray-800 space-y-3 mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200">
            <span>Stripe Encrypted Card Gateway</span>
            <FaShieldAlt className="text-emerald-500" />
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number (4242 •••• •••• 4242)"
              value={cardDetails.number}
              onChange={(e) => onCardDetailsChange('number', e.target.value)}
              className="input-field text-xs py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => onCardDetailsChange('expiry', e.target.value)}
                className="input-field text-xs py-2"
              />
              <input
                type="password"
                placeholder="CVC / CVV"
                value={cardDetails.cvc}
                onChange={(e) => onCardDetailsChange('cvc', e.target.value)}
                className="input-field text-xs py-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
