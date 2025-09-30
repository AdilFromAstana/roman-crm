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

export type TableType = 'bringCar' | 'soldCar' | 'clients';
// | 'marketing'
// | 'target';

// export async function getProductsByType(type: TableType) {
//   // В реальном проекте — fetch из API или базы
//   switch (type) {
//     case 'bringCar':
//       return { total_products: bringCars.length, products: bringCars };
//     case 'soldCar':
//       return { total_products: soldCars.length, products: soldCars };
//     // case 'clients':
//     //   return { total_products: clients.length, products: clients };
//     // case 'marketing':
//     //   return { total_products: marketingData.length, products: marketingData };
//     // case 'target':
//     //   return { total_products: targetData.length, products: targetData };
//     default:
//       return { total_products: 0, products: [] };
//   }
// }

// Базовые справочники
export interface Brand {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Model {
  id: string;
  code: string;
  name: string;
  brandId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  code: string;
  name: string;
  hexCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FuelType {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transmission {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Фото авто
export interface BringCarImage {
  id: string;
  url: string;
  bringCarId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BringCarStatus {
  id: string;
  code: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Сотрудник
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  positionCodes: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Авто
export interface BringCar {
  id: string;
  brandCode: string;
  brand: Brand;
  modelCode: string;
  model: Model;
  year: number;
  price: string; // из БД приходит строка
  salePrice: string;
  mileage: number;
  colorCode: string;
  color: Color;
  fuelTypeCode: string;
  fuelType: FuelType;
  transmissionCode: string;
  transmission: Transmission;
  featureCodes: string[];
  description: string;
  bringEmployeeId: string;
  bringEmployee: Employee;
  bringCarStatusCode: string;
  bringCarStatus: BringCarStatus;
  createdAt: string;
  isActive: boolean;
  createdDatabaseAt: string;
  updatedDatabaseAt: string;
  images: BringCarImage[];
}

// Клиент
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  iin?: string;
  phone: string;
  email?: string;
  address?: string;
  birthDate?: string; // ISO
  trafficSourceCode?: string;
  trafficSource?: {
    id: string;
    code: string;
    name: string;
    description?: string;
    icon?: string;
    sortOrder?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  warmingLevel?: number;
  customerStatusCode?: string;
  customerStatus?: {
    id: string;
    code: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    sortOrder?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  tags?: string[];
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Статус продажи
export interface SalesStatus {
  id: string;
  code: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Продажа
export interface Sale {
  id: string;
  bringCarId: string;
  bringCar: BringCar;
  customerId: string;
  customer: Customer;
  saleEmployeeId: string;
  saleEmployee: Employee;
  bringEmployeeId: string;
  bringEmployee: Employee;
  managerEmployeeId: string;
  managerEmployee: Employee;

  purchasePrice: string;
  salePrice: string;
  netProfit: string;
  saleEmployeeBonus: string;
  bringEmployeeBonus: string;
  managerEmployeeBonus: string;
  totalBonuses: string;

  salesStatusCode: string;
  salesStatus: SalesStatus;

  isCommissionPaid: boolean;
  saleDate: string;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaleFormDataPayload {
  bringCarId: string;
  customerId: string;
  saleEmployeeId: string;
  bringEmployeeId: string;
  managerEmployeeId: string;
  salePrice: number;
  purchasePrice: number;
  totalBonuses: number;
  saleDate: string;
  saleType: string;
  bankId?: string | null;
  notes?: string;
  isActive: boolean;
}

export interface SaleFormData {
  bringCarId?: string;
  purchasePrice?: number;
  salePrice?: number;

  // Клиент
  customerId?: string;
  clientName?: string;
  clientPhone?: string;
  customer?: Customer; // 🔥 полный объект

  // Сотрудники и бонусы
  saleEmployeeId?: string;
  bringEmployeeId?: string;
  managerEmployeeId?: string;
  saleEmployeeBonus?: number;
  bringEmployeeBonus?: number;
  managerEmployeeBonus?: number;
  totalBonuses?: number;

  // Сделка
  saleDate?: string;
  saleType?: string;
  bankId?: string;
  downPayment?: number;
  notes?: string;

  // Служебные
  isActive?: boolean;

  salesStatusCode?: string;
  id?: string;

  salesStatus?: {
    id: string;
    code: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    order: 1;
  };
}

export const formatPrice = (value?: number | string | null) => {
  if (!value) return '0 ₸';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₸';
};
