'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import PageContainer from '@/components/layout/page-container';

// Типы
interface TrafficSource {
  code: string;
  name: string;
}

interface CustomerStatus {
  code: string;
  name: string;
  color: string;
}

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Справочники
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [customerStatuses, setCustomerStatuses] = useState<CustomerStatus[]>(
    []
  );

  // Форма
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    iin: '',
    phone: '',
    email: '',
    address: '',
    birthDate: '',
    trafficSourceCode: '',
    warmingLevel: 3,
    customerStatusCode: 'ACTIVE',
    tags: [] as string[],
    notes: '',
    isActive: true
  });

  const [newTag, setNewTag] = useState('');

  // Загрузка справочников
  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [trafficRes, statusRes] = await Promise.all([
          api.get<TrafficSource[]>('/traffic-sources'),
          api.get<CustomerStatus[]>('/customer-statuses')
        ]);
        setTrafficSources(trafficRes.data);
        setCustomerStatuses(statusRes.data);
      } catch (error) {
        toast.error('Ошибка загрузки справочников');
        console.error(error);
      }
    };
    loadDictionaries();
  }, []);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast.error('Заполните обязательные поля: Имя, Фамилия, Телефон');
      return;
    }

    // Валидация ИИН
    if (formData.iin && !/^\d{12}$/.test(formData.iin)) {
      toast.error('ИИН должен содержать 12 цифр');
      return;
    }

    // Валидация телефона
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      toast.error('Неверный формат телефона');
      return;
    }

    // Валидация email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Неверный формат email');
      return;
    }

    try {
      setLoading(true);
      await api.post('/customers', formData);
      toast.success('Клиент успешно создан!');
      router.push('/dashboard/clients');
    } catch (error: any) {
      console.error('Ошибка создания клиента:', error);
      const message =
        error.response?.data?.message || 'Не удалось создать клиента';
      toast.error(
        typeof message === 'string' ? message : 'Ошибка при создании клиента'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className='w-full my-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Новый клиент</h1>
            <p className='text-muted-foreground'>
              Заполните информацию о новом клиенте
            </p>
          </div>
          <Button variant='outline' onClick={() => router.back()}>
            Отмена
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>
                Имя, фамилия и контактные данные
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Фамилия *</Label>
                <Input
                  id='lastName'
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value
                    }))
                  }
                  placeholder='Петров'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>Имя *</Label>
                <Input
                  id='firstName'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value
                    }))
                  }
                  placeholder='Алексей'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='middleName'>Отчество</Label>
                <Input
                  id='middleName'
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      middleName: e.target.value
                    }))
                  }
                  placeholder='Сергеевич'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='birthDate'>Дата рождения</Label>
                <Input
                  id='birthDate'
                  type='date'
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      birthDate: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='iin'>ИИН</Label>
                <Input
                  id='iin'
                  value={formData.iin}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iin: e.target.value }))
                  }
                  placeholder='123456789012'
                  maxLength={12}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Адрес</Label>
                <Input
                  id='address'
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value
                    }))
                  }
                  placeholder='г. Алматы, ул. Абая, д. 10'
                />
              </div>
            </CardContent>
          </Card>

          {/* Контакты */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Телефон и email для связи</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Телефон *</Label>
                <Input
                  id='phone'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder='+77011234567'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder='alexey.petrov@email.com'
                />
              </div>
            </CardContent>
          </Card>

          {/* Маркетинг и статус */}
          <Card>
            <CardHeader>
              <CardTitle>Маркетинг и статус</CardTitle>
              <CardDescription>
                Источник трафика и текущий статус клиента
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Источник трафика</Label>
                <Select
                  value={formData.trafficSourceCode}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      trafficSourceCode: value
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите источник' />
                  </SelectTrigger>
                  <SelectContent>
                    {trafficSources.map((source) => (
                      <SelectItem key={source.code} value={source.code}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Статус клиента</Label>
                <Select
                  value={formData.customerStatusCode}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerStatusCode: value
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите статус' />
                  </SelectTrigger>
                  <SelectContent>
                    {customerStatuses.map((status) => (
                      <SelectItem key={status.code} value={status.code}>
                        <div className='flex items-center gap-2'>
                          <span
                            className='inline-block h-3 w-3 rounded-full'
                            style={{ backgroundColor: status.color }}
                          />
                          {status.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Уровень прогрева</Label>
                <div className='flex items-center gap-4'>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          warmingLevel: level
                        }))
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        formData.warmingLevel === level
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className='text-muted-foreground flex gap-2 text-sm'>
                  <span>❄️ Холодный</span>
                  <span className='mx-auto'>💧 Нейтральный</span>
                  <span className='text-right'>🔥 Горячий</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Теги и заметки */}
          <Card>
            <CardHeader>
              <CardTitle>Теги и заметки</CardTitle>
              <CardDescription>
                Добавьте теги для быстрой фильтрации и заметки
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Теги</Label>
                <div className='flex gap-2'>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder='Введите тег и нажмите Enter'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className='flex-1'
                  />
                  <Button type='button' onClick={handleAddTag} size='icon'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 pt-2'>
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='px-3 py-1'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() => handleRemoveTag(tag)}
                          className='ml-2 rounded-full hover:bg-gray-200'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className='space-y-2'>
                <Label>Заметки</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder='Постоянный клиент, предпочитает SUV'
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Активность */}
          <div className='flex items-center space-x-2'>
            <input
              id='isActive'
              type='checkbox'
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <Label htmlFor='isActive' className='text-sm font-medium'>
              Активен
            </Label>
          </div>

          {/* Кнопки */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
            >
              Отмена
            </Button>
            <Button type='submit' disabled={loading} className='gap-2'>
              {loading ? (
                <>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Создание...
                </>
              ) : (
                <>
                  <UserPlus className='h-4 w-4' />
                  Создать клиента
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
