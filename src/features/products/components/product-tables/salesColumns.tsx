'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { BanknoteIcon, Calendar, Car, Filter, Text, User } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { format } from 'date-fns'; // ✅ ИСПРАВЛЕНО: было 'path'
import { ru } from 'date-fns/locale'; // ✅ Добавлено для локализации
import { SoldCar } from '@/types';
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

export const SALE_TYPES = [
  { value: 'cash', label: 'Наличные' },
  { value: 'credit', label: 'Кредит' }
];

export const BANKS = [
  { value: 'bereke', label: 'Береке Банк' },
  { value: 'kaspi', label: 'Каспи Банк' },
  { value: 'halyk', label: 'Халык Банк' }
];

export const COLORS = [
  { value: 'Чёрный', label: 'Чёрный' },
  { value: 'Белый', label: 'Белый' },
  { value: 'Серый', label: 'Серый' },
  { value: 'Серебристый', label: 'Серебристый' },
  { value: 'Синий', label: 'Синий' },
  { value: 'Красный', label: 'Красный' },
  { value: 'Зелёный', label: 'Зелёный' },
  { value: 'Коричневый', label: 'Коричневый' },
  { value: 'Оранжевый', label: 'Оранжевый' }
];

export const soldCarColumns: ColumnDef<SoldCar>[] = [
  {
    accessorKey: 'imageUrl',
    header: () => <div className='text-center'>Фото</div>,
    cell: ({ row }) => (
      <div className='relative mx-auto h-12 w-16'>
        <Image
          src={'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
          alt={`${row.original.brand} ${row.original.model}`}
          fill
          className='rounded-md object-cover'
        />
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 80,
    meta: {
      label: 'Фото'
    }
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
      options: BRANDS,
      icon: Car
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 100
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
    size: 120
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Год' />
    ),
    cell: ({ row }) => <div>{row.original.year}</div>,
    meta: {
      label: 'Год выпуска',
      variant: 'range',
      range: [2000, 2025],
      step: 1,
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
    size: 130
  },
  {
    accessorKey: 'saleType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Тип продажи' />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.saleType === 'cash' ? 'default' : 'destructive'}
      >
        {row.original.saleType === 'cash' ? 'Наличные' : 'Кредит'}
      </Badge>
    ),
    meta: {
      label: 'Тип продажи',
      variant: 'multiSelect',
      options: SALE_TYPES,
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 120
  },
  {
    accessorKey: 'bankCredit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Банк' />
    ),
    cell: ({ row }) => (
      <Badge variant='outline'>
        {BANKS.find((b) => b.value === row.original.bankCredit)?.label ||
          row.original.bankCredit}
      </Badge>
    ),
    meta: {
      label: 'Банк',
      variant: 'multiSelect',
      options: BANKS,
      icon: BanknoteIcon // 👈 Если у вас нет иконки Bank — замените на User или Filter
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 130
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
    size: 120
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цвет' />
    ),
    cell: ({ row }) => <Badge variant='secondary'>{row.original.color}</Badge>,
    meta: {
      label: 'Цвет',
      variant: 'multiSelect',
      options: COLORS,
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 100
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
      options: FUEL_TYPES,
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 100
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
      options: TRANSMISSIONS,
      icon: Filter
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 110
  },
  {
    accessorKey: 'bringEmployeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Загнал' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Image
          src={getEmployeePhoto(row.original.bringEmployeeId)}
          alt={getEmployeeName(row.original.bringEmployeeId)}
          width={24}
          height={24}
          className='rounded-full object-cover'
        />
        <span className='text-sm'>
          {getEmployeeName(row.original.bringEmployeeId)}
        </span>
      </div>
    ),
    meta: {
      label: 'Сотрудник (загнал)',
      variant: 'multiSelect',
      options: EMPLOYEES,
      icon: User
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 140
  },
  {
    accessorKey: 'saleEmployeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Продал' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Image
          src={getEmployeePhoto(row.original.saleEmployeeId)}
          alt={getEmployeeName(row.original.saleEmployeeId)}
          width={24}
          height={24}
          className='rounded-full object-cover'
        />
        <span className='text-sm'>
          {getEmployeeName(row.original.saleEmployeeId)}
        </span>
      </div>
    ),
    meta: {
      label: 'Сотрудник (продал)',
      variant: 'multiSelect',
      options: EMPLOYEES,
      icon: User
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 140
  },
  {
    accessorKey: 'marketgingEmployeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Маркетинг' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Image
          src={getEmployeePhoto(row.original.marketgingEmployeeId)}
          alt={getEmployeeName(row.original.marketgingEmployeeId)}
          width={24}
          height={24}
          className='rounded-full object-cover'
        />
        <span className='text-sm'>
          {getEmployeeName(row.original.marketgingEmployeeId)}
        </span>
      </div>
    ),
    meta: {
      label: 'Сотрудник (маркетинг)',
      variant: 'multiSelect',
      options: EMPLOYEES,
      icon: User
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    size: 140
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Добавлено' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {format(new Date(row.original.createdAt), 'dd MMM yyyy HH:mm', {
          locale: ru
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
    size: 150
  },
  {
    accessorKey: 'soldAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Продано' />
    ),
    cell: ({ row }) => (
      <div className='text-sm font-medium'>
        {format(new Date(row.original.soldAt), 'dd MMM yyyy HH:mm', {
          locale: ru
        })}
      </div>
    ),
    meta: {
      label: 'Дата продажи',
      variant: 'dateRange',
      icon: Calendar
    },
    filterFn: (row, id, filterValue: { from?: Date; to?: Date }) => {
      const date = new Date(row.getValue<string>(id));
      if (filterValue.from && date < filterValue.from) return false;
      if (filterValue.to && date > filterValue.to) return false;
      return true;
    },
    size: 150
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
    size: 200,
    meta: {
      label: 'Опции'
    }
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => (
      <div className='text-muted-foreground line-clamp-2 max-w-xs text-sm'>
        {row.original.description}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 250,
    meta: {
      label: 'Описание'
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    size: 60,
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      label: 'Действие'
    }
  }
];
