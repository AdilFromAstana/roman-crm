'use client';

import { ProductTable } from './product-tables';
import {
  Clients,
  BringCar,
  Marketing,
  SoldCar,
  Target,
  TableType
} from '@/types';
import { soldCarColumns } from './product-tables/salesColumns';
import { bringCarColumns } from './product-tables/bringColumns';

interface ProductTableClientProps {
  tableType: TableType;
  data: Clients[] | BringCar[] | Marketing[] | SoldCar[] | Target[];
  totalItems: number;
}

export function ProductTableClient({
  tableType,
  data,
  totalItems
}: ProductTableClientProps) {
  // Динамически выбираем колонки по типу
  const columns = (() => {
    switch (tableType) {
      //   case 'clients':
      //     return clientColumns;
      case 'bringCar':
        return bringCarColumns;
      case 'soldCar':
        return soldCarColumns;
      //   case 'marketing':
      //     return marketingColumns;
      //   case 'target':
      //     return targetColumns;
      default:
        return bringCarColumns; // fallback
    }
  })();

  // Динамически приводим данные — TypeScript будет доволен, если колонки и данные согласованы
  // Мы используем generic-компонент, чтобы строго соответствовать типам
  return (
    <>
      {tableType === 'clients' && (
        <ProductTable<Clients, unknown>
          data={data as Clients[]}
          totalItems={totalItems}
          columns={columns as any} // ✅ columns уже соответствуют типу
        />
      )}
      {tableType === 'bringCar' && (
        <ProductTable<BringCar, unknown>
          data={data as BringCar[]}
          totalItems={totalItems}
          columns={columns as any}
        />
      )}
      {tableType === 'soldCar' && (
        <ProductTable<SoldCar, unknown>
          data={data as SoldCar[]}
          totalItems={totalItems}
          columns={columns as any}
        />
      )}
      {tableType === 'marketing' && (
        <ProductTable<Marketing, unknown>
          data={data as Marketing[]}
          totalItems={totalItems}
          columns={columns as any}
        />
      )}
      {tableType === 'target' && (
        <ProductTable<Target, unknown>
          data={data as Target[]}
          totalItems={totalItems}
          columns={columns as any}
        />
      )}
    </>
  );
}
