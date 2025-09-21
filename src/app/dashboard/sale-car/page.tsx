// app/dashboard/sale-car/page.tsx
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { TABLE_CONFIG } from '@/constants/table-config';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import DataTable from '@/components/customTable';

export default function SaleCarPage() {
  const config = TABLE_CONFIG.soldCar;
  const data = config.dataSource.getProducts({});

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
          <DataTable />
        </Suspense>
      </div>
    </PageContainer>
  );
}
