'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Search } from 'lucide-react';
import AdvancedDataTable, { Column } from '@/components/customTable';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useState } from 'react';
import { SaleFormData, Customer } from '@/types';

interface Props {
  formData: SaleFormData;
  setFormData: React.Dispatch<React.SetStateAction<SaleFormData>>;
}

export default function CustomerSelector({ formData, setFormData }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Загружаем клиентов
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => (await api.get('/customers')).data
  });

  const clientName = `${formData?.customer?.firstName} ${formData?.customer?.lastName}`;

  // Колонки таблицы клиентов
  const customerColumns: Column<Customer>[] = [
    { key: 'firstName', label: 'Имя' },
    { key: 'lastName', label: 'Фамилия' },
    { key: 'phone', label: 'Телефон' },
    {
      key: 'actions',
      label: 'Действие',
      render: (_, row) => (
        <Button
          size='sm'
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              customerId: row.id,
              clientPhone: row.phone,
              customer: row
            }));
            setIsOpen(false);
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
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5 text-yellow-600' /> 2. Клиент
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Кнопка поиска клиента */}
        <Label>Клиент *</Label>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-full justify-between'>
              {formData?.customer ? (
                <span>{clientName}</span>
              ) : (
                <span className='text-muted-foreground'>
                  Найти или создать клиента
                </span>
              )}
              <Search className='ml-2 h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl'>
            <DialogHeader>
              <DialogTitle>Выберите клиента</DialogTitle>
            </DialogHeader>
            <AdvancedDataTable<Customer>
              data={data || []}
              columns={customerColumns}
              totalCount={data?.total || 0}
              currentPage={1}
              rowsPerPage={10}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
              searchFields={['firstName', 'lastName', 'phone']}
              loading={isLoading}
            />
          </DialogContent>
        </Dialog>

        {formData.customerId && (
          <div className='space-y-2 rounded-md border bg-gray-50 p-4 text-sm'>
            <p>
              <span className='font-medium'>ФИО:</span> {formData.clientName}
            </p>
            <p>
              <span className='font-medium'>Телефон:</span>{' '}
              {formData.clientPhone}
            </p>

            {/* Дополнительная информация */}
            {formData.customer?.iin && (
              <p>
                <span className='font-medium'>ИИН:</span>{' '}
                {formData.customer.iin}
              </p>
            )}
            {formData.customer?.birthDate && (
              <p>
                <span className='font-medium'>Дата рождения:</span>{' '}
                {new Date(formData.customer.birthDate).toLocaleDateString(
                  'ru-RU'
                )}
              </p>
            )}

            {/* Источник трафика */}
            {formData.customer?.trafficSource && (
              <p>
                <span className='font-medium'>Источник трафика:</span>{' '}
                <span className='inline-flex items-center gap-1'>
                  {formData.customer.trafficSource.name}
                </span>
              </p>
            )}

            {/* Статус клиента */}
            {formData.customer?.customerStatus && (
              <p>
                <span className='font-medium'>Статус:</span>{' '}
                <span
                  className='rounded px-2 py-0.5 text-white'
                  style={{
                    backgroundColor: formData.customer.customerStatus.color
                  }}
                >
                  {formData.customer.customerStatus.name}
                </span>
              </p>
            )}

            {/* Тэги */}
            {formData?.customer?.tags!.length! > 0 && (
              <p>
                <span className='font-medium'>Тэги:</span>{' '}
                {formData.customer!.tags!.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className='mr-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700'
                  >
                    {tag}
                  </span>
                ))}
              </p>
            )}

            {/* Заметки */}
            {formData.customer?.notes && (
              <p className='text-gray-600 italic'>
                <span className='font-medium not-italic'>Заметки:</span>{' '}
                {formData.customer.notes}
              </p>
            )}
          </div>
        )}

        {/* Альтернатива: создать вручную */}
        {!formData.customerId && (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label>ФИО *</Label>
              <Input
                value={formData.clientName || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clientName: e.target.value
                  }))
                }
                placeholder='Иванов Иван'
              />
            </div>
            <div className='space-y-2'>
              <Label>Телефон *</Label>
              <Input
                value={formData.customer?.phone || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clientPhone: e.target.value
                  }))
                }
                placeholder='+7 (777) 777-77-77'
              />
            </div>
            <Button
              type='button'
              className='col-span-2'
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  customerId:
                    'cust-' + Math.random().toString(36).substring(2, 10)
                }))
              }
              disabled={!formData.clientName || !formData.clientPhone}
            >
              Создать клиента вручную
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
