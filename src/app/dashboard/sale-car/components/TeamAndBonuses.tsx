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
import { Briefcase } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { SaleFormData } from '@/types';

interface Props {
  formData: SaleFormData;
  setFormData: React.Dispatch<React.SetStateAction<SaleFormData>>;
}

const bonusFields: Array<{
  id: 'saleEmployeeId' | 'bringEmployeeId' | 'managerEmployeeId';
  bonusKey: 'saleEmployeeBonus' | 'bringEmployeeBonus' | 'managerEmployeeBonus';
  label: string;
}> = [
  { id: 'saleEmployeeId', bonusKey: 'saleEmployeeBonus', label: 'Продавец' },
  {
    id: 'bringEmployeeId',
    bonusKey: 'bringEmployeeBonus',
    label: 'Привлечение'
  },
  {
    id: 'managerEmployeeId',
    bonusKey: 'managerEmployeeBonus',
    label: 'Менеджер Ф&И'
  }
];

export default function TeamAndBonuses({ formData, setFormData }: Props) {
  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => (await api.get('/employees')).data
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Briefcase className='h-5 w-5 text-red-600' /> 5. Команда и бонусы
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 md:grid-cols-3'>
        {bonusFields.map(({ id, bonusKey, label }) => (
          <div key={id} className='space-y-2'>
            <Label>{label}</Label>
            <Select
              value={formData[id] || ''}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, [id]: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите' />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value='loading' disabled>
                    Загрузка...
                  </SelectItem>
                ) : (
                  employees?.map((emp: any) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            <Input
              type='number'
              placeholder='Бонус'
              value={formData[bonusKey] || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [bonusKey]: Number(e.target.value)
                }))
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
