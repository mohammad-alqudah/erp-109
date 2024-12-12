import React, { ReactNode } from 'react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`header-${column.accessor}-${index}`}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id || `row-${Math.random()}`} className="hover:bg-gray-50">
              {columns.map((column, columnIndex) => (
                <td 
                  key={`cell-${row.id}-${column.accessor}-${columnIndex}`} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}