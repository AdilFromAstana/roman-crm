import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';
import { Clients } from '@/types';

export const fakeClients = {
  records: [] as Clients[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    this.records = [
      {
        id: 'cl-001',
        firstName: 'Айдар',
        lastName: 'Темиров',
        phone: '+7701 234 5678',
        wish: 'Ищу Toyota Camry не старше 2020 года, пробег до 70 000 км, бюджет до 15 000 000 тг.',
        createdAt: '2024-06-01T10:30:00Z'
      },
      {
        id: 'cl-002',
        firstName: 'Гульнара',
        lastName: 'Абдуллаева',
        phone: '+7702 987 6543',
        wish: 'Нужен кроссовер до 10 000 000 тг, Hyundai Creta или Kia Seltos, 2021+ год, автомат.',
        createdAt: '2024-06-02T14:15:00Z'
      },
      {
        id: 'cl-003',
        firstName: 'Ерлан',
        lastName: 'Садвакасов',
        phone: '+7705 111 2233',
        wish: 'Хочу BMW 3 серии, механика, бензин, до 2018 года, бюджет до 8 500 000 тг.',
        createdAt: '2024-06-03T09:45:00Z'
      },
      {
        id: 'cl-004',
        firstName: 'Айгерим',
        lastName: 'Жаксыбаева',
        phone: '+7707 444 5566',
        wish: 'Ищу авто для семьи — 7 мест, до 14 000 000 тг, Mitsubishi Pajero Sport или Toyota Fortuner, 2019+.',
        createdAt: '2024-06-04T16:20:00Z'
      },
      {
        id: 'cl-005',
        firstName: 'Данияр',
        lastName: 'Нургалиев',
        phone: '+7747 999 8877',
        wish: 'Нужна недорогая машина до 5 000 000 тг, Kia Rio или Hyundai Solaris, 2018-2020 гг.',
        createdAt: '2024-06-05T11:10:00Z'
      },
      {
        id: 'cl-006',
        firstName: 'Жанна',
        lastName: 'Омарова',
        phone: '+7708 333 4455',
        wish: 'Хочу электромобиль до 18 000 000 тг — Tesla Model 3 или BYD Seal, новая или с пробегом до 10 000 км.',
        createdAt: '2024-06-06T13:55:00Z'
      },
      {
        id: 'cl-007',
        firstName: 'Руслан',
        lastName: 'Бекмагамбетов',
        phone: '+7777 666 7788',
        wish: 'Ищу внедорожник с полным приводом, до 2017 года, бюджет 9 000 000 тг, Nissan X-Trail или UAZ Patriot.',
        createdAt: '2024-06-07T10:00:00Z'
      },
      {
        id: 'cl-008',
        firstName: 'Асель',
        lastName: 'Тажибаева',
        phone: '+7701 222 3344',
        wish: 'Нужна машина с автоматом, до 7 500 000 тг, не старше 2020 года, предпочтительно белого цвета.',
        createdAt: '2024-06-08T17:30:00Z'
      },
      {
        id: 'cl-009',
        firstName: 'Марат',
        lastName: 'Кенжебаев',
        phone: '+7702 555 6677',
        wish: 'Ищу Toyota Land Cruiser Prado, 2016-2018, бюджет до 25 000 000 тг, с хорошей комплектацией.',
        createdAt: '2024-06-09T12:45:00Z'
      },
      {
        id: 'cl-010',
        firstName: 'Ляззат',
        lastName: 'Мусаханова',
        phone: '+7747 123 4567',
        wish: 'Хочу маленький городской авто до 4 500 000 тг — Daewoo Matiz или Chevrolet Spark, 2017+.',
        createdAt: '2024-06-10T08:20:00Z'
      },
      {
        id: 'cl-011',
        firstName: 'Тимур',
        lastName: 'Жумагулов',
        phone: '+7705 888 9900',
        wish: 'Нужен пикап до 12 000 000 тг — Isuzu D-Max или Mitsubishi L200, 2020 года и новее.',
        createdAt: '2024-06-11T15:10:00Z'
      },
      {
        id: 'cl-012',
        firstName: 'Сауле',
        lastName: 'Айтжанова',
        phone: '+7708 777 8899',
        wish: 'Ищу автомобиль для такси — до 6 000 000 тг, надежный, с кондиционером, Kia Rio 2020+.',
        createdAt: '2024-06-12T11:05:00Z'
      },
      {
        id: 'cl-013',
        firstName: 'Нурлан',
        lastName: 'Ахметов',
        phone: '+7777 321 6549',
        wish: 'Хочу Mercedes-Benz E-Class, до 2017 года, бюджет 14 000 000 тг, кожаный салон обязателен.',
        createdAt: '2024-06-13T14:50:00Z'
      },
      {
        id: 'cl-014',
        firstName: 'Айнур',
        lastName: 'Бейсенова',
        phone: '+7701 999 1122',
        wish: 'Ищу авто с пробегом до 30 000 км, до 10 000 000 тг, предпочтительно Toyota RAV4 2021.',
        createdAt: '2024-06-14T09:30:00Z'
      },
      {
        id: 'cl-015',
        firstName: 'Еркебулан',
        lastName: 'Султанов',
        phone: '+7702 444 7777',
        wish: 'Нужна машина для бездорожья — UAZ Hunter или Niva, бюджет до 6 500 000 тг, механика.',
        createdAt: '2024-06-15T16:40:00Z'
      },
      {
        id: 'cl-016',
        firstName: 'Динара',
        lastName: 'Кадырова',
        phone: '+7747 222 8888',
        wish: 'Хочу кабриолет или купе до 12 000 000 тг — BMW 4 серии или Audi A5, 2018+ год.',
        createdAt: '2024-06-16T13:25:00Z'
      },
      {
        id: 'cl-017',
        firstName: 'Азамат',
        lastName: 'Рахимов',
        phone: '+7705 666 1111',
        wish: 'Ищу минивэн до 11 000 000 тг — Toyota Sienna или Kia Carnival, для большой семьи.',
        createdAt: '2024-06-17T10:15:00Z'
      },
      {
        id: 'cl-018',
        firstName: 'Жадыра',
        lastName: 'Турсунова',
        phone: '+7708 555 2222',
        wish: 'Нужен экономичный авто до 5 500 000 тг — Renault Logan или Lada Vesta, 2019+ год.',
        createdAt: '2024-06-18T17:55:00Z'
      },
      {
        id: 'cl-019',
        firstName: 'Бауыржан',
        lastName: 'Омаров',
        phone: '+7777 999 3333',
        wish: 'Хочу Lexus RX 350, до 2020 года, бюджет до 22 000 000 тг, полный привод, кожа.',
        createdAt: '2024-06-19T12:30:00Z'
      },
      {
        id: 'cl-020',
        firstName: 'Карлыгаш',
        lastName: 'Сарсенбаева',
        phone: '+7701 777 4444',
        wish: 'Ищу авто с газом, до 7 000 000 тг — Hyundai Elantra или Kia Cerato, 2018-2020 гг.',
        createdAt: '2024-06-20T08:45:00Z'
      },
      {
        id: 'cl-021',
        firstName: 'Ринат',
        lastName: 'Жакупов',
        phone: '+7702 888 5555',
        wish: 'Нужен автомобиль для поездок в Алматы-Нур-Султан — комфорт, до 13 000 000 тг, Toyota Camry или аналог.',
        createdAt: '2024-06-21T15:35:00Z'
      },
      {
        id: 'cl-022',
        firstName: 'Айжан',
        lastName: 'Мухамеджанова',
        phone: '+7747 111 9999',
        wish: 'Хочу малолитражку до 4 000 000 тг — Suzuki Swift или Chevrolet Spark, АКПП, 2018+.',
        createdAt: '2024-06-22T11:20:00Z'
      },
      {
        id: 'cl-023',
        firstName: 'Ербол',
        lastName: 'Тургумбаев',
        phone: '+7705 222 6666',
        wish: 'Ищу авто с большим багажником — Skoda Octavia или Volkswagen Passat, до 9 500 000 тг, 2020+.',
        createdAt: '2024-06-23T14:10:00Z'
      },
      {
        id: 'cl-024',
        firstName: 'Гаухар',
        lastName: 'Алиева',
        phone: '+7708 333 7777',
        wish: 'Нужна машина в подарок жене — до 16 000 000 тг, красного цвета, кроссовер, например, Volvo XC60.',
        createdAt: '2024-06-24T09:50:00Z'
      },
      {
        id: 'cl-025',
        firstName: 'Талгат',
        lastName: 'Бердибеков',
        phone: '+7777 444 8888',
        wish: 'Хочу спорткар до 20 000 000 тг — Ford Mustang или Nissan 370Z, 2016-2019 гг.',
        createdAt: '2024-06-25T16:05:00Z'
      },
      {
        id: 'cl-026',
        firstName: 'Жанар',
        lastName: 'Касымова',
        phone: '+7701 555 9999',
        wish: 'Ищу авто с камерой заднего вида и датчиками — до 8 000 000 тг, Kia Sportage 2020+.',
        createdAt: '2024-06-26T13:40:00Z'
      },
      {
        id: 'cl-027',
        firstName: 'Алишер',
        lastName: 'Мусин',
        phone: '+7702 666 0000',
        wish: 'Нужен автомобиль с зимней резиной в комплекте — до 7 500 000 тг, Subaru Forester 2017+.',
        createdAt: '2024-06-27T10:25:00Z'
      },
      {
        id: 'cl-028',
        firstName: 'Мадина',
        lastName: 'Ермекова',
        phone: '+7747 777 1111',
        wish: 'Хочу машину с панорамной крышей и подогревом сидений — до 14 000 000 тг, Mazda CX-5 2021+.',
        createdAt: '2024-06-28T17:15:00Z'
      },
      {
        id: 'cl-029',
        firstName: 'Кайрат',
        lastName: 'Абдиров',
        phone: '+7705 888 2222',
        wish: 'Ищу авто для бизнеса — до 18 000 000 тг, представительский класс, Mercedes E или BMW 5 серии.',
        createdAt: '2024-06-29T12:00:00Z'
      },
      {
        id: 'cl-030',
        firstName: 'Айгуль',
        lastName: 'Сатыбалдина',
        phone: '+7708 999 3333',
        wish: 'Нужна машина с гарантией и сервисной историей — до 12 000 000 тг, Toyota Corolla 2022 года.',
        createdAt: '2024-06-30T09:10:00Z'
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

fakeClients.initialize();
