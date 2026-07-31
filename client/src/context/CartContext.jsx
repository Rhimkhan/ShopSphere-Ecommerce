import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shopsphere_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('shopsphere_saved_later');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync cart from server when user logs in
  useEffect(() => {
    if (user && user.token) {
      cartService
        .getCart()
        .then((serverCart) => {
          if (serverCart && serverCart.items && serverCart.items.length > 0) {
            const formattedItems = serverCart.items
              .filter((item) => item.product)
              .map((item) => ({
                _id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                discount: item.product.discount,
                images: item.product.images,
                category: item.product.category,
                stock: item.product.stock,
                quantity: item.quantity,
              }));
            setCartItems(formattedItems);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  // Persist cart items to local storage
  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shopsphere_saved_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        toast.success(`Updated quantity for ${product.name}`);
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        toast.success(`Added ${product.name} to cart!`);
        return [...prevItems, { ...product, quantity }];
      }
    });

    if (user) {
      cartService.addToCart(product._id, quantity).catch(() => {});
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    toast.success('Item removed from cart');
    if (user) {
      cartService.removeFromCart(productId).catch(() => {});
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === productId ? { ...item, quantity } : item))
    );
    if (user) {
      cartService.updateQuantity(productId, quantity).catch(() => {});
    }
  };

  const saveForLaterItem = (product) => {
    removeFromCart(product._id);
    setSavedForLater((prev) => [...prev, product]);
    toast.success('Moved item to Save for Later');
  };

  const moveToCartFromSaved = (product) => {
    setSavedForLater((prev) => prev.filter((item) => item._id !== product._id));
    addToCart(product, 1);
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = async (code) => {
    try {
      const result = await cartService.validateCoupon(code, subtotal);
      setAppliedCoupon(result);
      toast.success(result.message);
      return result;
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid coupon code';
      toast.error(msg);
      throw error;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const effectivePrice = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return acc + effectivePrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const taxAmount = (subtotal - discountAmount) * 0.08;
  const shippingAmount = subtotal > 100 || cartItems.length === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + taxAmount + shippingAmount);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cartItems,
    savedForLater,
    appliedCoupon,
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    shippingAmount: Number(shippingAmount.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
    totalCartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    saveForLaterItem,
    moveToCartFromSaved,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
