import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTag, FaCopy, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PromoBanner = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText('SAVER20');
    setCopied(true);
    toast.success('Coupon code SAVER20 copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-700 to-primary-800 text-white p-8 sm:p-12 mb-16 shadow-xl border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-gray-900">
            <FaTag /> Limited Time Coupon
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Get <span className="text-amber-300">20% Off</span> Your First Checkout Order
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-lg">
            Use promo code <strong className="text-white">SAVER20</strong> at checkout to claim instant 20% discount on all electronics, clothing, and home accessories.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={copyCoupon}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-all shadow-md active:scale-95"
            >
              {copied ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
              <span>{copied ? 'Copied!' : 'SAVER20'}</span>
            </button>
            <Link to="/products" className="text-xs font-bold underline hover:text-amber-300">
              Shop Qualifying Items &rarr;
            </Link>
          </div>
        </div>

        {/* Timer */}
        <div className="md:col-span-4 flex justify-start md:justify-end">
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-center">
              <span className="text-2xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[10px] uppercase text-gray-300">Hours</span>
            </div>
            <span className="text-xl font-bold text-amber-400">:</span>
            <div className="text-center">
              <span className="text-2xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="block text-[10px] uppercase text-gray-300">Mins</span>
            </div>
            <span className="text-xl font-bold text-amber-400">:</span>
            <div className="text-center">
              <span className="text-2xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="block text-[10px] uppercase text-gray-300">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
