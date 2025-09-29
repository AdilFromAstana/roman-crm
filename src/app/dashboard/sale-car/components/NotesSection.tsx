'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SaleFormData } from '@/types';

interface Props {
  formData: SaleFormData;
  setFormData: React.Dispatch<React.SetStateAction<SaleFormData>>;
}

export default function NotesSection({ formData, setFormData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>6. Дополнительно</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder='Комментарий...'
        />
      </CardContent>
    </Card>
  );
}
