// components/ui/table/data-table.tsx
'use client';

import type * as React from 'react';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import { Table } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: any;
  actionBar?: React.ReactNode;
  basePath: string;
  tableType?: string;
  onRowClick?: (data: string) => void;
  getId?: (row: TData) => string;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  basePath,
  tableType,
  onRowClick,
  getId = (row: any) => row.id,
  ...props
}: DataTableProps<TData>) {
  const router = useRouter();

  // Типы таблиц, где включена навигация по клику
  const clickableTypes = ['bring-car', 'sale-car'];
  const isClickable = clickableTypes.some((type) => basePath.includes(type));

  // Функция обработки клика по строке
  const handleRowClick = (row: TData) => {
    const id = getId(row);
    if (isClickable) {
      router.push(`${basePath}/${id}`);
    } else if (onRowClick) {
      onRowClick(id);
    }
  };

  // Проверяем, готова ли таблица
  console.log('table: ', table);
  const isTableReady =
    table && table?.getRowModel() && table?.getHeaderGroups();
  const rows = isTableReady ? (table?.getRowModel().rows ?? []) : [];

  // Показываем индикатор загрузки пока таблица не готова
  if (!isTableReady) {
    return (
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='text-primary h-6 w-6 animate-spin' />
          <p className='text-muted-foreground text-sm'>Загрузка таблицы...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col space-y-4' {...props}>
      {children}
      <div className='relative flex flex-1'>
        <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <Table></Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
