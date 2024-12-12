import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Edit, Trash2, UserPlus, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCustomers, deleteCustomer } from '../../services/api/customerApi';
import CustomerForm from './CustomerForm';
import { useDebounce } from '../../hooks/useDebounce';
import TableContainer from '../shared/TableContainer';

export default function CustomersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery(
    ['customers', page, debouncedSearch],
    () => getCustomers(page),
    {
      keepPreviousData: true,
    }
  );

  const deleteMutation = useMutation(deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
      toast.success('Customer deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete customer');
    },
  });

  const columns = [
    { 
      header: 'Name', 
      accessor: 'first_name',
      render: (_, customer) => (
        <span className="font-medium text-gray-900">
          {customer.first_name} {customer.last_name}
        </span>
      )
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone_number' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (_, customer) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingCustomer(customer);
              setIsFormOpen(true);
            }}
            className="text-indigo-600 hover:text-indigo-900"
            title="Edit"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this customer?')) {
                deleteMutation.mutate(customer.id);
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

  return (
    <>
      <TableContainer
        title="Customers"
        icon={Users}
        totalCount={data?.count}
        totalLabel="Total Customers"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading && !data}
        page={page}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={setPage}
        hasNextPage={!!data?.next}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search customers..."
        primaryAction={{
          label: 'Add Customer',
          icon: UserPlus,
          onClick: () => {
            setEditingCustomer(null);
            setIsFormOpen(true);
          }
        }}
      />

      {isFormOpen && (
        <CustomerForm
          customer={editingCustomer}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCustomer(null);
          }}
        />
      )}
    </>
  );
}