import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';
import { SoldCar } from '@/types';

export const fakeSoldCar = {
  records: [] as SoldCar[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    this.records = [
      {
        id: 'sc-001',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 14800000,
        saleType: 'cash',
        bankCredit: 'kaspi', // не используется при cash, но для структуры оставим
        mileage: 52000,
        color: 'Серебристый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-3',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Айдару Т. — в отличном состоянии, один хозяин, полный сервис.',
        features: [
          'Климат-контроль',
          'Круиз-контроль',
          'Камера заднего вида',
          'Подогрев сидений'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Toyota+Camry+2020',
        createdAt: '2024-06-01T11:00:00Z',
        soldAt: '2024-06-05T16:30:00Z'
      },
      {
        id: 'sc-002',
        brand: 'Hyundai',
        model: 'Creta',
        year: 2021,
        price: 9800000,
        saleType: 'credit',
        bankCredit: 'halyk',
        mileage: 35000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Гульнаре А. — идеальное состояние, женская эксплуатация.',
        features: [
          'Панорамная крыша',
          'Мультимедиа',
          'Датчики парковки',
          'Электропривод сидений'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Hyundai+Creta+2021',
        createdAt: '2024-06-02T15:00:00Z',
        soldAt: '2024-06-07T18:10:00Z'
      },
      {
        id: 'sc-003',
        brand: 'BMW',
        model: '3 Series',
        year: 2017,
        price: 8300000,
        saleType: 'cash',
        bankCredit: 'bereke',
        mileage: 89000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'manual',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-3',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Ерлану С. — спортивная комплектация, механика, бензин.',
        features: [
          'Спортивный обвес',
          'Кожаный салон',
          'Пуск с кнопки',
          'LED фары'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=BMW+3+Series+2017',
        createdAt: '2024-06-03T10:30:00Z',
        soldAt: '2024-06-08T14:20:00Z'
      },
      {
        id: 'sc-004',
        brand: 'Mitsubishi',
        model: 'Pajero Sport',
        year: 2019,
        price: 13500000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 68000,
        color: 'Серый',
        fuelType: 'diesel',
        transmission: 'automatic',
        bringEmployeeId: 'emp-3',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Айгерим Ж. — 7 мест, полный привод, идеально для семьи.',
        features: [
          '7 мест',
          'Полный привод',
          'Климат-контроль',
          'Подогрев руля'
        ],
        imageUrl:
          'https://via.placeholder.com/300x200?text=Mitsubishi+Pajero+Sport',
        createdAt: '2024-06-04T17:00:00Z',
        soldAt: '2024-06-10T19:45:00Z'
      },
      {
        id: 'sc-005',
        brand: 'Kia',
        model: 'Rio',
        year: 2019,
        price: 4900000,
        saleType: 'cash',
        bankCredit: 'halyk',
        mileage: 75000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-1',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-4',
        description: 'Продано Данияру Н. — экономичный, надежный, для города.',
        features: [
          'Кондиционер',
          'Аудиосистема',
          'ABS',
          'Подушки безопасности'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Kia+Rio+2019',
        createdAt: '2024-06-05T12:00:00Z',
        soldAt: '2024-06-11T13:05:00Z'
      },
      {
        id: 'sc-006',
        brand: 'BYD',
        model: 'Seal',
        year: 2023,
        price: 17500000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 8000,
        color: 'Синий',
        fuelType: 'electric',
        transmission: 'automatic',
        bringEmployeeId: 'emp-4',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Жанне О. — электромобиль, почти новый, зарядка до 80% за 30 мин.',
        features: [
          'Электропривод',
          'Автопилот L2',
          'Панорамная крыша',
          'Тепловой насос'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=BYD+Seal+2023',
        createdAt: '2024-06-06T14:30:00Z',
        soldAt: '2024-06-12T20:00:00Z'
      },
      {
        id: 'sc-007',
        brand: 'Nissan',
        model: 'X-Trail',
        year: 2016,
        price: 8700000,
        saleType: 'credit',
        bankCredit: 'bereke',
        mileage: 112000,
        color: 'Коричневый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-3',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Руслану Б. — полный привод, внедорожные шины в комплекте.',
        features: [
          'Полный привод',
          'Кожаные сиденья',
          'Навигация',
          'Камера 360'
        ],
        imageUrl:
          'https://via.placeholder.com/300x200?text=Nissan+X-Trail+2016',
        createdAt: '2024-06-07T11:00:00Z',
        soldAt: '2024-06-13T15:40:00Z'
      },
      {
        id: 'sc-008',
        brand: 'Hyundai',
        model: 'Solaris',
        year: 2020,
        price: 7200000,
        saleType: 'cash',
        bankCredit: 'kaspi',
        mileage: 45000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-1',
        saleEmployeeId: 'emp-4',
        marketgingEmployeeId: 'emp-2',
        description:
          'Продано Асель Т. — женская эксплуатация, без ДТП, вложений не требует.',
        features: [
          'Автомат',
          'Климат-контроль',
          'Подогрев зеркал',
          'Мультируль'
        ],
        imageUrl:
          'https://via.placeholder.com/300x200?text=Hyundai+Solaris+2020',
        createdAt: '2024-06-08T18:00:00Z',
        soldAt: '2024-06-14T11:30:00Z'
      },
      {
        id: 'sc-009',
        brand: 'Toyota',
        model: 'Land Cruiser Prado',
        year: 2017,
        price: 24000000,
        saleType: 'credit',
        bankCredit: 'halyk',
        mileage: 95000,
        color: 'Чёрный',
        fuelType: 'diesel',
        transmission: 'automatic',
        bringEmployeeId: 'emp-3',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Марату К. — для охоты и бездорожья, усиленная подвеска.',
        features: [
          'Дизель',
          'Полный привод',
          'Лебёдка',
          'Доп. бак',
          'Кенгурятник'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Toyota+Prado+2017',
        createdAt: '2024-06-09T13:30:00Z',
        soldAt: '2024-06-16T17:20:00Z'
      },
      {
        id: 'sc-010',
        brand: 'Chevrolet',
        model: 'Spark',
        year: 2018,
        price: 4200000,
        saleType: 'cash',
        bankCredit: 'bereke',
        mileage: 62000,
        color: 'Красный',
        fuelType: 'petrol',
        transmission: 'manual',
        bringEmployeeId: 'emp-4',
        saleEmployeeId: 'emp-3',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Ляззат М. — идеален для студентов и города, расход 5л/100км.',
        features: [
          'Кондиционер',
          'ABS',
          'Аудиоподготовка',
          'Электростеклоподъёмники'
        ],
        imageUrl:
          'https://via.placeholder.com/300x200?text=Chevrolet+Spark+2018',
        createdAt: '2024-06-10T09:00:00Z',
        soldAt: '2024-06-15T10:15:00Z'
      },
      {
        id: 'sc-011',
        brand: 'Isuzu',
        model: 'D-Max',
        year: 2020,
        price: 11800000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 40000,
        color: 'Зелёный',
        fuelType: 'diesel',
        transmission: 'manual',
        bringEmployeeId: 'emp-1',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-2',
        description:
          'Продано Тимуру Ж. — для строительства и перевозок, усиленная рама.',
        features: ['Дизель 3.0', 'Механика', 'Грузоподъёмность 1 т', 'Лебёдка'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Isuzu+D-Max+2020',
        createdAt: '2024-06-11T16:00:00Z',
        soldAt: '2024-06-18T14:50:00Z'
      },
      {
        id: 'sc-012',
        brand: 'Kia',
        model: 'Rio',
        year: 2021,
        price: 5800000,
        saleType: 'credit',
        bankCredit: 'halyk',
        mileage: 30000,
        color: 'Серый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-3',
        description:
          'Продано Сауле А. — для такси, установлен таксометр, кондиционер.',
        features: [
          'Такси-готов',
          'Кондиционер',
          'Камера',
          'ABS',
          'ЭРА-ГЛОНАСС'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Kia+Rio+Taxi+2021',
        createdAt: '2024-06-12T12:00:00Z',
        soldAt: '2024-06-19T16:30:00Z'
      },
      {
        id: 'sc-013',
        brand: 'Mercedes-Benz',
        model: 'E-Class',
        year: 2016,
        price: 13800000,
        saleType: 'cash',
        bankCredit: 'bereke',
        mileage: 105000,
        color: 'Чёрный',
        fuelType: 'diesel',
        transmission: 'automatic',
        bringEmployeeId: 'emp-3',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Нурлану А. — кожаный салон, дизель, бизнес-класс.',
        features: [
          'Кожа',
          'Дизель',
          'Климат-контроль 2 зоны',
          'Круиз',
          'Парктроники'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Mercedes+E+2016',
        createdAt: '2024-06-13T15:30:00Z',
        soldAt: '2024-06-20T12:10:00Z'
      },
      {
        id: 'sc-014',
        brand: 'Toyota',
        model: 'RAV4',
        year: 2021,
        price: 14200000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 28000,
        color: 'Белый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-4',
        saleEmployeeId: 'emp-3',
        marketgingEmployeeId: 'emp-2',
        description:
          'Продано Айнуру Б. — как новая, один владелец, сервисная книга.',
        features: [
          'Полный привод',
          'Камера 360',
          'Подогрев руля',
          'Apple CarPlay'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Toyota+RAV4+2021',
        createdAt: '2024-06-14T10:00:00Z',
        soldAt: '2024-06-21T18:40:00Z'
      },
      {
        id: 'sc-015',
        brand: 'UAZ',
        model: 'Hunter',
        year: 2019,
        price: 6300000,
        saleType: 'cash',
        bankCredit: 'halyk',
        mileage: 55000,
        color: 'Оранжевый',
        fuelType: 'petrol',
        transmission: 'manual',
        bringEmployeeId: 'emp-1',
        saleEmployeeId: 'emp-4',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Еркебулану С. — для охоты и рыбалки, внедорожник, механика.',
        features: ['Механика', 'Полный привод', 'Защита картера', 'Лебёдка'],
        imageUrl: 'https://via.placeholder.com/300x200?text=UAZ+Hunter+2019',
        createdAt: '2024-06-15T17:00:00Z',
        soldAt: '2024-06-22T13:25:00Z'
      },
      {
        id: 'sc-016',
        brand: 'BMW',
        model: '4 Series',
        year: 2018,
        price: 11500000,
        saleType: 'credit',
        bankCredit: 'bereke',
        mileage: 70000,
        color: 'Красный',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-1',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Динаре К. — купе, кожа, спорт-режим, выглядит как новая.',
        features: ['Купе', 'Кожа', 'Спорт-режим', 'LED', 'Панорамная крыша'],
        imageUrl: 'https://via.placeholder.com/300x200?text=BMW+4+Series+2018',
        createdAt: '2024-06-16T14:00:00Z',
        soldAt: '2024-06-24T17:00:00Z'
      },
      {
        id: 'sc-017',
        brand: 'Kia',
        model: 'Carnival',
        year: 2020,
        price: 12800000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 60000,
        color: 'Белый',
        fuelType: 'diesel',
        transmission: 'automatic',
        bringEmployeeId: 'emp-3',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-3',
        description:
          'Продано Азамату Р. — для семьи из 8 человек, 3 ряда сидений.',
        features: [
          '8 мест',
          'Дизель',
          'Автомат',
          'ТВ в салоне',
          'Климат 3 зоны'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Kia+Carnival+2020',
        createdAt: '2024-06-17T11:00:00Z',
        soldAt: '2024-06-25T15:30:00Z'
      },
      {
        id: 'sc-018',
        brand: 'Renault',
        model: 'Logan',
        year: 2019,
        price: 5300000,
        saleType: 'cash',
        bankCredit: 'halyk',
        mileage: 85000,
        color: 'Синий',
        fuelType: 'petrol',
        transmission: 'manual',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-2',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Жадыре Т. — экономичный, надежный, для начинающих водителей.',
        features: [
          'Газобаллонное оборудование',
          'Кондиционер',
          'ABS',
          'Электрозеркала'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Renault+Logan+2019',
        createdAt: '2024-06-18T18:00:00Z',
        soldAt: '2024-06-26T11:45:00Z'
      },
      {
        id: 'sc-019',
        brand: 'Lexus',
        model: 'RX 350',
        year: 2019,
        price: 21500000,
        saleType: 'credit',
        bankCredit: 'halyk',
        mileage: 58000,
        color: 'Чёрный',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-2',
        saleEmployeeId: 'emp-1',
        marketgingEmployeeId: 'emp-4',
        description:
          'Продано Бауыржану О. — полный привод, кожа, люк, премиум-класс.',
        features: [
          'Полный привод',
          'Кожа',
          'Люк',
          'Навигация',
          'Марковые диски'
        ],
        imageUrl: 'https://via.placeholder.com/300x200?text=Lexus+RX+350+2019',
        createdAt: '2024-06-19T13:00:00Z',
        soldAt: '2024-06-27T19:10:00Z'
      },
      {
        id: 'sc-020',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        price: 11800000,
        saleType: 'credit',
        bankCredit: 'kaspi',
        mileage: 15000,
        color: 'Серебристый',
        fuelType: 'petrol',
        transmission: 'automatic',
        bringEmployeeId: 'emp-4',
        saleEmployeeId: 'emp-3',
        marketgingEmployeeId: 'emp-1',
        description:
          'Продано Айгуль С. — с гарантией, сервисная история, как новая.',
        features: [
          'Гарантия до 2026',
          'Автомат',
          'Климат-контроль',
          'Камера заднего вида'
        ],
        imageUrl:
          'https://via.placeholder.com/300x200?text=Toyota+Corolla+2022',
        createdAt: '2024-06-30T09:30:00Z',
        soldAt: '2024-07-05T14:00:00Z'
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

fakeSoldCar.initialize();
