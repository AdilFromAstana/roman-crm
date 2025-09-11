// constants/table-config.ts
import { TableType } from '@/types';
import { fakeBringCar } from './fakeBringCar';
import { fakeSoldCar } from './fakeSoldCar';
// import { fakeMarketing } from './fakeMarketing';
// import { fakeTarget } from './fakeTarget';
import { bringCarColumns } from '@/features/products/components/product-tables/bringColumns';
import { soldCarColumns } from '@/features/products/components/product-tables/salesColumns';
import { clientColumns } from '@/features/products/components/product-tables/clientsColumns';
import { fakeClients } from './fakeClients';

export const TABLE_CONFIG: Record<
  TableType,
  {
    columns: any;
    dataSource: any;
    title: string;
    description: string;
  }
> = {
  //   clients: {
  //     columns: clientColumns,
  //     dataSource: fakeClients,
  //     title: 'Clients',
  //     description: 'Manage client requests'
  //   },
  bringCar: {
    columns: bringCarColumns,
    dataSource: fakeBringCar,
    title: 'Загон машин',
    description: 'Управление загнаными машина'
  },
  soldCar: {
    columns: soldCarColumns,
    dataSource: fakeSoldCar,
    title: 'Проданные машины',
    description: 'Управление продаными машинами'
  },
  clients: {
    title: 'Клиенты',
    description: 'Управление клиентами',
    columns: clientColumns,
    dataSource: fakeClients
  }
  //   marketing: {
  //     columns: marketingColumns,
  //     dataSource: fakeMarketing,
  //     title: 'Marketing',
  //     description: 'Manage marketing data'
  //   },
  //   target: {
  //     columns: targetColumns,
  //     dataSource: fakeTarget,
  //     title: 'Targets',
  //     description: 'Manage targets'
  //   }
};

export const TABLE_TYPES = Object.keys(TABLE_CONFIG) as TableType[];
