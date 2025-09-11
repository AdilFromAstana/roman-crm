// app/dashboard/bring-car/[id]/page.tsx
import { notFound } from 'next/navigation';
import { TABLE_CONFIG } from '@/constants/table-config';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Авто #${id} - Dashboard`
  };
}

export default async function BringCarDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  // Получаем данные об автомобиле
  const config = TABLE_CONFIG.bringCar;
  const result = await config.dataSource.getProductById(id);

  if (!result.success) {
    notFound();
  }

  const car = result.product;

  // Функции форматирования
  const formatFuelType = (fuelType: string): string => {
    const fuelTypes: Record<string, string> = {
      petrol: 'Бензин',
      diesel: 'Дизель',
      electric: 'Электро',
      hybrid: 'Гибрид'
    };
    return fuelTypes[fuelType] || fuelType;
  };

  const formatTransmission = (transmission: string): string => {
    const transmissions: Record<string, string> = {
      manual: 'Механика',
      automatic: 'Автомат'
    };
    return transmissions[transmission] || transmission;
  };

  return (
    <PageContainer>
      <div className='w-full space-y-6'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/bring-car'>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold'>
              {car.brand} {car.model}
            </h1>
            <p className='text-muted-foreground'>ID: {car.id}</p>
          </div>
          <div className='ml-auto flex gap-2'>
            <Button asChild>
              <Link href={`/dashboard/bring-car/${id}/edit`}>
                <Edit className='mr-2 h-4 w-4' />
                Редактировать
              </Link>
            </Button>
            <Button variant='destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </Button>
          </div>
        </div>

        <Separator />

        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Информация об автомобиле</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Марка
                  </h3>
                  <p className='text-lg'>{car.brand}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Модель
                  </h3>
                  <p className='text-lg'>{car.model}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Год
                  </h3>
                  <p className='text-lg'>{car.year}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Цена
                  </h3>
                  <p className='text-lg'>
                    {car.price.toLocaleString('ru-RU')} ₸
                  </p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Пробег
                  </h3>
                  <p className='text-lg'>
                    {car.mileage.toLocaleString('ru-RU')} км
                  </p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Цвет
                  </h3>
                  <Badge variant='secondary'>{car.color}</Badge>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Топливо
                  </h3>
                  <Badge variant='secondary'>
                    {formatFuelType(car.fuelType)}
                  </Badge>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Коробка
                  </h3>
                  <Badge variant='outline'>
                    {formatTransmission(car.transmission)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Информация о загоне</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Сотрудник
                </h3>
                <p className='text-lg'>
                  {
                    // Здесь должна быть функция получения имени сотрудника по ID
                    car.employeeId || 'Не указан'
                  }
                </p>
              </div>
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Дата загона
                </h3>
                <p className='text-lg'>
                  {format(new Date(car.createdAt), 'dd MMMM yyyy HH:mm', {
                    locale: ru
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Особенности */}
        {car.features && car.features.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Особенности автомобиля</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {car.features.map((feature: string, index: number) => (
                  <Badge key={index} variant='outline'>
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {car.description && (
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{car.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Фото */}
        {car.imageUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Фотографии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='bg-muted relative h-64 w-full overflow-hidden rounded-lg'>
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className='h-full w-full object-contain'
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
