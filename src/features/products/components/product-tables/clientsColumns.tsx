'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ClientModal } from '@/components/clients/client-modal';
import { Clients } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const clientColumns: ColumnDef<Clients>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Имя' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
    meta: {
      label: 'Имя'
    },
    size: 150
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Телефон' />
    ),
    cell: ({ row }) => <div>{row.original.phone}</div>,
    meta: {
      label: 'Телефон'
    },
    size: 120
  },
  {
    accessorKey: 'wish',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Пожелания' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground line-clamp-2 max-w-xs text-sm'>
        {row.original.wish}
      </div>
    ),
    meta: {
      label: 'Пожелания'
    },
    size: 250
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Дата создания' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {new Date(row.original.createdAt).toLocaleDateString('ru-RU')}
      </div>
    ),
    meta: {
      label: 'Дата создания'
    },
    size: 120
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ClientModal
        mode='edit'
        client={row.original}
        trigger={
          <Button variant='ghost' size='sm'>
            <Edit className='h-4 w-4' />
          </Button>
        }
        onSuccess={() => {
          // Здесь можно добавить логику обновления таблицы
          console.log('Клиент обновлен');
        }}
      />
    ),
    size: 60,
    enableSorting: false,
    enableColumnFilter: false
  }
];
