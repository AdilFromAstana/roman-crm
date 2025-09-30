'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

import { useEffect, useState } from 'react';
import { BringCar, SaleFormData } from '@/types';
import api from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import CarSelector from '../components/CarSelector';
import FinanceDetails from '../components/FinanceDetails';
import CustomerForm from '../components/CustomerForm';
import PaymentDetails from '../components/PaymentDetails';
import TeamAndBonuses from '../components/TeamAndBonuses';
import NotesSection from '../components/NotesSection';
import SaleStatusProgress from '../components/SaleStatusProgress';
import Link from 'next/link';

export default function EditSaleCarPage() {
  const params = useParams(); // достанет { id }
  const router = useRouter();

  const [formData, setFormData] = useState<SaleFormData>({});
  const [selectedCar, setSelectedCar] = useState<BringCar | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // загрузка данных при монтировании
  useEffect(() => {
    const fetchSale = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/sales/${params.id}`);
        setFormData(data);
        setSelectedCar(data.bringCar || null); // если с бэка вернется объект машины
      } catch (err) {
        setError('❌ Не удалось загрузить данные продажи');
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.bringCarId ||
      !formData.saleEmployeeId ||
      !formData.salePrice
    ) {
      setError('Заполните обязательные поля');
      return;
    }

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
      saleType: formData.saleType,
      downPayment: formData.downPayment,
      notes: formData.notes,
      isActive: formData.isActive ?? true
    };

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // await api.put(`/sales/${params.id}`, payload);

      // setSuccess('✅ Изменения успешно сохранены!');
      // можно сразу редиректнуть назад
      // router.push('/dashboard/sale-car');
    } catch (err) {
      setError('❌ Ошибка при сохранении изменений');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <p className='text-blue-600'>⏳ Загрузка данных...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className='mx-auto w-full max-w-4xl space-y-6 pb-20'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/dashboard/sale-car'>
              <ChevronLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Редактировать продажу</h1>
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
          <SaleStatusProgress
            sale={{
              id: formData.id!,
              salesStatusCode: formData.salesStatusCode!,
              salesStatus: formData.salesStatus,
              bringEmployeeBonus: formData.bringEmployeeBonus,
              managerEmployeeBonus: formData.managerEmployeeBonus,
              saleEmployeeBonus: formData.saleEmployeeBonus,
              totalBonuses:
                formData.saleEmployeeBonus! +
                  formData.managerEmployeeBonus! +
                  formData.bringEmployeeBonus! || 0
            }}
          />

          {success && <p className='text-green-600'>{success}</p>}
          {error && <p className='text-red-600'>{error}</p>}
        </form>
      </div>
    </PageContainer>
  );
}
