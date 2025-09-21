'use client';

import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { ClientModal } from '@/components/clients/client-modal';
import { TABLE_CONFIG } from '@/constants/table-config';
import { ClientViewModal } from '@/components/clients/client-view-modal';
import { Clients } from '@/types';
import DataTable from '@/components/customTable';

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setClient] = useState<{
    message: string;
    success: boolean;
    time: string;
    product: Clients;
  } | null>(null);
  const [data, setData] = useState({ products: [], total_products: 0 });
  const config = TABLE_CONFIG.clients;

  const getData = async () => {
    const data = await config.dataSource.getProducts({});
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const selectClient = async (id: string) => {
    setClient(await config.dataSource.getProductById(id));
    setIsModalOpen(true);
  };

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={config.title} description={config.description} />
          <ClientModal
            mode='create'
            trigger={
              <button className={cn(buttonVariants(), 'text-xs md:text-sm')}>
                <IconPlus className='mr-2 h-4 w-4' /> Добавить клиента
              </button>
            }
            onSuccess={async () => {}}
          />
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
      <ClientViewModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        client={client}
      />
    </PageContainer>
  );
}
