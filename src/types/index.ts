import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type BringCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // в тенге (KZT)
  mileage: number; // в километрах
  color: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  employeeId: string; // ID сотрудника, загнавшего авто
  description: string;
  features: string[]; // список особенностей автомобиля
  imageUrl: string; // URL или путь к изображению
  createdAt: string; // дата и время создания записи
};

export type Clients = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  wish: string;
  createdAt: string; // дата и время создания записи
};

export type SoldCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // в тенге (KZT)
  saleType: 'cash' | 'credit';
  bankCredit: 'bereke' | 'kaspi' | 'halyk';
  mileage: number; // в километрах
  color: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  bringEmployeeId: string; // ID сотрудника, загнавшего авто
  saleEmployeeId: string; // ID сотрудника, загнавшего авто
  marketgingEmployeeId: string; // ID сотрудника, загнавшего авто
  description: string;
  features: string[]; // список особенностей автомобиля
  imageUrl: string; // URL или путь к изображению
  createdAt: string; // дата и время создания записи
  soldAt: string;
};

export type Marketing = {
  id: string;
  marketgingEmployeeId: string; // ID сотрудника, загнавшего авто
  imageUrl: string; // URL или путь к изображению
  createdAt: string; // дата и время создания записи
  viewCount: number;
};

export type Target = {
  id: string;
  marketgingEmployeeId: string; // ID сотрудника, загнавшего авто
  imageUrl: string; // URL или путь к изображению
  createdAt: string; // дата и время создания записи
  viewCount: number;
  spendAmount: number;
  leadsCount: number;
};

export type TableType =
  | 'clients'
  | 'bringCar'
  | 'soldCar'
  | 'marketing'
  | 'target';

export async function getProductsByType(type: TableType) {
  // В реальном проекте — fetch из API или базы
  switch (type) {
    case 'clients':
      return { total_products: clients.length, products: clients };
    case 'bringCar':
      return { total_products: bringCars.length, products: bringCars };
    case 'soldCar':
      return { total_products: soldCars.length, products: soldCars };
    case 'marketing':
      return { total_products: marketingData.length, products: marketingData };
    case 'target':
      return { total_products: targetData.length, products: targetData };
    default:
      return { total_products: 0, products: [] };
  }
}
