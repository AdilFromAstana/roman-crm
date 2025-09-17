import { BringCar } from '@/types';
import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';

export const fakeBringCar = {
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
        imageUrl:
          'https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/0725/a7dce87fb39d4f378c9f3f4aa091a6cc_hrs.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://s9.auto.drom.ru/photo/v2/IZyit9hXJQ-UTBQ0JeKvtKnkk_amL3kU1VIiBLiueEVxCk0xQ4IJqgUSko9eO_tg6j3tiXEmOSNgTWLz/gen1200.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://www.aelita.ua/wp-content/uploads/2021/06/IMG_0907-scaled-1140x843.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://files2.aster.kz/market/users/2024-2/c1003192_123_4bb417a9-7868-4014-9c3b-c14629ed02b1_L_blur_resolution1920x1440.webp_L_blur_resolution1920x1440.webp',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://autonxt.net/wp-content/uploads/2020/08/2020_Volkswagen_Tiguan_SEL_4Motion_1.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl: 'https://iat.ru/uploads/origin/models/360897/1.webp',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/6147753/0d5a8b14e6ad01bf587d713c8b059282/1200x900',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl: 'https://autowise.ca/wp-content/uploads/2024/06/24029-1.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://arendacar.ru/wp-content/uploads/2023/10/3ee9efc59c466956fb34d5e79fbd735a.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://i.simpalsmedia.com/999.md/BoardImages/900x900/b53afa00eab3b789fb69b786a25c664b.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/1728862/7f4146e0e4aadcf0574660c5c1fb275d/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/6036486/67d8506418a16ad14682ab0cf4137e16/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/2168121/731361697bb71b082974b5a018e3f47f/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://st4.depositphotos.com/11618586/39421/i/1600/depositphotos_394212960-stock-photo-novosibirsk-russia-july-2020-black.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/1907522/8919c99d155e438ea7798ed550713ff3/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/5207325/5b3c8f1f071b5ecd0d0d1a1790b6f917/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://cdn3.riastatic.com/photos/ir/new/auto/photo/skoda_octavia__614896338-620x415x70.webp',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/6087926/4c06145a15d53f9f1abefbe236b2348e/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/5911025/8b1c656b7a66844d5487dd64981f5d75/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://files2.aster.kz/market/aster/2025-9/590534_8d2233ff-98e2-4bd3-95cb-f847a0e5172b_S_resolution810x495.webp',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://www.major-auto.ru/cars_images/1836248/2D/medium/1836248_1_30685_15461512.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://cdn3.riastatic.com/photosnew/auto/photo/toyota_corolla__605145368f.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/5504534/52b282b0b4a47be2e9dae6e8cfabe506/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/i?id=c61b722669cf66e53a72834a3b9dd77e9a81e502-4290742-images-thumbs&n=13',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/11372349/bfa973a0837ff23bfc3e23bad9d11326/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/2173862/4b8daaac14d8ba9c3137cd588125a0cf/456x342',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/11385452/7780dd1479172df0ca864b3fab15a9d0/456x342',
        features: [
          'Полный привод',
          'Кожаный салон',
          'Подогрев сидений',
          'LED фары'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://avatars.mds.yandex.net/get-autoru-vos/2164928/494a8da6a4e98da330e584f4676d0294/456x342',
        features: [
          'Полный привод',
          'Кожаный салон',
          'Подогрев сидений',
          'LED фары'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://s.auto.drom.ru/i24303/c/photos/fullsize/volvo/xc60/volvo_xc60_1257564.jpg',
        features: [
          'Панорамная крыша',
          'Кожаный салон',
          'Адаптивный круиз',
          'LED фары'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
        imageUrl:
          'https://moscowteslaclub.ru/upload/resize_cache/iblock/b23/964_542_2/43n9bksss9021qiunrvuyd9yb83s4y78.jpg',
        features: [
          'Камера 360°',
          'Адаптивный круиз-контроль',
          'Премиум аудиосистема',
          'Кожаный салон'
        ],
        createdAt: '2020-05-15T10:30:00Z'
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
fakeBringCar.initialize();
