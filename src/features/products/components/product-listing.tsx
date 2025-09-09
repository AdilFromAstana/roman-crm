// app/product-listing/page.tsx — Server Component (SSR)
'use server'; // не нужно, если только чтение данных

import { ProductTableClient } from './product-table-client';
import { getProductsByType, TableType } from '@/types';

// Асинхронный серверный компонент
export default async function ProductListingPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Получаем тип таблицы из URL, например: ?type=bringCar
  const tableType = (searchParams.type as TableType) || 'clients';

  // Получаем данные на сервере (SSR)
  const { total_products, products } = await getProductsByType(tableType);

  return (
    <ProductTableClient
      tableType={tableType}
      data={products}
      totalItems={total_products}
    />
  );
}
