import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('shopsphere_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user && user.token) {
      userService
        .getProfile()
        .then((data) => {
          if (data && data.wishlist) {
            setWishlist(data.wishlist);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isPresent = wishlist.some((item) => (item._id || item) === product._id);

    if (isPresent) {
      setWishlist((prev) => prev.filter((item) => (item._id || item) !== product._id));
      toast.success('Removed from wishlist');
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success('Added to wishlist!');
    }

    if (user) {
      userService.toggleWishlist(product._id).catch(() => {});
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  };

  const value = {
    wishlist,
    toggleWishlist,
    isWishlisted,
    wishlistCount: wishlist.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
