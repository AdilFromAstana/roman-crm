'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clients } from '@/types';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ClientViewModalProps {
  client: Clients | null;
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export function ClientViewModal({
  client,
  trigger,
  open,
  setOpen
}: ClientViewModalProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant='ghost' size='sm'>
            <Eye className='h-4 w-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Детали клиента</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Имя
                  </h3>
                  <p className='text-lg'>{client.firstName}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Фамилия
                  </h3>
                  <p className='text-lg'>{client.lastName}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Телефон
                  </h3>
                  <p className='text-lg'>{client.phone}</p>
                </div>
                <div>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    ID
                  </h3>
                  <p className='text-lg'>{client.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Пожелания</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{client.wish}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Дополнительная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  Дата создания
                </h3>
                <p className='text-lg'>
                  {format(new Date(client.createdAt), 'dd MMMM yyyy HH:mm', {
                    locale: ru
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='flex justify-end'>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
