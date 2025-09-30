'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState, useEffect } from 'react';
import AdvancedDataTable, { type Column } from '@/components/customTable'; // Предполагаем, что AdvancedDataTable импортируется так
import { BringCar } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Типы для справочников
interface DictionaryItem {
  code: string;
  name: string;
}

const formatPrice = (value?: number) => {
  if (!value) return '-';
  // Используем более короткий формат для больших чисел
  if (value > 1000000) {
    return (
      new Intl.NumberFormat('ru-RU', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value) + ' ₸'
    );
  }
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₸';
};

export default function BringCarsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{
    key: string;
    direction: 'ASC' | 'DESC';
  } | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Справочники
  const [brands, setBrands] = useState<DictionaryItem[]>([]);
  const [models, setModels] = useState<DictionaryItem[]>([]);
  const [colors, setColors] = useState<DictionaryItem[]>([]);
  const [fuelTypes, setFuelTypes] = useState<DictionaryItem[]>([]);
  const [transmissions, setTransmissions] = useState<DictionaryItem[]>([]);
  const [features, setFeatures] = useState<DictionaryItem[]>([]);
  const [bringCarStatuses, setBringCarStatuses] = useState<DictionaryItem[]>(
    []
  );

  // Загрузка справочников
  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [
          brandsRes,
          modelsRes,
          colorsRes,
          fuelTypesRes,
          transmissionsRes,
          bringCarStatusesRes,
          featuresRes
        ] = await Promise.all([
          api.get<DictionaryItem[]>('/brands'),
          api.get<DictionaryItem[]>('/models'),
          api.get<DictionaryItem[]>('/colors'),
          api.get<DictionaryItem[]>('/fuel-types'),
          api.get<DictionaryItem[]>('/transmissions'),
          api.get<DictionaryItem[]>('/bring-car-statuses'),
          api.get<DictionaryItem[]>('/features')
        ]);

        setBrands(brandsRes.data);
        setModels(modelsRes.data);
        setColors(colorsRes.data);
        setFuelTypes(fuelTypesRes.data);
        setTransmissions(transmissionsRes.data);
        setBringCarStatuses(bringCarStatusesRes.data);
        setFeatures(featuresRes.data);
      } catch (error) {
        console.error('Ошибка загрузки справочников:', error);
      }
    };

    loadDictionaries();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['bring-cars', page, limit, search, sort, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (search) params.set('search', search);
      if (sort) {
        params.set('sort', sort.key);
        params.set('order', sort.direction);
      }

      // Добавляем фильтры - правильная обработка массивов
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value == null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return; // пропускаем пустое
        }

        switch (key) {
          case 'brandCode':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('brandCodes', val)
            );
            break;
          case 'modelCode':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('modelCodes', val)
            );
            break;
          case 'colorCode':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('colorCodes', val)
            );
            break;
          case 'fuelTypeCode':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('fuelTypeCodes', val)
            );
            break;
          case 'transmissionCode':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('transmissionCodes', val)
            );
            break;
          case 'bringCarStatusCode':
            params.set('bringCarStatusCode', value);
            break;
          case 'bringEmployeeId':
            (Array.isArray(value) ? value : [value]).forEach((val) =>
              params.append('employeeIds', val)
            );
            break;
          case 'year': {
            const [from, to] = String(value)
              .split('-')
              .map((v) => v.trim());
            if (from) params.set('yearFrom', from);
            if (to) params.set('yearTo', to);
            break;
          }
          case 'price': {
            const [from, to] = String(value)
              .split('-')
              .map((v) => v.trim());
            if (from) params.set('priceFrom', from);
            if (to) params.set('priceTo', to);
            break;
          }
          default:
            params.set(key, String(value));
        }
      });

      const response = await api.get(`/bring-cars?${params.toString()}`);
      return response.data;
    }
  });

  // Явно типизированные колонки
  const columns: Column<BringCar>[] = [
    {
      key: 'brand',
      label: 'Марка',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      filterOptions: brands.map((b) => ({ value: b.code, label: b.name })),
      render: (_, row) => row.brand?.name || '-',
      width: '110px'
    },
    {
      key: 'model',
      label: 'Модель',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      filterOptions: models.map((m) => ({ value: m.code, label: m.name })),
      render: (_, row) => row.model?.name || '-',
      width: '120px'
    },
    {
      key: 'year',
      label: 'Год',
      sortable: true,
      filterable: true,
      filterType: 'range',
      width: '70px'
    },
    {
      key: 'mileage',
      label: 'Пробег',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: number) => (
        <span className='font-mono text-gray-700'>
          {value ? value.toLocaleString('ru-RU') + ' км' : '-'}
        </span>
      ),
      width: '90px'
    },
    {
      key: 'price',
      label: 'Цена покупки',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => (
        <span className='font-semibold text-gray-900'>
          {formatPrice(Number(value))}
        </span>
      ),
      width: '120px'
    },
    {
      key: 'salePrice',
      label: 'Цена продажи',
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value: string) => (
        <span className='font-semibold text-green-700'>
          {formatPrice(Number(value))}
        </span>
      ),
      width: '120px'
    },
    {
      key: 'color',
      label: 'Цвет',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      filterOptions: colors.map((c) => ({ value: c.code, label: c.name })),
      render: (_, row) => {
        const name = row.color?.name || '-';
        const colorMap: Record<string, string> = {
          Белый: '#ffffff',
          Черный: '#000000',
          Серый: '#808080',
          Синий: '#1e40af',
          Красный: '#dc2626',
          Зеленый: '#16a34a'
        };
        return (
          <div className='flex items-center gap-2'>
            <span
              className='inline-block h-3 w-3 rounded-full border border-gray-300'
              style={{ backgroundColor: colorMap[name] || '#ccc' }}
            />
            <span>{name}</span>
          </div>
        );
      },
      width: '100px'
    },
    {
      key: 'fuelType',
      label: 'Топливо',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      filterOptions: fuelTypes.map((f) => ({ value: f.code, label: f.name })),
      render: (_, row) => row.fuelType?.name || '-',
      width: '90px'
    },
    {
      key: 'transmission',
      label: 'Коробка',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      filterOptions: transmissions.map((t) => ({
        value: t.code,
        label: t.name
      })),
      render: (_, row) => row.transmission?.name || '-',
      width: '90px'
    },
    {
      key: 'features',
      label: 'Опции',
      filterable: true,
      filterType: 'multiselect',
      filterOptions: features.map((f) => ({ value: f.code, label: f.name })),
      render: (_, row) => {
        if (!row.featureCodes?.length) return '-';
        const names = row.featureCodes
          .map((code) => features.find((f) => f.code === code)?.name)
          .filter(Boolean)
          .join(', ');
        return <span className='text-sm text-gray-600'>{names || '-'}</span>;
      },
      width: '130px'
    },
    {
      key: 'bringCarStatusCode', // ← важно: фильтровать по code, а не по объекту
      label: 'Статус',
      sortable: true,
      filterable: true, // ← обязательно
      filterType: 'select', // ← обязательно
      filterOptions: bringCarStatuses.map((status) => ({
        value: status.code,
        label: status.name
      })),
      render: (_, row) => {
        const status = row.bringCarStatus?.name || '-';
        const isActive = row.bringCarStatus?.isActive;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {status}
          </span>
        );
      },
      width: '110px'
    },
    {
      key: 'description',
      label: 'Описание',
      render: (value: string) => (
        <span className='line-clamp-2 text-sm text-gray-600'>
          {value || '-'}
        </span>
      ),
      width: '180px'
    },
    {
      key: 'bringEmployee',
      label: 'Сотрудник',
      sortable: true,
      filterable: true,
      filterType: 'multiselect',
      // Если есть справочник сотрудников — добавьте filterOptions
      render: (_, row) =>
        row.bringEmployee
          ? `${row.bringEmployee.firstName} ${row.bringEmployee.lastName}`
          : '-',
      width: '130px'
    },
    {
      key: 'createdAt',
      label: 'Добавлен',
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
      width: '100px'
    }
  ];

  return (
    <div className='mx-auto w-full p-4 md:p-8'>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Управление Автомобилями (Загон)
        </h1>
        <Button asChild>
          <Link href='/dashboard/bring-car/new'>Добавить машину</Link>
        </Button>
      </div>

      <AdvancedDataTable<BringCar>
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
        searchFields={['brand.name', 'model.name', 'color.name']}
        loading={isLoading}
        showFilters={true}
        showColumnVisibility={true}
      />
    </div>
  );
}
