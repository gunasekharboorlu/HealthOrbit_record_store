import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const Table = React.memo(function Table({ headers, children, className = '' }: TableProps) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-[#E5E5E7] bg-white ${className}`}>
      <table className="w-full text-left text-xs">
        <thead className="bg-[#F5F5F7] text-[#6E6E73] font-mono text-[10px] uppercase border-b border-[#E5E5E7] tracking-wider">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F5F5F7]">{children}</tbody>
      </table>
    </div>
  );
});

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  emptyMessage = 'No records found.',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <Table headers={columns.map((c) => c.header)}>
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="text-center py-8 text-[#86868B] font-mono text-xs">
            {emptyMessage}
          </td>
        </tr>
      ) : (
        data.map((row, idx) => (
          <tr
            key={row.id || idx}
            onClick={() => onRowClick && onRowClick(row)}
            className={`hover:bg-[#F5F5F7] transition-colors ${
              onRowClick ? 'cursor-pointer' : ''
            }`}
          >
            {columns.map((col, cIdx) => (
              <td key={cIdx} className={`px-5 py-3.5 text-[#1D1D1F] ${col.className || ''}`}>
                {typeof col.accessor === 'function'
                  ? col.accessor(row)
                  : (row[col.accessor] as unknown as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))
      )}
    </Table>
  );
}
