// components/ui/table/column-visibility-toggle.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';

// Резервный маппинг для колонок без meta.label
const FALLBACK_COLUMN_NAMES: Record<string, string> = {
  id: 'ID',
  firstName: 'Имя',
  lastName: 'Фамилия',
  phone: 'Телефон',
  wish: 'Пожелания',
  createdAt: 'Дата создания',
  updatedAt: 'Дата обновления',
  status: 'Статус',
  actions: 'Действия',
  imageUrl: 'Фото',
  brand: 'Марка',
  model: 'Модель',
  year: 'Год',
  price: 'Цена',
  mileage: 'Пробег',
  color: 'Цвет',
  fuelType: 'Топливо',
  transmission: 'Коробка',
  description: 'Описание',
  soldAt: 'Дата продажи',
  saleType: 'Тип продажи',
  bankCredit: 'Банк',
  features: 'Опции',
  bringEmployeeId: 'Загнал',
  saleEmployeeId: 'Продал',
  marketgingEmployeeId: 'Маркетинг'
};

interface ColumnVisibilityToggleProps<TData> {
  tableType?: string;
}

export function ColumnVisibilityToggle<
  TData
>({}: ColumnVisibilityToggleProps<TData>) {
  const getColumnDisplayName = (column: any): string => {
    // Приоритет 1: meta.label
    if (column.columnDef?.meta?.label) {
      return column.columnDef.meta.label;
    }

    // Приоритет 2: Резервный маппинг
    if (FALLBACK_COLUMN_NAMES[column.id]) {
      return FALLBACK_COLUMN_NAMES[column.id];
    }

    // Приоритет 3: header если это строка
    if (typeof column.columnDef?.header === 'string') {
      return column.columnDef.header;
    }

    // По умолчанию - id колонки
    return column.id;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-2 h-8'>
          <Settings2 className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[250px]'
        forceMount
      ></DropdownMenuContent>
    </DropdownMenu>
  );
}
