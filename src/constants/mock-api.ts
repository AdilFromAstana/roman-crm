////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { BringCar } from '@/types';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock product data store
export const fakeBringCars = {
  records: [] as BringCar[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    this.records = [
      {
        id: 'car-001',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 15500000,
        mileage: 42000,
        color: 'Серебристый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Отличное состояние, один хозяин, полный комплект, не битая, не крашеная.',
        imageUrl: '/images/toyota-camry-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-002',
        brand: 'Hyundai',
        model: 'Solaris',
        year: 2021,
        price: 9800000,
        mileage: 28000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Автомобиль в идеальном состоянии, вложений не требует, все сервисы по регламенту.',
        imageUrl: '/images/hyundai-solaris-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-003',
        brand: 'Kia',
        model: 'Rio',
        year: 2022,
        price: 11200000,
        mileage: 15000,
        color: 'Красный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Новая машина, первый хозяин, гарантия до 2026, полная комплектация.',
        imageUrl: '/images/kia-rio-2022.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-004',
        brand: 'Nissan',
        model: 'X-Trail',
        year: 2019,
        price: 13500000,
        mileage: 65000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Полный привод, климат-контроль, панорамная крыша, отличный вариант для семьи.',
        imageUrl: '/images/nissan-x-trail-2019.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-005',
        brand: 'Volkswagen',
        model: 'Tiguan',
        year: 2020,
        price: 16800000,
        mileage: 50000,
        color: 'Серый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Дизель, полный привод, отличная динамика и комфорт, в идеальном техсостоянии.',
        imageUrl: '/images/vw-tiguan-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-006',
        brand: 'Toyota',
        model: 'RAV4',
        year: 2021,
        price: 19500000,
        mileage: 35000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Полный привод, адаптивный круиз, камера 360, кожаный салон, не требует вложений.',
        imageUrl: '/images/toyota-rav4-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-007',
        brand: 'Mazda',
        model: 'CX-5',
        year: 2020,
        price: 14200000,
        mileage: 55000,
        color: 'Красный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Японец, в отличном состоянии, обслужен у официала, не крашен, не бит.',
        imageUrl: '/images/mazda-cx5-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-008',
        brand: 'Honda',
        model: 'CR-V',
        year: 2019,
        price: 13800000,
        mileage: 72000,
        color: 'Серебристый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Надёжный внедорожник, 4WD, отличная шумоизоляция, обслужен регулярно.',
        imageUrl: '/images/honda-cr-v-2019.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-009',
        brand: 'Lexus',
        model: 'RX 350',
        year: 2018,
        price: 22000000,
        mileage: 80000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Премиум-класс, кожа, подогрев всех сидений, люк, климат, в идеальном состоянии.',
        imageUrl: '/images/lexus-rx350-2018.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-010',
        brand: 'BMW',
        model: 'X5',
        year: 2020,
        price: 28500000,
        mileage: 48000,
        color: 'Синий',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Дизель xDrive, M-пакет, пневмоподвеска, вложений не требует, один хозяин.',
        imageUrl: '/images/bmw-x5-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-011',
        brand: 'Mercedes-Benz',
        model: 'GLC 250',
        year: 2019,
        price: 21000000,
        mileage: 62000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Кожаный салон, панорамная крыша, адаптивные фары, обслужена у официала.',
        imageUrl: '/images/mercedes-glc-2019.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-012',
        brand: 'Audi',
        model: 'Q5',
        year: 2021,
        price: 24500000,
        mileage: 30000,
        color: 'Серый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Quattro, виртуальная приборка, Bang & Olufsen, идеальное состояние.',
        imageUrl: '/images/audi-q5-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-013',
        brand: 'Toyota',
        model: 'Land Cruiser Prado',
        year: 2018,
        price: 26000000,
        mileage: 95000,
        color: 'Бежевый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Идеальный внедорожник для бездорожья, полный привод, блокировки, неубиваемая машина.',
        imageUrl: '/images/toyota-prado-2018.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-014',
        brand: 'Mitsubishi',
        model: 'Pajero Sport',
        year: 2020,
        price: 17500000,
        mileage: 58000,
        color: 'Чёрный',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Super Select 4WD, кожа, подогрев, камера заднего вида, отличное состояние.',
        imageUrl: '/images/mitsubishi-pajero-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-015',
        brand: 'SsangYong',
        model: 'Rexton',
        year: 2021,
        price: 18500000,
        mileage: 40000,
        color: 'Серебристый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Полный фарш, 7 мест, пневмоподвеска, кожа, отличный семейный внедорожник.',
        imageUrl: '/images/ssangyong-rexton-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-016',
        brand: 'Chevrolet',
        model: 'Captiva',
        year: 2017,
        price: 8500000,
        mileage: 110000,
        color: 'Серый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Большой и вместительный, 7 мест, обслужен, вложений не требует.',
        imageUrl: '/images/chevrolet-captiva-2017.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-017',
        brand: 'Skoda',
        model: 'Octavia',
        year: 2020,
        price: 12500000,
        mileage: 45000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Надёжная и экономичная, полный пакет, в отличном состоянии.',
        imageUrl: '/images/skoda-octavia-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-018',
        brand: 'Renault',
        model: 'Duster',
        year: 2021,
        price: 10500000,
        mileage: 32000,
        color: 'Оранжевый',
        fuelType: 'petrol',
        transmission: 'manual',
        employeeId: 'emp-1',
        description:
          'Полный привод, механика, отличный вариант для города и бездорожья.',
        imageUrl: '/images/renault-duster-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-019',
        brand: 'Geely',
        model: 'Coolray',
        year: 2022,
        price: 13000000,
        mileage: 20000,
        color: 'Красный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Турбомотор, панорамная крыша, кожа, современный дизайн, отличное состояние.',
        imageUrl: '/images/geely-coolray-2022.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-020',
        brand: 'Chery',
        model: 'Tiggo 8 Pro',
        year: 2023,
        price: 18000000,
        mileage: 8000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Флагманский кроссовер, 7 мест, два экрана, адаптивный круиз, новая машина.',
        imageUrl: '/images/chery-tiggo8-2023.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-021',
        brand: 'Haval',
        model: 'Jolion',
        year: 2022,
        price: 14500000,
        mileage: 25000,
        color: 'Синий',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Полный комплект, камера 360, подогрев руля и сидений, отличное состояние.',
        imageUrl: '/images/haval-jolion-2022.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-022',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 12000000,
        mileage: 50000,
        color: 'Серебристый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Надёжная как швейцарские часы, один хозяин, обслужена, не бита.',
        imageUrl: '/images/toyota-corolla-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-023',
        brand: 'Kia',
        model: 'Sportage',
        year: 2021,
        price: 15500000,
        mileage: 40000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          'Полный привод, панорамная крыша, виртуальная приборка, отличный кроссовер.',
        imageUrl: '/images/kia-sportage-2021.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-024',
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2020,
        price: 14800000,
        mileage: 52000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Свежий рестайлинг, отличная шумка, климат-контроль, не требует вложений.',
        imageUrl: '/images/hyundai-tucson-2020.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-025',
        brand: 'Nissan',
        model: 'Murano',
        year: 2018,
        price: 12500000,
        mileage: 85000,
        color: 'Коричневый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Мягкая подвеска, кожаный салон, люк, отличный вариант для комфортных поездок.',
        imageUrl: '/images/nissan-murano-2018.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-026',
        brand: 'Infiniti',
        model: 'QX60',
        year: 2019,
        price: 19000000,
        mileage: 70000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Премиум-кроссовер, 7 мест, кожа,BOSE, адаптивный круиз, в отличном состоянии.',
        imageUrl: '/images/infiniti-qx60-2019.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      },
      {
        id: 'car-027',
        brand: 'Ford',
        model: 'Explorer',
        year: 2020,
        price: 23000000,
        mileage: 60000,
        color: 'Серый',
        fuelType: 'petrol',
        transmission: 'automatic',
        employeeId: 'emp-3',
        description:
          '3.5 л V6, полный привод, 3 ряда сидений, отличный семейный автомобиль.',
        imageUrl: '/images/ford-explorer-2020.jpg',
        features: [
          'Полный привод',
          'Кожаный салон',
          'Подогрев сидений',
          'LED фары'
        ]
      },
      {
        id: 'car-028',
        brand: 'Jeep',
        model: 'Grand Cherokee',
        year: 2019,
        price: 21500000,
        mileage: 75000,
        color: 'Чёрный',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-4',
        description:
          'Quadra-Trac II, кожа, люк, подогрев, отличное состояние, не бит.',
        imageUrl: '/images/jeep-grand-cherokee-2019.jpg',
        features: [
          'Полный привод',
          'Кожаный салон',
          'Подогрев сидений',
          'LED фары'
        ]
      },
      {
        id: 'car-029',
        brand: 'Volvo',
        model: 'XC60',
        year: 2021,
        price: 25000000,
        mileage: 35000,
        color: 'Белый',
        fuelType: 'diesel',
        transmission: 'automatic',
        employeeId: 'emp-2',
        description:
          'Премиум-безопасность, адаптивный круиз, массаж сидений, обслужена у официала.',
        imageUrl: '/images/volvo-xc60-2021.jpg',
        features: [
          'Панорамная крыша',
          'Кожаный салон',
          'Адаптивный круиз',
          'LED фары'
        ]
      },
      {
        id: 'car-030',
        brand: 'Tesla',
        model: 'Model Y',
        year: 2023,
        price: 32000000,
        mileage: 12000,
        color: 'Белый',
        fuelType: 'electric',
        transmission: 'automatic',
        employeeId: 'emp-1',
        description:
          'Long Range, автопилот, обновления по воздуху, почти новая, идеальное состояние.',
        imageUrl: '/images/tesla-model-y-2023.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ]
      }
    ] as const;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.brand)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: string) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeBringCars.initialize();
