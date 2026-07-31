import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard-stats');
    return response.data;
  },

  getSalesAnalytics: async () => {
    const response = await api.get('/admin/sales-analytics');
    return response.data;
  },

  getCoupons: async () => {
    const response = await api.get('/coupons');
    return response.data;
  },

  createCoupon: async (couponData) => {
    const response = await api.post('/coupons', couponData);
    return response.data;
  },

  deleteCoupon: async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  },

  exportOrdersCSV: () => {
    const baseURL = import.meta.env.VITE_API_URL || '/api';
    window.open(`${baseURL}/admin/export-orders-csv`, '_blank');
  },
};

export default adminService;
