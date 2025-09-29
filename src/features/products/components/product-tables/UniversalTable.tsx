// components/tables/universal-table.tsx
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { parseAsInteger, useQueryState } from 'nuqs';

interface UniversalTableProps<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: any[];
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

  return (
    <DataTable
      table={data}
      basePath={basePath}
      tableType={tableType}
      onRowClick={onRowClick}
    >
      <DataTableToolbar table={data} tableType={tableType} />
    </DataTable>
  );
}
