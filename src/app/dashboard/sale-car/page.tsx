'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState } from 'react';
import AdvancedDataTable, { type Column } from '@/components/customTable';
import { Sale } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const formatPrice = (value?: number | string) => {
  if (!value) return '-';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₸';
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
        params.set(key, String(value));
      });
      const res = await api.get(`/sales?${params.toString()}`);
      return res.data;
    }
  });

  const columns: Column<Sale>[] = [
    {
      key: 'bringCar',
      label: 'Автомобиль',
      render: (_, row) =>
        `${row.bringCar.brand?.name || ''} ${row.bringCar.model?.name || ''} ${
          row.bringCar.year || ''
        }`.trim()
    },
    {
      key: 'customer',
      label: 'Клиент',
      render: (_, row) =>
        `${row.customer.firstName} ${row.customer.lastName}`.trim()
    },
    {
      key: 'purchasePrice',
      label: 'Цена покупки',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => formatPrice(value)
    },
    {
      key: 'salePrice',
      label: 'Цена продажи',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => formatPrice(value)
    },
    {
      key: 'netProfit',
      label: 'Чистая прибыль',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => formatPrice(value)
    },
    {
      key: 'saleEmployee',
      label: 'Продавец',
      render: (_, row) =>
        `${row.saleEmployee?.firstName || ''} ${
          row.saleEmployee?.lastName || ''
        }`.trim()
    },
    {
      key: 'bringEmployee',
      label: 'Загнал авто',
      render: (_, row) =>
        `${row.bringEmployee?.firstName || ''} ${
          row.bringEmployee?.lastName || ''
        }`.trim()
    },
    {
      key: 'managerEmployee',
      label: 'Менеджер',
      render: (_, row) =>
        `${row.managerEmployee?.firstName || ''} ${
          row.managerEmployee?.lastName || ''
        }`.trim()
    },
    {
      key: 'totalBonuses',
      label: 'Бонусы всего',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => formatPrice(value)
    },
    {
      key: 'salesStatus',
      label: 'Статус',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'COMMISSION_ISSUED', label: 'Комиссия выдана' },
        { value: 'IN_PROGRESS', label: 'В процессе' },
        { value: 'CANCELLED', label: 'Отменена' }
      ],
      render: (_, row) => row.salesStatus?.name || row.salesStatusCode
    },
    {
      key: 'saleDate',
      label: 'Дата продажи',
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: (value: string) =>
        value ? new Date(value).toLocaleDateString('ru-RU') : '-'
    },
    {
      key: 'isCommissionPaid',
      label: 'Комиссия',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'true', label: 'Да' },
        { value: 'false', label: 'Нет' }
      ],
      render: (value: boolean) => (value ? 'Да' : 'Нет')
    },
    {
      key: 'actions',
      label: 'Действие',
      render: (_, row) => (
        <Button
          size='sm'
          onClick={() =>
            (window.location.href = `/dashboard/sale-car/${row.id}`)
          }
        >
          Выбрать
        </Button>
      )
    }
  ];

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Продажи</h1>
        <Button asChild>
          <Link href='/dashboard/sale-car/new'>Добавить продажу</Link>
        </Button>
      </div>

      <AdvancedDataTable<Sale>
        data={data || []}
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
          'customer.lastName'
        ]}
        loading={isLoading}
        showFilters
        showColumnVisibility
      />
    </div>
  );
}
