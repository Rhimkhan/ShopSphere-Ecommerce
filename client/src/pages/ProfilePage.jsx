import React, { useState, useEffect } from 'react';
import CustomerLayout from '../components/layout/CustomerLayout';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import AddressForm from '../components/checkout/AddressForm';
import toast from 'react-hot-toast';
import { FaUser, FaLock, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateUserState } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'addresses' | 'password'

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    userService
      .getProfile()
      .then((data) => {
        if (data) {
          setFormData({ name: data.name, email: data.email, phone: data.phone || '' });
          setAddresses(data.addresses || []);
          if (data.avatar) setAvatarPreview(data.avatar);
        }
      })
      .catch(() => {});
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const updated = await userService.updateProfile(data);
      updateUserState(updated);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('password', passwordData.newPassword);
      await userService.updateProfile(data);
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
            Account Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal profile, delivery addresses, and security passwords
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Tab Menu */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 text-center space-y-3">
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={avatarPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary-500 shadow-glow"
                />
                <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-600 text-white cursor-pointer hover:bg-primary-700 shadow-md">
                  <FaCamera className="text-xs" />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600">
                  {user?.role} Account
                </span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-2 border border-gray-200/60 dark:border-gray-800 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'
                }`}
              >
                <FaUser /> Profile Information
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'
                }`}
              >
                <FaMapMarkerAlt /> Address Book
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'password'
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface'
                }`}
              >
                <FaLock /> Security & Password
              </button>
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-8">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field text-xs py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field text-xs py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field text-xs py-2.5"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5">
                  {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </form>
            )}

            {activeTab === 'addresses' && (
              <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800">
                <AddressForm
                  userAddresses={addresses}
                  selectedAddress={null}
                  onSelectAddress={() => {}}
                />
              </div>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Change Security Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="input-field text-xs py-2.5"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="input-field text-xs py-2.5"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5">
                  {saving ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ProfilePage;
