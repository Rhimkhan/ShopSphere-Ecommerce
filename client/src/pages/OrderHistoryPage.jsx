import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import OrderStatusBadge from '../components/admin/OrderStatusBadge';
import Skeleton from '../components/common/Skeleton';
import orderService from '../services/orderService';
import { FaFilePdf, FaEye, FaBoxes } from 'react-icons/fa';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((data) => setOrders(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            My Order History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track package delivery status and download official PDF invoices
          </p>
        </div>

        {loading ? (
          <Skeleton className="h-40" count={3} />
        ) : orders.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary-600 text-2xl">
              <FaBoxes />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              No Past Orders Found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You haven't placed any orders yet. Start exploring our product catalog!
            </p>
            <Link to="/products" className="btn-primary text-xs inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-sans">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </span>
                      <OrderStatusBadge status={order.orderStatus} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} • Payment:{' '}
                      <strong className="text-gray-700 dark:text-gray-300">{order.paymentMethod}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={orderService.getInvoiceUrl(order._id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                    >
                      <FaFilePdf className="text-rose-500" /> Invoice PDF
                    </a>
                    <Link
                      to={`/orders/${order._id}`}
                      className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                    >
                      <FaEye /> Track Order
                    </Link>
                  </div>
                </div>

                {/* Products Thumbnails & Total */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-100"
                        />
                        <div className="text-xs">
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 max-w-[150px]">
                            {item.name}
                          </p>
                          <p className="text-gray-500">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-right">
                    <span className="block text-[11px] text-gray-400 font-bold uppercase">Grand Total</span>
                    <span className="text-lg font-black text-gray-900 dark:text-white">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default OrderHistoryPage;
