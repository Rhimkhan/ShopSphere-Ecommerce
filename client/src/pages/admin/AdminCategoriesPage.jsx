import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/common/Modal';
import productService from '../../services/productService';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaBoxes } from 'react-icons/fa';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await productService.getCategories();
      setCategories(data || []);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: newCatName, description: newCatDesc });
      toast.success('Category created!');
      setModalOpen(false);
      setNewCatName('');
      setNewCatDesc('');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Delete category?')) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Category deleted');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
              Category Department Manager
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add and manage store categories and product departments
            </p>
          </div>

          <button onClick={() => setModalOpen(true)} className="btn-primary text-xs py-2.5 px-4">
            <FaPlus /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat._id} className="glass-card rounded-3xl p-5 border border-gray-200/60 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                  <FaBoxes className="text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{cat.name}</h4>
                  <p className="text-[11px] text-gray-400 font-mono">slug: /{cat.slug}</p>
                </div>
              </div>

              <button onClick={() => handleDeleteCategory(cat._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl">
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Category">
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Category Name *</label>
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Smart Watches"
              className="input-field text-xs py-2.5"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input
              type="text"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="e.g. Modern wearable smart electronics"
              className="input-field text-xs py-2.5"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary text-xs py-2.5">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2.5">
              Save Category
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
