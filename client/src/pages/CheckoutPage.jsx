import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/layout/CustomerLayout';
import AddressForm from '../components/checkout/AddressForm';
import PaymentSection from '../components/checkout/PaymentSection';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import userService from '../services/userService';
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, subtotal, taxAmount, shippingAmount, discountAmount, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    if (user) {
      userService.getProfile().then((data) => {
        if (data && data.addresses) {
          setAddresses(data.addresses);
          const defaultAddr = data.addresses.find((a) => a.isDefault) || data.addresses[0];
          setSelectedAddress(defaultAddr || null);
        }
      }).catch(() => {});
    }
  }, [user, cartItems]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select or add a shipping address');
      return;
    }

    if (paymentMethod === 'Stripe' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
      toast.error('Please complete the Stripe credit card information');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: selectedAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: taxAmount,
        shippingPrice: shippingAmount,
        discountPrice: discountAmount,
        totalPrice: grandTotal,
      };

      const createdOrder = await orderService.createOrder(orderPayload);
      clearCart();
      toast.success('Order Placed Successfully!');
      navigate(`/orders/${createdOrder._id}`);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to place order';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Complete your order placement securely using 256-bit encrypted gateway
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Options */}
          <div className="lg:col-span-8 space-y-8">
            {/* Address Selection */}
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800">
              <AddressForm
                userAddresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={(addr) => setSelectedAddress(addr)}
              />
            </div>

            {/* Payment Gateway Selection */}
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800">
              <PaymentSection
                paymentMethod={paymentMethod}
                onSelectPaymentMethod={(m) => setPaymentMethod(m)}
                cardDetails={cardDetails}
                onCardDetailsChange={(field, val) => setCardDetails((prev) => ({ ...prev, [field]: val }))}
              />
            </div>
          </div>

          {/* Right Summary & Place Order */}
          <div className="lg:col-span-4 space-y-4">
            <CartSummary checkoutButton={false} />

            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="btn-primary w-full text-center py-3.5 text-sm flex items-center justify-center gap-2"
            >
              <FaLock className="text-xs" />
              {submitting ? 'Processing Payment...' : `Pay $${grandTotal.toFixed(2)} & Place Order`}
            </button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CheckoutPage;
