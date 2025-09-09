'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Calendar, Car, Filter, Text, User } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { BringCar } from '@/types';
import { format } from 'date-fns'; // ✅ ИСПРАВЛЕНО: было 'path'
import { ru } from 'date-fns/locale'; // ✅ Добавлено для локализации
import {
  BRANDS,
  EMPLOYEES,
  formatFeature,
  formatFuelType,
  formatTransmission,
  FUEL_TYPES,
  getEmployeeName,
  getEmployeePhoto,
  TRANSMISSIONS
} from '@/constants/data';

// =============================
// КОЛОНКИ — ТОЛЬКО ДЛЯ BringCar
// =============================

export const bringCarColumns: ColumnDef<BringCar>[] = [
  {
    accessorKey: 'imageUrl',
    header: () => <div className='text-center'>Фото</div>,
    cell: ({ row }) => (
      <div className='relative mx-auto h-12 w-16'>
        <Image
          src={row.original.imageUrl}
          alt={`${row.original.brand} ${row.original.model}`}
          fill
          className='rounded-md object-cover'
        />
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 80
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Марка' />
    ),
    cell: ({ row }) => <div className='font-medium'>{row.original.brand}</div>,
    meta: {
      label: 'Марка',
      variant: 'multiSelect',
      options: BRANDS, // ✅ Теперь { value, label }
      icon: Car
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    size: 120
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Модель' />
    ),
    cell: ({ row }) => <div>{row.original.model}</div>,
    meta: {
      label: 'Модель',
      variant: 'text',
      placeholder: 'Поиск модели...',
      icon: Text
    },
    enableColumnFilter: true,
    size: 140
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Год' />
    ),
    cell: ({ row }) => <div>{row.original.year}</div>,
    meta: {
      label: 'Дата добавления',
      variant: 'dateRange',
      icon: Calendar
    },
    filterFn: (row, id, filterValue: { from?: number; to?: number }) => {
      const year = row.getValue<number>(id);
      if (filterValue.from && year < filterValue.from) return false;
      if (filterValue.to && year > filterValue.to) return false;
      return true;
    },
    size: 80
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цена (₸)' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>
        {row.original.price.toLocaleString('ru-RU')} ₸
      </div>
    ),
    meta: {
      label: 'Цена',
      variant: 'range',
      range: [0, 50000000],
      step: 100000,
      unit: '₸',
      icon: Text
    },
    filterFn: (row, id, filterValue: { from?: number; to?: number }) => {
      const price = row.getValue<number>(id);
      if (filterValue.from && price < filterValue.from) return false;
      if (filterValue.to && price > filterValue.to) return false;
      return true;
    },
    size: 140
  },
  {
    accessorKey: 'mileage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Пробег (км)' />
    ),
    cell: ({ row }) => (
      <div>{row.original.mileage.toLocaleString('ru-RU')}</div>
    ),
    meta: {
      label: 'Пробег',
      variant: 'range',
      range: [0, 500000],
      step: 5000,
      icon: Car
    },
    filterFn: (row, id, filterValue: { from?: number; to?: number }) => {
      const mileage = row.getValue<number>(id);
      if (filterValue.from && mileage < filterValue.from) return false;
      if (filterValue.to && mileage > filterValue.to) return false;
      return true;
    },
    size: 140
  },
  {
    accessorKey: 'fuelType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Топливо' />
    ),
    cell: ({ row }) => (
      <Badge variant='secondary'>{formatFuelType(row.original.fuelType)}</Badge>
    ),
    meta: {
      label: 'Тип топлива',
      variant: 'multiSelect',
      options: FUEL_TYPES, // ✅ { value, label }
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    size: 120
  },
  {
    accessorKey: 'transmission',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Коробка' />
    ),
    cell: ({ row }) => (
      <Badge variant='outline'>
        {formatTransmission(row.original.transmission)}
      </Badge>
    ),
    meta: {
      label: 'Коробка передач',
      variant: 'multiSelect',
      options: TRANSMISSIONS, // ✅ { value, label }
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    size: 120
  },
  {
    accessorKey: 'employeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Сотрудник' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Image
          src={getEmployeePhoto(row.original.employeeId)}
          alt={getEmployeeName(row.original.employeeId)}
          width={28}
          height={28}
          className='rounded-full object-cover'
        />
        <span className='text-sm'>
          {getEmployeeName(row.original.employeeId)}
        </span>
      </div>
    ),
    meta: {
      label: 'Сотрудник',
      variant: 'multiSelect',
      options: EMPLOYEES, // ✅ { value, label, photo } — photo игнорируется фильтром, но тип допускает
      icon: User
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    size: 180
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Добавлено' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {format(new Date(row.original.createdAt), 'dd MMM yyyy HH:mm', {
          locale: ru // ✅ Используем русскую локаль
        })}
      </div>
    ),
    meta: {
      label: 'Дата добавления',
      variant: 'dateRange',
      icon: Calendar
    },
    filterFn: (row, id, filterValue: { from?: Date; to?: Date }) => {
      const date = new Date(row.getValue<string>(id));
      if (filterValue.from && date < filterValue.from) return false;
      if (filterValue.to && date > filterValue.to) return false;
      return true;
    },
    size: 160
  },
  {
    accessorKey: 'features',
    header: 'Опции',
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.features.length > 0 ? (
          row.original.features.slice(0, 3).map((f, i) => (
            <Badge key={i} variant='outline' className='text-xs'>
              {formatFeature(f)}
            </Badge>
          ))
        ) : (
          <span className='text-muted-foreground text-xs'>—</span>
        )}
        {row.original.features.length > 3 && (
          <Badge variant='secondary' className='text-xs'>
            +{row.original.features.length - 3}
          </Badge>
        )}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 200
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    size: 60,
    enableSorting: false,
    enableColumnFilter: false
  }
];
