'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { formatPrice, SaleFormData } from '@/types';
import { BringCar } from '@/types';

interface Props {
  selectedCar: BringCar | null;
  formData: SaleFormData;
  setFormData: React.Dispatch<React.SetStateAction<SaleFormData>>;
}

export default function FinanceDetails({
  selectedCar,
  formData,
  setFormData
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <DollarSign className='h-5 w-5 text-green-600' /> 3. Финансовые детали
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label>Финальная цена *</Label>
            <Input
              type='number'
              value={formData.salePrice || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  salePrice: Number(e.target.value)
                }))
              }
              placeholder={
                selectedCar ? formatPrice(selectedCar.salePrice) : '0'
              }
            />
          </div>
          <div className='space-y-2'>
            <Label>Скидка (%)</Label>
            <Input type='number' placeholder='0' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
