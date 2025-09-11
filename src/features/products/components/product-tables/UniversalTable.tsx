// components/tables/universal-table.tsx
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface UniversalTableProps<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  tableType: string;
  basePath: string;
  onRowClick?: (id: string) => void;
}

export function UniversalTable<TData, TValue>({
  data,
  totalItems,
  columns,
  tableType,
  basePath,
  onRowClick
}: UniversalTableProps<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500,
    tableType
  });

  return (
    <DataTable
      table={table}
      basePath={basePath}
      tableType={tableType}
      onRowClick={onRowClick}
    >
      <DataTableToolbar table={table} tableType={tableType} />
    </DataTable>
  );
}
