import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Edit, Trash2, Upload, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProducts, deleteProduct } from '../../services/api/productApi';
import ProductForm from './ProductForm';
import ImportProductsModal from './ImportProductsModal';
import { useDebounce } from '../../hooks/useDebounce';
import TableContainer from '../shared/TableContainer';

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

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Barcode', accessor: 'barcode' },
    { 
      header: 'Name', 
      accessor: 'name',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    { 
      header: 'Price', 
      accessor: 'price',
      render: (value: string) => `$${Number(value).toFixed(3)}`
    },
    { header: 'Quantity', accessor: 'quantity' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (_, product) => (
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
      ),
    },
  ];

  const totalPages = Math.ceil((data?.count || 0) / 20);

  return (
    <>
      <TableContainer
        title="Products"
        icon={Package}
        totalCount={data?.count}
        totalLabel="Total Products"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasNextPage={page < totalPages}
        hasPreviousPage={page > 1}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products..."
        primaryAction={{
          label: 'Add Product',
          icon: Edit,
          onClick: () => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }
        }}
        secondaryAction={{
          label: 'Import Products',
          icon: Upload,
          onClick: () => setIsImportModalOpen(true)
        }}
      />

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
    </>
  );
}