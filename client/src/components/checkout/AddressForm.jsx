import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPlus, FaCheckCircle } from 'react-icons/fa';
import userService from '../../services/userService';
import toast from 'react-hot-toast';

const AddressForm = ({ userAddresses = [], selectedAddress, onSelectAddress }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
  });

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const updatedList = await userService.addAddress(formData);
      toast.success('Shipping address added!');
      if (updatedList && updatedList.length > 0) {
        onSelectAddress(updatedList[updatedList.length - 1]);
      }
      setShowAddModal(false);
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary-600" /> Shipping & Billing Address
        </h3>
        <button
          type="button"
          onClick={() => setShowAddModal((prev) => !prev)}
          className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
        >
          <FaPlus className="text-[10px]" /> Add New Address
        </button>
      </div>

      {/* Address Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userAddresses.map((addr, idx) => {
          const isSelected = selectedAddress && selectedAddress._id === addr._id;
          return (
            <div
              key={addr._id || idx}
              onClick={() => onSelectAddress(addr)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 shadow-glow'
                  : 'border-gray-200/80 dark:border-gray-800 bg-white dark:bg-dark-surface/50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{addr.fullName}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{addr.streetAddress}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">Phone: {addr.phone}</p>
                </div>
                {isSelected && <FaCheckCircle className="text-primary-600 text-lg" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Form to add address */}
      {showAddModal && (
        <form onSubmit={handleAddAddress} className="glass-card rounded-2xl p-5 border border-primary-200 dark:border-primary-800 space-y-3 mt-4">
          <h4 className="text-xs font-bold text-gray-900 dark:text-white">New Delivery Address</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              className="input-field text-xs py-2 sm:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
            <input
              type="text"
              placeholder="State / Province"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
            <input
              type="text"
              placeholder="ZIP / Postal Code"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="input-field text-xs py-2"
              required
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="btn-secondary text-xs py-2"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2">
              Save & Use Address
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressForm;
