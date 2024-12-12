import React from 'react';
import { LucideIcon } from 'lucide-react';
import TableHeader from './TableHeader';
import TableActions from './TableActions';
import DataTable from './DataTable';
import Pagination from './Pagination';
import Button from './Button';

interface TableContainerProps {
  title: string;
  icon: LucideIcon;
  totalCount?: number;
  totalLabel?: string;
  columns: Array<{
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  isLoading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  primaryAction?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export default function TableContainer({
  title,
  icon,
  totalCount,
  totalLabel,
  columns,
  data,
  isLoading,
  page,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage = page > 1,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  primaryAction,
  secondaryAction,
}: TableContainerProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <TableHeader
          title={title}
          icon={icon}
          totalCount={totalCount}
          totalLabel={totalLabel}
        />
        
        <TableActions
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
        >
          {primaryAction && (
            <Button
              variant="primary"
              icon={primaryAction.icon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="success"
              icon={secondaryAction.icon}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </TableActions>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          keyField="id"
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
}