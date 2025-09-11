// app/dashboard/sale-car/page.tsx
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { UniversalTable } from '@/features/products/components/product-tables/UniversalTable';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { TABLE_CONFIG } from '@/constants/table-config';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export const metadata = {
  title: 'Продажа авто - Dashboard'
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SaleCarPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;
  searchParamsCache.parse(searchParamsData);

  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const config = TABLE_CONFIG.soldCar;
  const data = await config.dataSource.getProducts(filters);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={config.title} description={config.description} />
          <Link
            href={`/dashboard/sale-car/new`}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Добавить продажу
          </Link>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <UniversalTable
            data={data.products}
            totalItems={data.total_products}
            columns={config.columns}
            tableType='soldCar'
            basePath='/dashboard/sale-car'
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
