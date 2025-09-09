import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';
import { Target } from '@/types';

export const fakeTarget = {
  records: [] as Target[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    this.records = [
      {
        id: 'tg-001',
        marketgingEmployeeId: 'emp-012',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Toyota+Camry+Target',
        createdAt: '2024-06-01T08:30:00Z',
        viewCount: 8500,
        spendAmount: 350000,
        leadsCount: 42
      },
      {
        id: 'tg-002',
        marketgingEmployeeId: 'emp-014',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Hyundai+Creta+Target',
        createdAt: '2024-06-02T10:00:00Z',
        viewCount: 6200,
        spendAmount: 280000,
        leadsCount: 38
      },
      {
        id: 'tg-003',
        marketgingEmployeeId: 'emp-011',
        imageUrl: 'https://via.placeholder.com/600x400?text=BMW+3+Target',
        createdAt: '2024-06-03T11:00:00Z',
        viewCount: 4100,
        spendAmount: 420000,
        leadsCount: 22
      },
      {
        id: 'tg-004',
        marketgingEmployeeId: 'emp-015',
        imageUrl:
          'https://via.placeholder.com/600x400?text=Pajero+Sport+Target',
        createdAt: '2024-06-04T12:30:00Z',
        viewCount: 9800,
        spendAmount: 390000,
        leadsCount: 51
      },
      {
        id: 'tg-005',
        marketgingEmployeeId: 'emp-013',
        imageUrl: 'https://via.placeholder.com/600x400?text=Kia+Rio+Target',
        createdAt: '2024-06-05T14:00:00Z',
        viewCount: 15200,
        spendAmount: 220000,
        leadsCount: 89
      },
      {
        id: 'tg-006',
        marketgingEmployeeId: 'emp-016',
        imageUrl: 'https://via.placeholder.com/600x400?text=BYD+Seal+Target',
        createdAt: '2024-06-06T15:00:00Z',
        viewCount: 5300,
        spendAmount: 500000,
        leadsCount: 18
      },
      {
        id: 'tg-007',
        marketgingEmployeeId: 'emp-009',
        imageUrl: 'https://via.placeholder.com/600x400?text=X-Trail+Target',
        createdAt: '2024-06-07T16:00:00Z',
        viewCount: 7400,
        spendAmount: 330000,
        leadsCount: 33
      },
      {
        id: 'tg-008',
        marketgingEmployeeId: 'emp-010',
        imageUrl: 'https://via.placeholder.com/600x400?text=Solaris+Target',
        createdAt: '2024-06-08T17:30:00Z',
        viewCount: 12800,
        spendAmount: 250000,
        leadsCount: 76
      },
      {
        id: 'tg-009',
        marketgingEmployeeId: 'emp-017',
        imageUrl: 'https://via.placeholder.com/600x400?text=Prado+Target',
        createdAt: '2024-06-09T18:15:00Z',
        viewCount: 9100,
        spendAmount: 480000,
        leadsCount: 29
      },
      {
        id: 'tg-010',
        marketgingEmployeeId: 'emp-008',
        imageUrl: 'https://via.placeholder.com/600x400?text=Spark+Target',
        createdAt: '2024-06-10T19:00:00Z',
        viewCount: 17300,
        spendAmount: 180000,
        leadsCount: 105
      },
      {
        id: 'tg-011',
        marketgingEmployeeId: 'emp-007',
        imageUrl: 'https://via.placeholder.com/600x400?text=D-Max+Target',
        createdAt: '2024-06-11T20:00:00Z',
        viewCount: 4500,
        spendAmount: 310000,
        leadsCount: 17
      },
      {
        id: 'tg-012',
        marketgingEmployeeId: 'emp-018',
        imageUrl: 'https://via.placeholder.com/600x400?text=Rio+Taxi+Target',
        createdAt: '2024-06-12T21:00:00Z',
        viewCount: 11200,
        spendAmount: 270000,
        leadsCount: 63
      },
      {
        id: 'tg-013',
        marketgingEmployeeId: 'emp-006',
        imageUrl: 'https://via.placeholder.com/600x400?text=Mercedes+E+Target',
        createdAt: '2024-06-13T22:00:00Z',
        viewCount: 5900,
        spendAmount: 550000,
        leadsCount: 24
      },
      {
        id: 'tg-014',
        marketgingEmployeeId: 'emp-019',
        imageUrl: 'https://via.placeholder.com/600x400?text=RAV4+Target',
        createdAt: '2024-06-14T09:00:00Z',
        viewCount: 10700,
        spendAmount: 410000,
        leadsCount: 47
      },
      {
        id: 'tg-015',
        marketgingEmployeeId: 'emp-005',
        imageUrl: 'https://via.placeholder.com/600x400?text=UAZ+Hunter+Target',
        createdAt: '2024-06-15T10:00:00Z',
        viewCount: 8200,
        spendAmount: 290000,
        leadsCount: 31
      },
      {
        id: 'tg-016',
        marketgingEmployeeId: 'emp-020',
        imageUrl: 'https://via.placeholder.com/600x400?text=BMW+4+Target',
        createdAt: '2024-06-16T11:00:00Z',
        viewCount: 5800,
        spendAmount: 470000,
        leadsCount: 20
      },
      {
        id: 'tg-017',
        marketgingEmployeeId: 'emp-004',
        imageUrl: 'https://via.placeholder.com/600x400?text=Carnival+Target',
        createdAt: '2024-06-17T12:00:00Z',
        viewCount: 8900,
        spendAmount: 380000,
        leadsCount: 39
      },
      {
        id: 'tg-018',
        marketgingEmployeeId: 'emp-003',
        imageUrl: 'https://via.placeholder.com/600x400?text=Logan+Target',
        createdAt: '2024-06-18T13:30:00Z',
        viewCount: 14100,
        spendAmount: 200000,
        leadsCount: 82
      },
      {
        id: 'tg-019',
        marketgingEmployeeId: 'emp-002',
        imageUrl: 'https://via.placeholder.com/600x400?text=Lexus+RX+Target',
        createdAt: '2024-06-19T14:30:00Z',
        viewCount: 7300,
        spendAmount: 520000,
        leadsCount: 27
      },
      {
        id: 'tg-020',
        marketgingEmployeeId: 'emp-001',
        imageUrl: 'https://via.placeholder.com/600x400?text=Corolla+Target',
        createdAt: '2024-06-20T15:30:00Z',
        viewCount: 13200,
        spendAmount: 360000,
        leadsCount: 68
      },
      {
        id: 'tg-021',
        marketgingEmployeeId: 'emp-014',
        imageUrl: 'https://via.placeholder.com/600x400?text=Skoda+Target',
        createdAt: '2024-06-22T16:00:00Z',
        viewCount: 7900,
        spendAmount: 320000,
        leadsCount: 41
      },
      {
        id: 'tg-022',
        marketgingEmployeeId: 'emp-011',
        imageUrl: 'https://via.placeholder.com/600x400?text=Volvo+Target',
        createdAt: '2024-06-24T17:20:00Z',
        viewCount: 6100,
        spendAmount: 490000,
        leadsCount: 25
      },
      {
        id: 'tg-023',
        marketgingEmployeeId: 'emp-015',
        imageUrl: 'https://via.placeholder.com/600x400?text=Mustang+Target',
        createdAt: '2024-06-26T18:10:00Z',
        viewCount: 9500,
        spendAmount: 580000,
        leadsCount: 19
      },
      {
        id: 'tg-024',
        marketgingEmployeeId: 'emp-013',
        imageUrl: 'https://via.placeholder.com/600x400?text=Mazda+CX5+Target',
        createdAt: '2024-06-28T19:30:00Z',
        viewCount: 10400,
        spendAmount: 430000,
        leadsCount: 44
      },
      {
        id: 'tg-025',
        marketgingEmployeeId: 'emp-016',
        imageUrl: 'https://via.placeholder.com/600x400?text=Subaru+Target',
        createdAt: '2024-06-30T20:00:00Z',
        viewCount: 8300,
        spendAmount: 370000,
        leadsCount: 36
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

fakeTarget.initialize();
