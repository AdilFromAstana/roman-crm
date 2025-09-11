// components/clients/client-modal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Clients } from '@/types';

interface ClientModalProps {
  mode: 'create' | 'edit';
  client?: Clients;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export function ClientModal({
  mode,
  client,
  trigger,
  onSuccess
}: ClientModalProps) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(client?.firstName || '');
  const [lastName, setLastName] = useState(client?.lastName || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [wish, setWish] = useState(client?.wish || '');
  const [loading, setLoading] = useState(false);

  // Сброс формы при открытии модального окна
  useEffect(() => {
    if (open && mode === 'create') {
      setFirstName('');
      setLastName('');
      setPhone('');
      setWish('');
    } else if (open && client) {
      setFirstName(client.firstName);
      setLastName(client.lastName);
      setPhone(client.phone);
      setWish(client.wish);
    }
  }, [open, mode, client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        // Здесь будет логика создания клиента
        // Пока используем мок-данные
        console.log('Создание клиента:', { firstName, lastName, phone, wish });
      } else if (mode === 'edit' && client) {
        // Здесь будет логика редактирования клиента
        console.log('Редактирование клиента:', {
          id: client.id,
          firstName,
          lastName,
          phone,
          wish
        });
      }

      // Закрываем модальное окно и вызываем onSuccess
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Ошибка при сохранении клиента:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Добавить клиента' : 'Редактировать клиента'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>Имя *</Label>
            <Input
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Фамилия *</Label>
            <Input
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Телефон *</Label>
            <Input
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='wish'>Пожелания *</Label>
            <Textarea
              id='wish'
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div className='flex justify-end gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type='submit' disabled={loading}>
              {loading
                ? 'Сохранение...'
                : mode === 'create'
                  ? 'Добавить'
                  : 'Сохранить'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
