import React, { useState } from 'react';
import { MessageSquarePlus, History, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import ActionForm from './ActionForm';
import ViewActionModal from './ViewActionModal';
import HistoryModal from './HistoryModal';
import { mockActions } from '../../utils/mockData';
import TableContainer from '../shared/TableContainer';

export default function ActionsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [editingAction, setEditingAction] = useState(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this action?')) {
      console.log('Delete action:', id);
    }
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    { header: 'Condition', accessor: 'condition' },
    { 
      header: 'Survey', 
      accessor: 'includeSurvey', 
      render: (value: boolean) => value ? 'Yes' : 'No' 
    },
    {
      header: 'Created At',
      accessor: 'createdAt',
      render: (value: string) => format(new Date(value), 'MMM d, yyyy HH:mm'),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id: string) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedActionId(id);
              setIsHistoryModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-900"
            title="View History"
          >
            <History size={20} />
          </button>
          <button
            onClick={() => {
              setSelectedActionId(id);
              setIsViewModalOpen(true);
            }}
            className="text-indigo-600 hover:text-indigo-900"
            title="View"
          >
            <MessageSquare size={20} />
          </button>
          <button
            onClick={() => {
              const action = mockActions.find(a => a.id === id);
              setEditingAction(action);
              setIsFormOpen(true);
            }}
            className="text-indigo-600 hover:text-indigo-900"
            title="Edit"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(mockActions.length / 20);

  return (
    <>
      <TableContainer
        title="Messaging Actions"
        icon={MessageSquare}
        totalCount={mockActions.length}
        totalLabel="Total Actions"
        columns={columns}
        data={mockActions}
        isLoading={false}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasNextPage={page < totalPages}
        hasPreviousPage={page > 1}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search actions..."
        primaryAction={{
          label: 'Add Action',
          icon: MessageSquarePlus,
          onClick: () => {
            setEditingAction(null);
            setIsFormOpen(true);
          }
        }}
      />

      {isFormOpen && (
        <ActionForm
          action={editingAction}
          onClose={() => {
            setIsFormOpen(false);
            setEditingAction(null);
          }}
        />
      )}

      {isViewModalOpen && selectedActionId && (
        <ViewActionModal
          actionId={selectedActionId}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedActionId(null);
          }}
        />
      )}

      {isHistoryModalOpen && selectedActionId && (
        <HistoryModal
          actionId={selectedActionId}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedActionId(null);
          }}
        />
      )}
    </>
  );
}