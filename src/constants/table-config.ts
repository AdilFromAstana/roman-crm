// constants/table-config.ts
import { TableType } from '@/types';

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
    columns: [],
    dataSource: {},
    title: 'Загон машин',
    description: 'Управление загнаными машина'
  },
  soldCar: {
    columns: [],
    dataSource: {},
    title: 'Проданные машины',
    description: 'Управление продаными машинами'
  },
  clients: {
    title: 'Клиенты',
    description: 'Управление клиентами',
    columns: [],
    dataSource: {}
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
