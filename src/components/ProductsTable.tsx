import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Edit, Trash2, Upload, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProducts, deleteProduct } from '../services/api/productApi';
import ProductForm from './ProductForm';
import ImportProductsModal from './ImportProductsModal';
import SearchField from './shared/SearchField';
import { useDebounce } from '../hooks/useDebounce';

export default function ProductsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery(
    ['products', page, debouncedSearch],
    () => getProducts(page, debouncedSearch),
    {
      keepPreviousData: true,
    }
  );

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  if (isLoading && !data) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-gray-500" />
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
              Total Products: {data?.count.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-96">
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder="Search products..."
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
            >
              <Edit size={20} />
              Add Product
            </button>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Upload size={20} />
              Import Products
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Number(product.price).toFixed(3)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsFormOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {Math.ceil((data?.count || 0) / 20)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!data?.next}
              className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {isImportModalOpen && (
        <ImportProductsModal
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </div>
  );
}