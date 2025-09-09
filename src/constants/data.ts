import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Главная',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Загон',
    url: '/dashboard/bring',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Таргет',
    url: '/dashboard/target',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Клиенты',
    url: '/dashboard/clients',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Маркетинг',
    url: '/dashboard/marketing',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Профиль',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

export const EMPLOYEES = [
  { value: 'emp-1', label: 'Иван Петров', photo: '/images/emp1.jpg' },
  { value: 'emp-2', label: 'Мария Сидорова', photo: '/images/emp2.jpg' },
  { value: 'emp-3', label: 'Алексей Козлов', photo: '/images/emp3.jpg' },
  { value: 'emp-4', label: 'Елена Смирнова', photo: '/images/emp4.jpg' }
];

export const BRANDS = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'kia', label: 'Kia' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'bmw', label: 'BMW' }
];

export const MODELS_BY_BRAND: Record<
  string,
  { value: string; label: string }[]
> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land_cruiser_prado', label: 'Land Cruiser Prado' },
    { value: 'highlander', label: 'Highlander' }
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
    { value: 'ceed', label: 'Ceed' },
    { value: 'k5', label: 'K5' }
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'creta', label: 'Creta' },
    { value: 'elantra', label: 'Elantra' },
    { value: 'santa_fe', label: 'Santa Fe' }
  ],
  nissan: [
    { value: 'x-trail', label: 'X-Trail' },
    { value: 'qashqai', label: 'Qashqai' },
    { value: 'murano', label: 'Murano' },
    { value: 'patrol', label: 'Patrol' },
    { value: 'note', label: 'Note' }
  ],
  bmw: [
    { value: 'x5', label: 'X5' },
    { value: 'x3', label: 'X3' },
    { value: '3-series', label: '3 Series' },
    { value: '5-series', label: '5 Series' },
    { value: 'i4', label: 'i4' }
  ]
};

export const FUEL_TYPES = [
  { value: 'petrol', label: 'Бензин' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'electric', label: 'Электро' },
  { value: 'hybrid', label: 'Гибрид' }
];

export const TRANSMISSIONS = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' }
];

export const getEmployeeName = (id: string) =>
  EMPLOYEES.find((emp) => emp.value === id)?.label || 'Неизвестен';

export const getEmployeePhoto = (id: string) =>
  EMPLOYEES.find((emp) => emp.value === id)?.photo ||
  '/images/default-avatar.png';

export const formatFuelType = (type: string) => {
  const map: Record<string, string> = {
    petrol: 'Бензин',
    diesel: 'Дизель',
    electric: 'Электро',
    hybrid: 'Гибрид'
  };
  return map[type] || type;
};

export const formatTransmission = (type: string) => {
  const map: Record<string, string> = {
    manual: 'Механика',
    automatic: 'Автомат'
  };
  return map[type] || type;
};

export const formatFeature = (featureId: string) => {
  const featureMap: Record<string, string> = {
    winter_tires: '❄️ Зимняя резина',
    ceramic_coating: '🧪 Керамическое покрытие',
    armor_film: '🛡️ Бронеплёнка',
    floor_mats: '🧳 Коврики',
    car_cover: '🧥 Чехол',
    extended_warranty: '🔧 Расш. гарантия',
    free_service: '🛢️ Бесплатное ТО',
    navigation: '🗺️ Навигация + 360°',
    premium_sound: '🔊 Премиум звук',
    leather_seats: '🪑 Кожаные сиденья'
  };
  return featureMap[featureId] || featureId;
};
