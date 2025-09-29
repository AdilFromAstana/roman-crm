// components/ui/advanced-data-table.tsx
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select';
import { useState, useMemo } from 'react';
import { MultiSelect } from './ui/multi-select';

type FilterType =
  | 'text'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'range'
  | 'date';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: FilterType;
  filterOptions?: Array<{ value: string; label: string }>;
  hidden?: boolean;
  width?: string;
}

interface FilterConfig<T> {
  [key: string]: any;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalCount?: number;
  currentPage?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  onSort?: (key: keyof T | string, direction: 'ASC' | 'DESC') => void;
  sortConfig?: {
    key: keyof T | string;
    direction: 'ASC' | 'DESC';
  } | null;
  filters?: FilterConfig<T>;
  onFiltersChange?: (filters: FilterConfig<T>) => void;
  searchFields?: (keyof T | string)[];
  onSearch?: (term: string) => void;
  searchTerm?: string;
  loading?: boolean;
  emptyMessage?: string;
  showFilters?: boolean;
  showColumnVisibility?: boolean;
}

export default function AdvancedDataTable<T extends { id?: any }>({
  data = [],
  columns = [],
  totalCount = 0,
  currentPage = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  sortConfig = null,
  filters = {},
  onFiltersChange,
  searchFields = [],
  onSearch,
  searchTerm = '',
  loading = false,
  emptyMessage = 'Нет данных',
  showFilters = true
}: DataTableProps<T>) {
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const [internalRowsPerPage, setInternalRowsPerPage] = useState(rowsPerPage);
  const [internalFilters, setInternalFilters] =
    useState<FilterConfig<T>>(filters);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(
    columns.reduce(
      (acc, col) => ({ ...acc, [String(col.key)]: !col.hidden }),
      {}
    )
  );
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Внутренняя пагинация, если не переданы внешние обработчики
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const actualCurrentPage = currentPage || internalCurrentPage;
  const actualRowsPerPage = onRowsPerPageChange
    ? rowsPerPage
    : internalRowsPerPage;

  const actualFilters = onFiltersChange ? filters : internalFilters;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(rows);
    } else {
      setInternalRowsPerPage(rows);
      setInternalCurrentPage(1);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...actualFilters, [key]: value };
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
    handlePageChange(1);
  };

  const clearFilters = () => {
    const emptyFilters = Object.keys(actualFilters).reduce((acc, key) => {
      const current = actualFilters[key];
      if (Array.isArray(current)) {
        return { ...acc, [key]: [] }; // multiselect
      }
      return { ...acc, [key]: '' }; // остальные
    }, {});
    if (onFiltersChange) {
      onFiltersChange(emptyFilters as FilterConfig<T>);
    } else {
      setInternalFilters(emptyFilters as FilterConfig<T>);
    }
    if (onSearch) {
      onSearch('');
    } else {
      setInternalSearchTerm('');
    }
    handlePageChange(1);
  };

  const toggleColumnVisibility = (key: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Фильтрация
  const filteredData = useMemo(() => {
    if (!onSearch && internalSearchTerm) {
      return data.filter((item) =>
        searchFields.some((field) => {
          const value = getNestedValue(item, field as string);
          return String(value)
            .toLowerCase()
            .includes(internalSearchTerm.toLowerCase());
        })
      );
    }
    return data;
  }, [data, internalSearchTerm, searchFields]);

  // Сортировка
  const sortedData = useMemo(() => {
    if (!onSort && sortConfig) {
      return [...filteredData].sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key as string);
        const bValue = getNestedValue(b, sortConfig.key as string);

        if (aValue < bValue) {
          return sortConfig.direction === 'ASC' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ASC' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  // Пагинация
  const paginatedData = useMemo(() => {
    const startIndex = (actualCurrentPage - 1) * actualRowsPerPage;
    return sortedData.slice(startIndex, startIndex + actualRowsPerPage);
  }, [sortedData, actualCurrentPage, actualRowsPerPage]);

  const actualTotalCount = totalCount || filteredData.length;
  const totalPages = Math.ceil(actualTotalCount / actualRowsPerPage);

  // Обработчик сортировки
  const handleSort = (key: keyof T | string) => {
    if (!onSort) return;

    let direction: 'ASC' | 'DESC' = 'ASC';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ASC'
    ) {
      direction = 'DESC';
    }
    onSort(key, direction);
  };

  // Обработчик поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if (onSearch) {
      onSearch(term);
    } else {
      setInternalSearchTerm(term);
    }
    handlePageChange(1);
  };

  // Получение вложенных значений
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // Видимые колонки
  const visibleColumns = useMemo(() => {
    return columns.filter((col) => columnVisibility[String(col.key)] !== false);
  }, [columns, columnVisibility]);

  if (loading) {
    return (
      <div className='rounded-lg bg-white p-4 shadow'>
        <div className='flex items-center justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-lg bg-white p-4 shadow'>
      {/* Панель управления */}
      <div className='mb-4 space-y-3'>
        {/* Поиск и основные кнопки */}
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex flex-1 gap-2'>
            {(onSearch || searchFields.length > 0) && (
              <input
                type='text'
                placeholder='Поиск по таблице...'
                value={onSearch ? searchTerm : internalSearchTerm}
                onChange={handleSearchChange}
                className='min-w-64 flex-1 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            )}

            {showFilters && (
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className='rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50'
              >
                Фильтры{' '}
                {Object.keys(actualFilters).some((key) => actualFilters[key])
                  ? `(${Object.keys(actualFilters).filter((key) => actualFilters[key]).length})`
                  : ''}
              </button>
            )}

            <div className='group relative'>
              <button className='rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50'>
                Колонки
              </button>
              <div className='absolute right-0 z-10 mt-1 hidden w-64 rounded-md border border-gray-200 bg-white shadow-lg group-hover:block'>
                <div className='max-h-64 overflow-y-auto p-2'>
                  {columns.map((col) => (
                    <label
                      key={String(col.key)}
                      className='flex items-center gap-2 py-1'
                    >
                      <input
                        type='checkbox'
                        checked={columnVisibility[String(col.key)] !== false}
                        onChange={() => toggleColumnVisibility(String(col.key))}
                        className='rounded'
                      />
                      <span className='text-sm'>{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {(Object.keys(actualFilters).some((key) => actualFilters[key]) ||
              (onSearch ? searchTerm : internalSearchTerm)) && (
              <button
                onClick={clearFilters}
                className='rounded-md border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50'
              >
                Сбросить
              </button>
            )}
          </div>

          <select
            value={actualRowsPerPage}
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            className='rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size} / страница
              </option>
            ))}
          </select>
        </div>

        {/* Панель фильтров */}
        {showFilterPanel && showFilters && (
          <div className='rounded-md border border-gray-200 bg-gray-50 p-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {columns
                .filter((col) => col.filterable)
                .map((col) => (
                  <div key={String(col.key)} className='space-y-1'>
                    <label className='block text-sm font-medium text-gray-700'>
                      {col.label}
                    </label>

                    {col.filterType === 'range' ? (
                      <div className='flex gap-1'>
                        <input
                          type='number'
                          value={actualFilters[`${String(col.key)}-from`] || ''}
                          onChange={(e) =>
                            handleFilterChange(
                              `${String(col.key)}-from`,
                              e.target.value
                            )
                          }
                          placeholder='От'
                          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        />
                        <span className='self-center'>-</span>
                        <input
                          type='number'
                          value={actualFilters[`${String(col.key)}-to`] || ''}
                          onChange={(e) =>
                            handleFilterChange(
                              `${String(col.key)}-to`,
                              e.target.value
                            )
                          }
                          placeholder='До'
                          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        />
                      </div>
                    ) : col.filterType === 'select' ? (
                      <Select
                        value={actualFilters[String(col.key)] || ''}
                        onValueChange={(value) =>
                          handleFilterChange(String(col.key), value)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder={`Выберите ${col.label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='__all__'>Все</SelectItem>
                          {col.filterOptions?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : col.filterType === 'multiselect' ? (
                      <MultiSelect
                        options={col.filterOptions || []}
                        value={
                          Array.isArray(actualFilters[String(col.key)])
                            ? actualFilters[String(col.key)]
                            : []
                        }
                        onChange={(value) =>
                          handleFilterChange(String(col.key), value)
                        }
                        placeholder={`Выберите ${col.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type='text'
                        value={actualFilters[String(col.key)] || ''}
                        onChange={(e) =>
                          handleFilterChange(String(col.key), e.target.value)
                        }
                        placeholder={`Фильтр по ${col.label.toLowerCase()}`}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Таблица */}
      <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='sticky top-0 z-10 bg-gray-100'>
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() =>
                    column.sortable && onSort && handleSort(column.key)
                  }
                  className={`px-5 py-3 text-left text-sm font-semibold tracking-wider text-gray-700 uppercase ${
                    column.sortable && onSort
                      ? 'cursor-pointer select-none hover:bg-gray-200'
                      : ''
                  }`}
                  style={{ width: column.width }}
                >
                  <div className='flex items-center gap-1'>
                    {column.label}
                    {sortConfig?.key === column.key && onSort && (
                      <span className='text-xs'>
                        {sortConfig.direction === 'ASC' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 bg-white'>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className={`transition ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50`}
                >
                  {visibleColumns.map((column) => (
                    <td
                      key={String(column.key)}
                      className='px-5 py-3 text-sm text-gray-800'
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(
                            getNestedValue(row, column.key as string),
                            row
                          )
                        : String(
                            getNestedValue(row, column.key as string) ?? ''
                          )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className='px-5 py-8 text-center text-sm text-gray-500'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-4'>
        <p className='text-sm text-gray-600'>
          Показано {(actualCurrentPage - 1) * actualRowsPerPage + 1} –{' '}
          {Math.min(actualCurrentPage * actualRowsPerPage, actualTotalCount)} из{' '}
          {actualTotalCount}
        </p>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handlePageChange(actualCurrentPage - 1)}
            disabled={actualCurrentPage === 1}
            className='rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40'
          >
            Назад
          </button>
          <span className='text-sm font-medium text-gray-700'>
            {actualCurrentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => handlePageChange(actualCurrentPage + 1)}
            disabled={actualCurrentPage === totalPages || totalPages === 0}
            className='rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40'
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
}
