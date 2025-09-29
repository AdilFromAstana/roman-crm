'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
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

export const soldCarColumns: any[] = [];
