'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

import CarSelector from '../components/CarSelector';
import CustomerForm from '../components/CustomerForm';
import FinanceDetails from '../components/FinanceDetails';
import PaymentDetails from '../components/PaymentDetails';
import TeamAndBonuses from '../components/TeamAndBonuses';
import NotesSection from '../components/NotesSection';

import { useState } from 'react';
import { BringCar, SaleFormData } from '@/types';
import api from '@/lib/axios';
import Link from 'next/link';

export default function NewSaleCarPage() {
  const [formData, setFormData] = useState<SaleFormData>({});
  const [selectedCar, setSelectedCar] = useState<BringCar | null>(null);

  // Для загрузки и уведомлений
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // простая валидация
    if (
      !formData.bringCarId ||
      !formData.saleEmployeeId ||
      !formData.salePrice
    ) {
      setError('Заполните обязательные поля');
      return;
    }

    // финальный объект для отправки
    const payload = {
      bringCarId: formData.bringCarId,
      customerId: formData.customerId,
      saleEmployeeId: formData.saleEmployeeId,
      bringEmployeeId: formData.bringEmployeeId,
      managerEmployeeId: formData.managerEmployeeId,
      salePrice: formData.salePrice,
      purchasePrice: formData.purchasePrice,
      saleEmployeeBonus: formData.saleEmployeeBonus,
      bringEmployeeBonus: formData.bringEmployeeBonus,
      managerEmployeeBonus: formData.managerEmployeeBonus,
      totalBonuses: formData.totalBonuses,
      saleDate: formData.saleDate,
      bankId: formData.bankId,
      // saleType: formData.saleType,
      downPayment: formData.downPayment,
      notes: formData.notes,
      isActive: formData.isActive ?? true
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      console.log('📤 Отправка на бэк:', payload);
      await api.post('/sales', payload);

      setSuccess('✅ Продажа успешно добавлена!');
    } catch (err: any) {
      console.error('Ошибка при отправке:', err);
      setError('❌ Ошибка при добавлении продажи. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className='mx-auto w-full max-w-4xl space-y-6 pb-20'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/dashboard/sale-car'>
              <ChevronLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Добавить новую продажу</h1>
        </div>

        <form className='w-full space-y-6' onSubmit={handleSubmit}>
          <CarSelector
            selectedCar={selectedCar}
            onSelect={(car) => {
              setSelectedCar(car);
              setFormData((prev) => ({
                ...prev,
                bringCarId: car.id,
                purchasePrice: Number(car.price) || 0,
                salePrice: car.salePrice
                  ? Number(car.salePrice)
                  : Number(car.price) || 0
              }));
            }}
          />

          <CustomerForm formData={formData} setFormData={setFormData} />
          <FinanceDetails
            formData={formData}
            setFormData={setFormData}
            selectedCar={selectedCar}
          />
          <PaymentDetails formData={formData} setFormData={setFormData} />
          <TeamAndBonuses formData={formData} setFormData={setFormData} />
          <NotesSection formData={formData} setFormData={setFormData} />

          {/* Уведомления */}
          {loading && <p className='text-blue-600'>⏳ Отправка данных...</p>}
          {success && <p className='text-green-600'>{success}</p>}
          {error && <p className='text-red-600'>{error}</p>}

          <div className='flex justify-end gap-3 border-t pt-6'>
            <Button variant='outline' asChild>
              <Link href='/dashboard/sale-car'>Отмена</Link>
            </Button>
            <Button
              type='submit'
              className='bg-green-600 hover:bg-green-700'
              disabled={loading}
            >
              {loading ? 'Добавление...' : 'Добавить продажу'}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
