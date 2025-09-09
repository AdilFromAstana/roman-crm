import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';
import { Marketing } from '@/types';

export const fakeMarketing = {
  records: [] as Marketing[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    this.records = [
      {
        id: 'mk-001',
        marketgingEmployeeId: 'emp-012',
        imageUrl: 'https://via.placeholder.com/600x400?text=Toyota+Camry+Ad',
        createdAt: '2024-06-01T08:00:00Z',
        viewCount: 12500
      },
      {
        id: 'mk-002',
        marketgingEmployeeId: 'emp-014',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Hyundai+Creta+Promo',
        createdAt: '2024-06-02T09:30:00Z',
        viewCount: 9800
      },
      {
        id: 'mk-003',
        marketgingEmployeeId: 'emp-011',
        imageUrl:
          'https://via.placeholder.com/600x400?text=BMW+3+Series+Banner',
        createdAt: '2024-06-03T10:15:00Z',
        viewCount: 7200
      },
      {
        id: 'mk-004',
        marketgingEmployeeId: 'emp-015',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Mitsubishi+Pajero+Ad',
        createdAt: '2024-06-04T11:45:00Z',
        viewCount: 15300
      },
      {
        id: 'mk-005',
        marketgingEmployeeId: 'emp-013',
        imageUrl: 'https://via.placeholder.com/600x400?text=Kia+Rio+Economy',
        createdAt: '2024-06-05T13:20:00Z',
        viewCount: 21000
      },
      {
        id: 'mk-006',
        marketgingEmployeeId: 'emp-016',
        imageUrl: 'https://via.placeholder.com/600x400?text=BYD+Seal+EV+Promo',
        createdAt: '2024-06-06T14:10:00Z',
        viewCount: 8900
      },
      {
        id: 'mk-007',
        marketgingEmployeeId: 'emp-009',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Nissan+X-Trail+Offroad',
        createdAt: '2024-06-07T15:30:00Z',
        viewCount: 11200
      },
      {
        id: 'mk-008',
        marketgingEmployeeId: 'emp-010',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Hyundai+Solaris+City',
        createdAt: '2024-06-08T16:45:00Z',
        viewCount: 18700
      },
      {
        id: 'mk-009',
        marketgingEmployeeId: 'emp-017',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Toyota+Prado+Adventure',
        createdAt: '2024-06-09T17:30:00Z',
        viewCount: 14500
      },
      {
        id: 'mk-010',
        marketgingEmployeeId: 'emp-008',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Chevrolet+Spark+Student',
        createdAt: '2024-06-10T18:00:00Z',
        viewCount: 23500
      },
      {
        id: 'mk-011',
        marketgingEmployeeId: 'emp-007',
        imageUrl: 'https://via.placeholder.com/600x400?text=Isuzu+D-Max+Work',
        createdAt: '2024-06-11T19:15:00Z',
        viewCount: 6800
      },
      {
        id: 'mk-012',
        marketgingEmployeeId: 'emp-018',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Kia+Rio+Taxi+Special',
        createdAt: '2024-06-12T20:00:00Z',
        viewCount: 17400
      },
      {
        id: 'mk-013',
        marketgingEmployeeId: 'emp-006',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Mercedes+E+Class+Luxury',
        createdAt: '2024-06-13T21:30:00Z',
        viewCount: 9200
      },
      {
        id: 'mk-014',
        marketgingEmployeeId: 'emp-019',
        imageUrl: 'https://via.placeholder.com/600x400?text=Toyota+RAV4+Family',
        createdAt: '2024-06-14T08:45:00Z',
        viewCount: 16800
      },
      {
        id: 'mk-015',
        marketgingEmployeeId: 'emp-005',
        imageUrl: 'https://via.placeholder.com/600x400?text=UAZ+Hunter+Offroad',
        createdAt: '2024-06-15T09:30:00Z',
        viewCount: 13100
      },
      {
        id: 'mk-016',
        marketgingEmployeeId: 'emp-020',
        imageUrl: 'https://via.placeholder.com/600x400?text=BMW+4+Series+Coupe',
        createdAt: '2024-06-16T10:15:00Z',
        viewCount: 8700
      },
      {
        id: 'mk-017',
        marketgingEmployeeId: 'emp-004',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Kia+Carnival+Family',
        createdAt: '2024-06-17T11:00:00Z',
        viewCount: 12900
      },
      {
        id: 'mk-018',
        marketgingEmployeeId: 'emp-003',
        imageUrl: 'https://via.placeholder.com/600x400?text=Renault+Logan+Eco',
        createdAt: '2024-06-18T12:30:00Z',
        viewCount: 20300
      },
      {
        id: 'mk-019',
        marketgingEmployeeId: 'emp-002',
        imageUrl: 'https://via.placeholder.com/600x400?text=Lexus+RX+Premium',
        createdAt: '2024-06-19T13:45:00Z',
        viewCount: 10500
      },
      {
        id: 'mk-020',
        marketgingEmployeeId: 'emp-001',
        imageUrl: 'https://via.placeholder.com/600x400?text=Toyota+Corolla+New',
        createdAt: '2024-06-20T14:30:00Z',
        viewCount: 19200
      },
      {
        id: 'mk-021',
        marketgingEmployeeId: 'emp-014',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Skoda+Octavia+Space',
        createdAt: '2024-06-22T15:00:00Z',
        viewCount: 11700
      },
      {
        id: 'mk-022',
        marketgingEmployeeId: 'emp-011',
        imageUrl: 'https://via.placeholder.com/600x400?text=Volvo+XC60+Safety',
        createdAt: '2024-06-24T16:20:00Z',
        viewCount: 9400
      },
      {
        id: 'mk-023',
        marketgingEmployeeId: 'emp-015',
        imageUrl: 'https://via.placeholder.com/600x400?text=Ford+Mustang+Sport',
        createdAt: '2024-06-26T17:10:00Z',
        viewCount: 13800
      },
      {
        id: 'mk-024',
        marketgingEmployeeId: 'emp-013',
        imageUrl: 'https://via.placeholder.com/600x400?text=Mazda+CX-5+Style',
        createdAt: '2024-06-28T18:30:00Z',
        viewCount: 15600
      },
      {
        id: 'mk-025',
        marketgingEmployeeId: 'emp-016',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Subaru+Forester+AWD',
        createdAt: '2024-06-30T19:00:00Z',
        viewCount: 12200
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

fakeMarketing.initialize();
