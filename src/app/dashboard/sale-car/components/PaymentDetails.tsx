'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { SaleFormData } from '@/types';

interface Props {
  formData: SaleFormData;
  setFormData: React.Dispatch<React.SetStateAction<SaleFormData>>;
}

export default function PaymentDetails({ formData, setFormData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5 text-indigo-600' /> 4. Детали оплаты
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='space-y-2'>
          <Label>Тип продажи</Label>
          <Select
            value={formData.saleType || ''}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, saleType: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='cash'>Наличные</SelectItem>
              <SelectItem value='credit'>Кредит</SelectItem>
              <SelectItem value='mixed'>Смешанный</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label>Дата продажи</Label>
          <Input
            type='datetime-local'
            value={formData.saleDate || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, saleDate: e.target.value }))
            }
          />
        </div>
        {formData.saleType === 'credit' && (
          <div className='space-y-2'>
            <Label>Банк</Label>
            <Select
              value={formData.bankId || ''}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, bankId: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите банк' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='kaspi'>Kaspi</SelectItem>
                <SelectItem value='halyk'>Halyk</SelectItem>
                <SelectItem value='forte'>Forte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
