// app/dashboard/bring-cars/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState, useEffect } from 'react';
import AdvancedDataTable, { type Column } from '@/components/customTable';

interface BringCar {
  id: string;
  brandCode: string;
  brand: { name: string; code: string };
  modelCode: string;
  model: { name: string; code: string };
  year: number;
  price: number;
  salePrice: number;
  mileage: number;
  colorCode: string;
  color: { name: string; code: string };
  fuelTypeCode: string;
  fuelType: { name: string; code: string };
  transmissionCode: string;
  transmission: { name: string; code: string };
  bringEmployeeId: string;
  bringEmployee: { firstName: string; lastName: string; id: string };
  createdAt: string;
  isActive: boolean;
}

// Типы для справочников
interface DictionaryItem {
  code: string;
  name: string;
}

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

  // Загрузка справочников
  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [
          brandsRes,
          modelsRes,
          colorsRes,
          fuelTypesRes,
          transmissionsRes
        ] = await Promise.all([
          api.get<DictionaryItem[]>('/brands'),
          api.get<DictionaryItem[]>('/models'),
          api.get<DictionaryItem[]>('/colors'),
          api.get<DictionaryItem[]>('/fuel-types'),
          api.get<DictionaryItem[]>('/transmissions')
        ]);

        setBrands(brandsRes.data);
        setModels(modelsRes.data);
        setColors(colorsRes.data);
        setFuelTypes(fuelTypesRes.data);
        setTransmissions(transmissionsRes.data);
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
      key: 'brandCode',
      label: 'Марка',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      filterOptions: brands.map((brand) => ({
        value: brand.code,
        label: brand.name
      })),
      render: (value: string, row: BringCar) => row.brand?.name || value
    },
    {
      key: 'modelCode',
      label: 'Модель',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      filterOptions: models.map((model) => ({
        value: model.code,
        label: model.name
      })),
      render: (value: string, row: BringCar) => row.model?.name || value
    },
    {
      key: 'year',
      label: 'Год',
      sortable: true,
      filterable: true,
      filterType: 'range' as const
    },
    {
      key: 'price',
      label: 'Цена покупки',
      sortable: true,
      filterable: true,
      filterType: 'range' as const,
      render: (value: number) => (value ? `${value.toLocaleString()} ₽` : '-')
    },
    {
      key: 'salePrice',
      label: 'Цена продажи',
      sortable: true,
      filterable: true,
      filterType: 'range' as const,
      render: (value: number) => (value ? `${value.toLocaleString()} ₽` : '-')
    },
    {
      key: 'mileage',
      label: 'Пробег',
      sortable: true,
      filterable: true,
      filterType: 'range' as const,
      render: (value: number) => `${value.toLocaleString()} км`
    },
    {
      key: 'colorCode',
      label: 'Цвет',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      filterOptions: colors.map((color) => ({
        value: color.code,
        label: color.name
      })),
      render: (value: string, row: BringCar) => row.color?.name || value
    },
    {
      key: 'fuelTypeCode',
      label: 'Топливо',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      filterOptions: fuelTypes.map((fuel) => ({
        value: fuel.code,
        label: fuel.name
      })),
      render: (value: string, row: BringCar) => row.fuelType?.name || value
    },
    {
      key: 'transmissionCode',
      label: 'Коробка',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      filterOptions: transmissions.map((trans) => ({
        value: trans.code,
        label: trans.name
      })),
      render: (value: string, row: BringCar) => row.transmission?.name || value
    },
    {
      key: 'bringEmployeeId',
      label: 'Сотрудник',
      sortable: true,
      filterable: true,
      filterType: 'multiselect' as const,
      // filterOptions нужно загрузить отдельно для сотрудников
      render: (value: string, row: BringCar) =>
        `${row.bringEmployee?.firstName || ''} ${row.bringEmployee?.lastName || ''}`.trim() ||
        '-'
    },
    {
      key: 'createdAt',
      label: 'Дата добавления',
      sortable: true,
      filterable: true,
      filterType: 'date' as const,
      render: (value: string) => new Date(value).toLocaleDateString('ru-RU')
    },
    {
      key: 'isActive',
      label: 'Активен',
      sortable: true,
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { value: 'true', label: 'Да' },
        { value: 'false', label: 'Нет' }
      ],
      render: (value: boolean) => (value ? 'Да' : 'Нет')
    }
  ];

  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Автомобили</h1>

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
