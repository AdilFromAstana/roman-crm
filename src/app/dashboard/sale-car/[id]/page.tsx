// app/dashboard/sale-car/[id]/page.tsx
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
    title: `Продажа #${id} - Dashboard`
  };
}

export default async function SaleCarDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  // Получаем данные о продаже
  const config = TABLE_CONFIG.soldCar;
  const result = await config.dataSource.getProductById(id);

  if (!result.success) {
    notFound();
  }

  const car = result.product;

  return (
    <PageContainer>
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/sale-car'>
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
              <Link href={`/dashboard/sale-car/${id}/edit`}>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Информация о продаже</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Тип продажи
                </h3>
                <Badge
                  variant={car.saleType === 'cash' ? 'default' : 'destructive'}
                >
                  {car.saleType === 'cash' ? 'Наличные' : 'Кредит'}
                </Badge>
              </div>
              {car.bankCredit && (
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Банк
                  </h3>
                  <p className='text-lg'>{car.bankCredit}</p>
                </div>
              )}
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Дата продажи
                </h3>
                <p className='text-lg'>
                  {format(new Date(car.soldAt), 'dd MMMM yyyy HH:mm', {
                    locale: ru
                  })}
                </p>
              </div>
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Дата добавления
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
      </div>
    </PageContainer>
  );
}
