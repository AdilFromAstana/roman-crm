// components/ui/table/data-table.tsx
'use client';

import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import type * as React from 'react';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
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
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          ...getCommonPinningStyles({ column: header.column })
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.length ? (
                  rows.map((row) => (
                    <TableRow
                      onClick={() => handleRowClick(row.original)}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className={
                        isClickable || onRowClick
                          ? 'hover:bg-muted/50 cursor-pointer'
                          : ''
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonPinningStyles({ column: cell.column })
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className='h-24 text-center'
                    >
                      Нет результатов.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
