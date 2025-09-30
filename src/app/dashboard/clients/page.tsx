// app/(dashboard)/customers/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState, useEffect } from 'react';
import AdvancedDataTable, { type Column } from '@/components/customTable';
import { Customer } from '@/types'; // Убедитесь, что тип Customer определён
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

// Типы для справочников
interface DictionaryItem {
  code: string;
  name: string;
}

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{
    key: string;
    direction: 'ASC' | 'DESC';
  } | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Справочники
  const [trafficSources, setTrafficSources] = useState<DictionaryItem[]>([]);
  const [customerStatuses, setCustomerStatuses] = useState<DictionaryItem[]>(
    []
  );

  // Загрузка справочников
  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [trafficSourcesRes, customerStatusesRes] = await Promise.all([
          api.get<DictionaryItem[]>('/traffic-sources'),
          api.get<DictionaryItem[]>('/customer-statuses')
        ]);

        setTrafficSources(trafficSourcesRes.data);
        setCustomerStatuses(customerStatusesRes.data);
      } catch (error) {
        console.error('Ошибка загрузки справочников:', error);
      }
    };

    loadDictionaries();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['customers', page, limit, search, sort, filters],
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

        switch (key) {
          case 'trafficSourceCode':
            params.set('trafficSourceCode', value);
            break;
          case 'customerStatusCode':
            params.set('customerStatusCode', value);
            break;
          case 'warmingLevel':
            params.set('warmingLevel', value);
            break;
          case 'isActive':
            params.set('isActive', value);
            break;
          default:
            params.set(key, String(value));
        }
      });

      const response = await api.get(`/customers?${params.toString()}`);
      return response.data;
    }
  });

  // Форматирование уровня прогрева
  const formatWarmingLevel = (level: number) => {
    const levels = ['❄️', '🧊', '💧', '🔥', '💥'];
    return level >= 1 && level <= 5 ? (
      <span className='flex items-center gap-1'>
        {levels[level - 1]} {level}
      </span>
    ) : (
      '-'
    );
  };

  // Колонки
  const columns: Column<Customer>[] = [
    {
      key: 'fullName',
      label: 'ФИО',
      sortable: true,
      render: (_, row) => (
        <span className='font-medium'>
          {row.lastName} {row.firstName}
        </span>
      ),
      width: '160px'
    },
    {
      key: 'phone',
      label: 'Телефон',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (value: string) => (
        <a href={`tel:${value}`} className='text-blue-600 hover:underline'>
          {value || '-'}
        </a>
      ),
      width: '140px'
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (value: string) => (
        <a href={`mailto:${value}`} className='text-blue-600 hover:underline'>
          {value || '-'}
        </a>
      ),
      width: '180px'
    },
    {
      key: 'iin',
      label: 'ИИН',
      sortable: true,
      filterable: true,
      filterType: 'text',
      width: '120px'
    },
    {
      key: 'warmingLevel',
      label: 'Прогрев',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: '1', label: '1 - Холодный' },
        { value: '2', label: '2 - Прохладный' },
        { value: '3', label: '3 - Нейтральный' },
        { value: '4', label: '4 - Тёплый' },
        { value: '5', label: '5 - Горячий' }
      ],
      render: (value: number) => formatWarmingLevel(value),
      width: '100px'
    },
    {
      key: 'trafficSourceCode',
      label: 'Источник',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: trafficSources.map((ts) => ({
        value: ts.code,
        label: ts.name
      })),
      render: (_, row) => row.trafficSource?.name || '-',
      width: '130px'
    },
    {
      key: 'customerStatusCode',
      label: 'Статус',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: customerStatuses.map((cs) => ({
        value: cs.code,
        label: cs.name
      })),
      render: (_, row) => {
        const status = row.customerStatus?.name || '-';
        const isActive = row.customerStatus?.isActive;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        );
      },
      width: '120px'
    },
    {
      key: 'tags',
      label: 'Теги',
      render: (value: string[]) => (
        <div className='flex flex-wrap gap-1'>
          {(value || []).map((tag, i) => (
            <span
              key={i}
              className='rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-800'
            >
              {tag}
            </span>
          ))}
          {(value || []).length === 0 && (
            <span className='text-gray-500'>-</span>
          )}
        </div>
      ),
      width: '140px'
    },
    {
      key: 'description',
      label: 'Описание',
      render: (value: string) => (
        <span className='line-clamp-2 text-sm text-gray-600'>
          {value || '-'}
        </span>
      ),
      width: '200px'
    },
    {
      key: 'isActive',
      label: 'Активен',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'true', label: 'Да' },
        { value: 'false', label: 'Нет' }
      ],
      render: (value: boolean) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {value ? 'Да' : 'Нет'}
        </span>
      ),
      width: '90px'
    },
    {
      key: 'createdAt',
      label: 'Создан',
      sortable: true,
      render: (value: string) => (
        <span className='text-sm text-nowrap text-gray-600'>
          {new Date(value).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
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
            (window.location.href = `/dashboard/clients/${row.id}`)
          }
        >
          Детали <Eye className='h-4 w-4 text-gray-600' />
        </Button>
      ),
      width: '60px'
    }
  ];

  return (
    <div className='mx-auto w-full p-4 md:p-8'>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Управление Клиентами
        </h1>
        <Button asChild>
          <Link href='/dashboard/clients/new'>Добавить клиента</Link>
        </Button>
      </div>

      <AdvancedDataTable<Customer>
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
        searchFields={['firstName', 'lastName', 'phone', 'email', 'iin']}
        loading={isLoading}
        showFilters={true}
        showColumnVisibility={true}
      />
    </div>
  );
}
