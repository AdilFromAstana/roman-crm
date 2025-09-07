'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import {
  Calendar,
  Car,
  CheckCircle2,
  Filter,
  Text,
  User,
  XCircle
} from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';
import { BringCar } from '@/types';
import { format } from 'date-fns'; // ✅ ИСПРАВЛЕНО: было 'path'
import { ru } from 'date-fns/locale'; // ✅ Добавлено для локализации

// =============================
// КОНСТАНТЫ — СТАНДАРТИЗИРОВАНЫ ПОД { value, label }
// =============================

export const EMPLOYEES = [
  { value: 'emp-1', label: 'Иван Петров', photo: '/images/emp1.jpg' },
  { value: 'emp-2', label: 'Мария Сидорова', photo: '/images/emp2.jpg' },
  { value: 'emp-3', label: 'Алексей Козлов', photo: '/images/emp3.jpg' },
  { value: 'emp-4', label: 'Елена Смирнова', photo: '/images/emp4.jpg' }
];

export const BRANDS = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'kia', label: 'Kia' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'bmw', label: 'BMW' }
];

export const MODELS_BY_BRAND: Record<
  string,
  { value: string; label: string }[]
> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land_cruiser_prado', label: 'Land Cruiser Prado' },
    { value: 'highlander', label: 'Highlander' }
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
    { value: 'ceed', label: 'Ceed' },
    { value: 'k5', label: 'K5' }
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'creta', label: 'Creta' },
    { value: 'elantra', label: 'Elantra' },
    { value: 'santa_fe', label: 'Santa Fe' }
  ],
  nissan: [
    { value: 'x-trail', label: 'X-Trail' },
    { value: 'qashqai', label: 'Qashqai' },
    { value: 'murano', label: 'Murano' },
    { value: 'patrol', label: 'Patrol' },
    { value: 'note', label: 'Note' }
  ],
  bmw: [
    { value: 'x5', label: 'X5' },
    { value: 'x3', label: 'X3' },
    { value: '3-series', label: '3 Series' },
    { value: '5-series', label: '5 Series' },
    { value: 'i4', label: 'i4' }
  ]
};

export const FUEL_TYPES = [
  { value: 'petrol', label: 'Бензин' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'electric', label: 'Электро' },
  { value: 'hybrid', label: 'Гибрид' }
];

export const TRANSMISSIONS = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' }
];

// =============================
// ХЕЛПЕРЫ
// =============================

const getEmployeeName = (id: string) =>
  EMPLOYEES.find((emp) => emp.value === id)?.label || 'Неизвестен';

const getEmployeePhoto = (id: string) =>
  EMPLOYEES.find((emp) => emp.value === id)?.photo ||
  '/images/default-avatar.png';

const formatFuelType = (type: string) => {
  const map: Record<string, string> = {
    petrol: 'Бензин',
    diesel: 'Дизель',
    electric: 'Электро',
    hybrid: 'Гибрид'
  };
  return map[type] || type;
};

const formatTransmission = (type: string) => {
  const map: Record<string, string> = {
    manual: 'Механика',
    automatic: 'Автомат'
  };
  return map[type] || type;
};

const formatFeature = (featureId: string) => {
  const featureMap: Record<string, string> = {
    winter_tires: '❄️ Зимняя резина',
    ceramic_coating: '🧪 Керамическое покрытие',
    armor_film: '🛡️ Бронеплёнка',
    floor_mats: '🧳 Коврики',
    car_cover: '🧥 Чехол',
    extended_warranty: '🔧 Расш. гарантия',
    free_service: '🛢️ Бесплатное ТО',
    navigation: '🗺️ Навигация + 360°',
    premium_sound: '🔊 Премиум звук',
    leather_seats: '🪑 Кожаные сиденья'
  };
  return featureMap[featureId] || featureId;
};

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
