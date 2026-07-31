import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import OrderStatusBadge from '../components/admin/OrderStatusBadge';
import Skeleton from '../components/common/Skeleton';
import orderService from '../services/orderService';
import { FaFilePdf, FaCheck, FaTruck, FaBox, FaClock, FaTimesCircle } from 'react-icons/fa';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then((data) => setOrder(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <CustomerLayout>
        <Skeleton className="h-96" />
      </CustomerLayout>
    );
  }

  if (!order) {
    return (
      <CustomerLayout>
        <div className="text-center py-16">
          <h2 className="text-lg font-bold">Order Not Found</h2>
          <Link to="/orders" className="btn-primary text-xs mt-4 inline-block">
            Back to Orders
          </Link>
        </div>
      </CustomerLayout>
    );
  }

  // Tracking Timeline steps
  const steps = [
    { label: 'Pending', icon: FaClock },
    { label: 'Confirmed', icon: FaCheck },
    { label: 'Packed', icon: FaBox },
    { label: 'Shipped', icon: FaTruck },
    { label: 'Delivered', icon: FaCheck },
  ];

  const currentStepIdx = steps.findIndex((s) => s.label === order.orderStatus);

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <OrderStatusBadge status={order.orderStatus} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()} • Tracking #: {' '}
              <strong className="text-primary-600 dark:text-primary-400">{order.trackingNumber || 'N/A'}</strong>
            </p>
          </div>

          <a
            href={orderService.getInvoiceUrl(order._id)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
          >
            <FaFilePdf /> Download PDF Invoice
          </a>
        </div>

        {/* Order Status Tracking Timeline */}
        {order.orderStatus !== 'Cancelled' ? (
          <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Package Delivery Timeline
            </h3>

            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-primary-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${(Math.max(0, currentStepIdx) / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = currentStepIdx >= idx;
                const isCurrent = currentStepIdx === idx;

                return (
                  <div key={step.label} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isCompleted
                          ? 'bg-primary-600 text-white shadow-glow'
                          : 'bg-white dark:bg-dark-card border-2 border-gray-300 dark:border-gray-700 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary-500/30 scale-110' : ''}`}
                    >
                      <Icon />
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 ${
                        isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center gap-3 text-rose-700 dark:text-rose-300 text-xs font-bold">
            <FaTimesCircle className="text-xl" /> Order was cancelled. If you were charged, a refund has been initiated.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Products List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Ordered Items</h3>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {order.products.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Address & Payment Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Shipping Address</h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p className="font-bold text-gray-900 dark:text-white">{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.streetAddress}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                <p>Phone: {order.shippingAddress?.phone}</p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-2 text-xs">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Payment Summary</h3>
              <div className="flex justify-between text-gray-600">
                <span>Method</span>
                <span className="font-bold text-gray-900 dark:text-white">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.itemsPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${order.taxPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${order.shippingPrice?.toFixed(2)}</span>
              </div>
              {order.discountPrice > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-${order.discountPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between font-bold text-sm text-gray-900 dark:text-white">
                <span>Grand Total</span>
                <span>${order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderDetailPage;
