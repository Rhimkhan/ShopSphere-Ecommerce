import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductModal from '../../components/admin/ProductModal';
import Skeleton from '../../components/common/Skeleton';
import Badge from '../../components/common/Badge';
import productService from '../../services/productService';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({ keyword, pageSize: 50 });
      setProducts(data.products || []);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
              Product Inventory Management
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add new products, edit pricing, update stock levels, and upload images
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setModalOpen(true);
            }}
            className="btn-primary text-xs py-2.5 px-4"
          >
            <FaPlus /> Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Filter products by title, SKU or brand..."
            className="input-field text-xs pl-10 py-2.5"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        </div>

        {/* Products Table */}
        <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 overflow-x-auto">
          {loading ? (
            <Skeleton className="h-16" count={5} />
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">SKU</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((prod) => (
                  <tr key={prod._id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 max-w-[200px]">
                            {prod.name}
                          </h4>
                          <span className="text-[10px] text-gray-400">{prod.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{prod.category}</td>
                    <td className="py-3 font-bold text-gray-900 dark:text-white">
                      ${prod.price.toFixed(2)}
                      {prod.discount > 0 && (
                        <span className="text-[10px] text-rose-500 block">-{prod.discount}%</span>
                      )}
                    </td>
                    <td className="py-3">
                      {prod.stock <= 5 ? (
                        <Badge variant="danger" size="sm">
                          Low: {prod.stock}
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          {prod.stock} Units
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-gray-500">{prod.sku}</td>
                    <td className="py-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(prod);
                          setModalOpen(true);
                        }}
                        className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod._id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSave={fetchProducts}
      />
    </AdminLayout>
  );
};

export default AdminProductsPage;
