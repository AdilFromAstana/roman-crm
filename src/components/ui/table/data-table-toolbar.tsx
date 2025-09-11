// components/ui/table/data-table-toolbar.tsx
'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColumnVisibilityToggle } from './column-visibility-toggle';
import React, { useState, useEffect, useRef } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableType?: string;
  basePath?: string;
  viewModal?: React.ComponentType<{ client: TData; trigger: React.ReactNode }>;
  data?: TData[];
}

// Вспомогательные функции для форматирования чисел
const formatNumberWithSpaces = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const parseNumberFromSpaces = (value: string): number | null => {
  if (!value) return null;
  const cleanValue = value.replace(/\s/g, '');
  const num = parseInt(cleanValue, 10);
  return isNaN(num) ? null : num;
};

export function DataTableToolbar<TData>({
  table,
  tableType,
  basePath,
  viewModal,
  data = []
}: DataTableToolbarProps<TData>) {
  const [localBrandFilter, setLocalBrandFilter] = useState<string>('');
  const [displayMinPrice, setDisplayMinPrice] = useState<string>('');
  const [displayMaxPrice, setDisplayMaxPrice] = useState<string>('');
  const [numericMinPrice, setNumericMinPrice] = useState<number | null>(null);
  const [numericMaxPrice, setNumericMaxPrice] = useState<number | null>(null);
  const minPriceDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const maxPriceDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayMinPrice(inputValue);

    if (minPriceDebounceRef.current) {
      clearTimeout(minPriceDebounceRef.current);
    }

    minPriceDebounceRef.current = setTimeout(() => {
      const parsedValue = parseNumberFromSpaces(inputValue);
      setNumericMinPrice(parsedValue);
    }, 1000);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayMaxPrice(inputValue);

    if (maxPriceDebounceRef.current) {
      clearTimeout(maxPriceDebounceRef.current);
    }

    maxPriceDebounceRef.current = setTimeout(() => {
      const parsedValue = parseNumberFromSpaces(inputValue);
      setNumericMaxPrice(parsedValue);
    }, 1000);
  };

  useEffect(() => {
    const brandColumn = table.getColumn('brand');
    if (brandColumn) {
      brandColumn.setFilterValue(localBrandFilter || undefined);
    }
  }, [localBrandFilter, table]);

  useEffect(() => {
    const priceColumn = table.getColumn('price');
    if (priceColumn) {
      const filterValue: { from?: number; to?: number } = {};
      if (numericMinPrice !== null) {
        filterValue.from = numericMinPrice;
      }
      if (numericMaxPrice !== null) {
        filterValue.to = numericMaxPrice;
      }
      priceColumn.setFilterValue(
        Object.keys(filterValue).length > 0 ? filterValue : undefined
      );
    }
  }, [numericMinPrice, numericMaxPrice, table]);

  const isFiltered = Boolean(
    localBrandFilter ||
      displayMinPrice ||
      displayMaxPrice ||
      (table.getState().columnFilters &&
        table.getState().columnFilters.length > 0)
  );

  const resetFilters = () => {
    setLocalBrandFilter('');
    setDisplayMinPrice('');
    setDisplayMaxPrice('');
    setNumericMinPrice(null);
    setNumericMaxPrice(null);

    if (minPriceDebounceRef.current) {
      clearTimeout(minPriceDebounceRef.current);
    }
    if (maxPriceDebounceRef.current) {
      clearTimeout(maxPriceDebounceRef.current);
    }

    table.resetColumnFilters();
  };

  useEffect(() => {
    return () => {
      if (minPriceDebounceRef.current) {
        clearTimeout(minPriceDebounceRef.current);
      }
      if (maxPriceDebounceRef.current) {
        clearTimeout(maxPriceDebounceRef.current);
      }
    };
  }, []);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Поиск по марке...'
            value={localBrandFilter}
            onChange={(event) => setLocalBrandFilter(event.target.value)}
            className='h-8 w-[150px] lg:w-[250px]'
          />
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={resetFilters}
              className='h-8 px-2 lg:px-3'
            >
              Сбросить
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <ColumnVisibilityToggle table={table} tableType={tableType} />
        </div>
      </div>

      {(tableType === 'bringCar' || tableType === 'soldCar') && (
        <div className='flex flex-wrap items-center gap-6'>
          <div className='min-w-[250px] flex-1'>
            <label className='text-sm'>Цена (₸)</label>
            <div className='mt-2 flex items-center gap-2'>
              <Input
                type='text'
                inputMode='numeric'
                placeholder='От'
                value={displayMinPrice}
                onChange={handleMinPriceChange}
                className='w-24'
              />
              <span className='text-muted-foreground'>-</span>
              <Input
                type='text'
                inputMode='numeric'
                placeholder='До'
                value={displayMaxPrice}
                onChange={handleMaxPriceChange}
                className='w-24'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
