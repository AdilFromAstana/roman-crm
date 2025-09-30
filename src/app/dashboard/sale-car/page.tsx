// app/(dashboard)/sale-car/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState } from 'react';
import AdvancedDataTable, { type Column } from '@/components/customTable';
import { Sale } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

// Форматирование цены с выравниванием по правому краю
const formatPrice = (value?: number | string) => {
  if (!value) return '-';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₸';
};

// Форматирование ФИО сотрудника
const formatEmployee = (employee: any) => {
  if (!employee) return '-';
  return `${employee.firstName} ${employee.lastName[0]}.`;
};

export default function SaleCarPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{
    key: string;
    direction: 'ASC' | 'DESC';
  } | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['sales', page, limit, search, sort, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (search) params.set('search', search);
      if (sort) {
        params.set('sort', sort.key);
        params.set('order', sort.direction);
      }
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value == null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return;
        }
        // Обработка salesStatusCode
        if (key === 'salesStatusCode') {
          params.set('salesStatusCode', value);
        } else if (key === 'isCommissionPaid') {
          params.set('isCommissionPaid', value);
        } else {
          params.set(key, String(value));
        }
      });
      const res = await api.get(`/sales?${params.toString()}`);
      return res.data;
    }
  });

  const columns: Column<Sale>[] = [
    {
      key: 'bringCar',
      label: 'Автомобиль',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (_, row) => {
        const car = row.bringCar;
        return (
          <div className='font-medium'>
            <div>
              {car.brand?.name || ''} {car.model?.name || ''}
            </div>
            <div className='text-sm text-gray-500'>
              {car.year} · {car.mileage?.toLocaleString()} км
            </div>
          </div>
        );
      },
      width: '180px'
    },
    {
      key: 'customer',
      label: 'Клиент',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (_, row) => (
        <div>
          <div className='font-medium'>
            {row.customer.lastName} {row.customer.firstName}
          </div>
          <div className='text-sm text-gray-500'>{row.customer.phone}</div>
        </div>
      ),
      width: '160px'
    },
    {
      key: 'purchasePrice',
      label: 'Закуп',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => (
        <span className='block w-full text-right font-mono text-gray-700'>
          {formatPrice(value)}
        </span>
      ),
      width: '110px'
    },
    {
      key: 'salePrice',
      label: 'Продажа',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => (
        <span className='block w-full text-right font-mono font-semibold text-green-700'>
          {formatPrice(value)}
        </span>
      ),
      width: '110px'
    },
    {
      key: 'netProfit',
      label: 'Прибыль',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => {
        const num = parseFloat(value);
        const isPositive = num > 0;
        return (
          <span
            className={`block w-full text-right font-mono font-bold ${
              isPositive
                ? 'text-green-600'
                : num < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}
          >
            {formatPrice(value)}
          </span>
        );
      },
      width: '110px'
    },
    {
      key: 'saleEmployee',
      label: 'Продавец',
      render: (_, row) => (
        <span className='text-sm'>{formatEmployee(row.saleEmployee)}</span>
      ),
      width: '100px'
    },
    {
      key: 'bringEmployee',
      label: 'Загнал',
      render: (_, row) => (
        <span className='text-sm'>{formatEmployee(row.bringEmployee)}</span>
      ),
      width: '100px'
    },
    {
      key: 'managerEmployee',
      label: 'Менеджер',
      render: (_, row) => (
        <span className='text-sm'>{formatEmployee(row.managerEmployee)}</span>
      ),
      width: '100px'
    },
    {
      key: 'totalBonuses',
      label: 'Бонусы',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => (
        <span className='block w-full text-right font-mono text-blue-600'>
          {formatPrice(value)}
        </span>
      ),
      width: '110px'
    },
    {
      key: 'salesStatusCode',
      label: 'Статус',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'IN_PROGRESS', label: 'В процессе' },
        { value: 'COMMISSION_ISSUED', label: 'Комиссия выдана' },
        { value: 'CANCELLED', label: 'Отменена' }
      ],
      render: (_, row) => {
        const status = row.salesStatus;
        if (!status) return '-';
        return (
          <span
            className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white'
            style={{ backgroundColor: status.color || '#6b7280' }}
          >
            {status.name}
          </span>
        );
      },
      width: '130px'
    },
    {
      key: 'saleDate',
      label: 'Дата продажи',
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString('ru-RU') : '-',
      width: '120px'
    },
    {
      key: 'isCommissionPaid',
      label: 'Комиссия',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'true', label: 'Выплачена' },
        { value: 'false', label: 'Не выплачена' }
      ],
      render: (value: boolean) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            value
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value ? 'Выплачена' : 'Не выплачена'}
        </span>
      ),
      width: '110px'
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0 hover:bg-gray-100'
          onClick={() =>
            (window.location.href = `/dashboard/sale-car/${row.id}`)
          }
        >
          <Eye className='h-4 w-4 text-gray-600' />
        </Button>
      ),
      width: '60px'
    }
  ];

  return (
    <div className='mx-auto w-full p-4 md:p-8'>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Продажи</h1>
        <Button asChild>
          <Link href='/dashboard/sale-car/new'>Добавить продажу</Link>
        </Button>
      </div>

      <AdvancedDataTable<Sale>
        data={data?.data || []}
        columns={columns}
        totalCount={data?.total || 0}
        currentPage={page}
        rowsPerPage={limit}
        onPageChange={setPage}
        onRowsPerPageChange={setLimit}
        onSort={(key, direction) => setSort({ key, direction })}
        sortConfig={sort}
        filters={filters}
        onFiltersChange={setFilters}
        searchTerm={search}
        onSearch={setSearch}
        searchFields={[
          'bringCar.brand.name',
          'bringCar.model.name',
          'customer.firstName',
          'customer.lastName',
          'customer.phone'
        ]}
        loading={isLoading}
        showFilters={true}
        showColumnVisibility={true}
        emptyMessage='Продажи не найдены'
      />
    </div>
  );
}
