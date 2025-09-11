// app/dashboard/sale-car/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import { TABLE_CONFIG } from '@/constants/table-config';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Редактирование продажи #${id} - Dashboard`
  };
}

export default async function SaleCarEditPage({ params }: EditPageProps) {
  const { id } = await params;

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
          <Link href={`/dashboard/sale-car/${id}`}>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold'>Редактирование продажи</h1>
        </div>

        <Separator />

        <form className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='brand'>Марка</Label>
                  <Input id='brand' defaultValue={car.brand} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='model'>Модель</Label>
                  <Input id='model' defaultValue={car.model} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='year'>Год</Label>
                  <Input id='year' type='number' defaultValue={car.year} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='price'>Цена (₸)</Label>
                  <Input id='price' type='number' defaultValue={car.price} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mileage'>Пробег (км)</Label>
                  <Input
                    id='mileage'
                    type='number'
                    defaultValue={car.mileage}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='color'>Цвет</Label>
                  <Input id='color' defaultValue={car.color} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Информация о продаже</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='saleType'>Тип продажи</Label>
                  <Select defaultValue={car.saleType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Наличные</SelectItem>
                      <SelectItem value='credit'>Кредит</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {car.saleType === 'credit' && (
                  <div className='space-y-2'>
                    <Label htmlFor='bankCredit'>Банк</Label>
                    <Input id='bankCredit' defaultValue={car.bankCredit} />
                  </div>
                )}
                <div className='space-y-2'>
                  <Label htmlFor='soldAt'>Дата продажи</Label>
                  <Input
                    id='soldAt'
                    type='datetime-local'
                    defaultValue={new Date(car.soldAt)
                      .toISOString()
                      .slice(0, 16)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='Дополнительная информация о продаже'
                defaultValue={car.description}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' asChild>
              <Link href={`/dashboard/sale-car/${id}`}>Отмена</Link>
            </Button>
            <Button type='submit'>Сохранить изменения</Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
