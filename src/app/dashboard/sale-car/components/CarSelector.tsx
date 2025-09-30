'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, Car, Calendar, Fuel, Settings } from 'lucide-react';
import { BringCar, formatPrice } from '@/types';
import AdvancedDataTable, { Column } from '@/components/customTable';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState } from 'react';

interface Props {
  selectedCar: BringCar | null;
  onSelect: (car: BringCar) => void;
}

export default function CarSelector({ selectedCar, onSelect }: Props) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['bring-cars', 'BRINGED'], // ← добавили статус в ключ
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('bringCarStatusCode', 'BRINGED'); // ← фильтр по статусу
      params.set('limit', '100'); // ← можно увеличить лимит, если машин не много
      const res = await api.get(`/bring-cars?${params.toString()}`);
      return res.data;
    }
  });

  const carColumns: Column<BringCar>[] = [
    {
      key: 'images',
      label: 'Фото',
      render: (_, row) => (
        <img
          src={row.images?.[0]?.url || 'https://placehold.co/120x80?text=Car'}
          alt='car'
          className='h-14 w-20 rounded-md border object-cover'
        />
      ),
      width: '120px'
    },
    {
      key: 'brandCode',
      label: 'Марка',
      render: (_, row) => row.brand?.name || row.brandCode
    },
    {
      key: 'modelCode',
      label: 'Модель',
      render: (_, row) => row.model?.name || row.modelCode
    },
    { key: 'year', label: 'Год' },
    {
      key: 'mileage',
      label: 'Пробег',
      render: (val) => `${Number(val).toLocaleString('ru-RU')} км`
    },
    {
      key: 'price',
      label: 'Цена покупки',
      render: (val) => formatPrice(val)
    },
    {
      key: 'salePrice',
      label: 'Цена продажи',
      render: (val) => formatPrice(val)
    },
    {
      key: 'actions',
      label: 'Действие',
      render: (_, row) => (
        <Button
          size='sm'
          onClick={() => {
            onSelect(row);
            setIsSearchModalOpen(false);
          }}
        >
          Выбрать
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Выбор автомобиля</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Автомобиль *</Label>
        <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-full justify-between'>
              {selectedCar ? (
                <span>
                  {selectedCar.brand?.name} {selectedCar.model?.name}{' '}
                  {selectedCar.year}
                </span>
              ) : (
                <span className='text-muted-foreground'>
                  Выберите автомобиль
                </span>
              )}
              <Search className='ml-2 h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-6xl'>
            <DialogHeader>
              <DialogTitle>Поиск автомобиля</DialogTitle>
            </DialogHeader>
            <AdvancedDataTable<BringCar>
              data={data?.data || []}
              columns={carColumns}
              totalCount={data?.total || 0}
              currentPage={1}
              rowsPerPage={10}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
              loading={isLoading}
              searchFields={['brand.name', 'model.name']}
            />
          </DialogContent>
        </Dialog>

        {selectedCar && (
          <Card className='bg-muted/30 mt-4'>
            <CardContent className='flex items-start gap-4 p-4'>
              <div className='h-20 w-28 overflow-hidden rounded-md border'>
                {selectedCar.images?.[0]?.url ? (
                  <img
                    src={selectedCar.images[0].url}
                    alt={`${selectedCar.brand?.name} ${selectedCar.model?.name}`}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <Car className='text-muted-foreground mx-auto mt-5 h-10 w-10' />
                )}
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold'>
                  {selectedCar.brand?.name} {selectedCar.model?.name},{' '}
                  {selectedCar.year}
                </h3>
                <div className='text-muted-foreground mt-1 grid grid-cols-2 gap-2 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {selectedCar.year} г.
                  </div>
                  <div className='flex items-center gap-1'>
                    <Car className='h-4 w-4' />
                    {selectedCar.mileage?.toLocaleString('ru-RU')} км
                  </div>
                  <div className='flex items-center gap-1'>
                    <Fuel className='h-4 w-4' />
                    {selectedCar.fuelType?.name || selectedCar.fuelTypeCode}
                  </div>
                  <div className='flex items-center gap-1'>
                    <Settings className='h-4 w-4' />
                    {selectedCar.transmission?.name ||
                      selectedCar.transmissionCode}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='font-bold text-red-600'>
                  {formatPrice(selectedCar.price)}
                </div>
                <div className='text-muted-foreground text-xs'>
                  Цена покупки
                </div>
                <div className='font-bold text-green-600'>
                  {formatPrice(selectedCar.salePrice)}
                </div>
                <div className='text-muted-foreground text-xs'>
                  Цена продажи
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
