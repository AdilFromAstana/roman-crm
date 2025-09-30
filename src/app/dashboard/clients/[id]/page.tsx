'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Edit,
  Trash2,
  Plus,
  User,
  MessageSquare,
  Clock,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import PageContainer from '@/components/layout/page-container';
import { SingleSelect } from '@/components/ui/single-select';

// Типы
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  iin: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  trafficSource: { code: string; name: string } | null;
  customerStatus: { code: string; name: string; color: string } | null;
  warmingLevel: number;
  tags: string[];
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CustomerInteraction {
  id: string;
  customerId: string;
  employeeId: string;
  employee: { firstName: string; lastName: string } | null;
  interactionType: string;
  interactionDate: string;
  nextActionDate: string | null;
  notes: string;
  isActive: boolean;
}

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [interactions, setInteractions] = useState<CustomerInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, interactionsRes] = await Promise.all([
          api.get<Customer>(`/customers/${customerId}`),
          api.get<CustomerInteraction[]>(
            `/customer-interactions/customer/${customerId}`
          )
        ]);
        setCustomer(customerRes.data);
        setInteractions(interactionsRes.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        toast.error('Не удалось загрузить данные клиента');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Вы уверены, что хотите удалить этого клиента? Это действие нельзя отменить.'
      )
    ) {
      return;
    }

    try {
      await api.delete(`/customers/${customerId}`);
      toast.success('Клиент успешно удалён');
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Ошибка удаления клиента:', error);
      toast.error('Не удалось удалить клиента');
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent'></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className='py-20 text-center'>
        <h2 className='text-2xl font-bold text-gray-900'>Клиент не найден</h2>
        <Button onClick={() => router.back()} className='mt-4'>
          Назад к списку
        </Button>
      </div>
    );
  }

  console.log(interactions);

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Форматирование даты без времени
  const formatDateOnly = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-4'>
        {/* Шапка */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              {customer.lastName} {customer.firstName}
            </h1>
            <p className='text-muted-foreground'>
              Детальная информация о клиенте
            </p>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' onClick={() => router.back()}>
              Назад
            </Button>
            <Button onClick={() => setIsEditing(true)}>
              <Edit className='mr-2 h-4 w-4' />
              Редактировать
            </Button>
            <Button variant='destructive' onClick={handleDelete}>
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </Button>
          </div>
        </div>

        {/* Основная информация */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Основная информация
            </CardTitle>
            <CardDescription>
              Личные данные и контактная информация
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>ФИО</label>
                <p className='text-lg font-semibold'>
                  {customer.lastName} {customer.firstName} {customer.middleName}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Телефон
                </label>
                <p className='text-lg'>
                  <a
                    href={`tel:${customer.phone}`}
                    className='text-blue-600 hover:underline'
                  >
                    {customer.phone}
                  </a>
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Email
                </label>
                <p className='text-lg'>
                  {customer.email ? (
                    <a
                      href={`mailto:${customer.email}`}
                      className='text-blue-600 hover:underline'
                    >
                      {customer.email}
                    </a>
                  ) : (
                    '-'
                  )}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>ИИН</label>
                <p className='text-lg'>{customer.iin || '-'}</p>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Дата рождения
                </label>
                <p className='text-lg'>
                  {customer.birthDate
                    ? formatDateOnly(customer.birthDate)
                    : '-'}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Адрес
                </label>
                <p className='text-lg'>{customer.address || '-'}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Источник трафика
                </label>
                <p className='text-lg'>{customer.trafficSource?.name || '-'}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Статус
                </label>
                <div className='mt-1'>
                  {customer.customerStatus ? (
                    <Badge
                      style={{ backgroundColor: customer.customerStatus.color }}
                      className='text-white'
                    >
                      {customer.customerStatus.name}
                    </Badge>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Дополнительная информация */}
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Уровень прогрева</CardTitle>
              <CardDescription>
                Текущий уровень заинтересованности клиента
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4'>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      customer.warmingLevel === level
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    {level}
                  </div>
                ))}
              </div>
              <div className='text-muted-foreground mt-2 flex gap-2 text-sm'>
                <span>❄️ Холодный</span>
                <span className='mx-auto'>💧 Нейтральный</span>
                <span className='text-right'>🔥 Горячий</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Теги и заметки</CardTitle>
              <CardDescription>
                Дополнительная информация о клиенте
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Теги
                </label>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {customer?.tags?.length > 0 ? (
                    customer?.tags?.map((tag) => (
                      <Badge key={tag} variant='secondary'>
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className='text-muted-foreground'>-</span>
                  )}
                </div>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Заметки
                </label>
                <p className='mt-2 text-sm text-gray-700'>
                  {customer.notes || '-'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Взаимодействия */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <MessageSquare className='h-5 w-5' />
                История взаимодействий
              </CardTitle>
              <CardDescription>
                Все записи о контактах с клиентом ({interactions?.length})
              </CardDescription>
            </div>
            <Button onClick={() => setIsInteractionModalOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Новое взаимодействие
            </Button>
          </CardHeader>
          <CardContent>
            {interactions && interactions.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center'>
                Нет записей о взаимодействиях
              </div>
            ) : (
              <div className='space-y-4'>
                {interactions?.map((interaction) => (
                  <div
                    key={interaction.id}
                    className='rounded-r-lg border-l-4 border-blue-500 bg-gray-50 p-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div>
                        <div className='font-medium'>
                          {interaction.employee?.firstName}{' '}
                          {interaction.employee?.lastName}
                        </div>
                        <div className='text-muted-foreground mt-1 text-sm'>
                          {formatDate(interaction.interactionDate)}
                        </div>
                      </div>
                      <Badge
                        variant={interaction.isActive ? 'default' : 'secondary'}
                      >
                        {interaction.interactionType}
                      </Badge>
                    </div>
                    {interaction.notes && (
                      <div className='mt-3 text-sm text-gray-700'>
                        {interaction.notes}
                      </div>
                    )}
                    {interaction.nextActionDate && (
                      <div className='mt-2 flex items-center gap-2 text-sm text-blue-600'>
                        <Clock className='h-4 w-4' />
                        Следующее действие:{' '}
                        {formatDate(interaction.nextActionDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Метаданные */}
        <Card>
          <CardHeader>
            <CardTitle>Системная информация</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                Создан
              </label>
              <p className='mt-1'>{formatDate(customer.createdAt)}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                Обновлён
              </label>
              <p className='mt-1'>{formatDate(customer.updatedAt)}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                Активен
              </label>
              <p className='mt-1'>
                <Badge variant={customer.isActive ? 'default' : 'secondary'}>
                  {customer.isActive ? 'Да' : 'Нет'}
                </Badge>
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                ID клиента
              </label>
              <p className='mt-1 font-mono text-sm'>{customer.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Модальное окно редактирования */}
        {isEditing && (
          <EditCustomerModal
            customer={customer}
            onClose={() => setIsEditing(false)}
            onSuccess={() => {
              setIsEditing(false);
              // Перезагрузить данные
              const fetchData = async () => {
                try {
                  const customerRes = await api.get<Customer>(
                    `/customers/${customerId}`
                  );
                  setCustomer(customerRes.data);
                } catch (error) {
                  console.error('Ошибка обновления данных:', error);
                }
              };
              fetchData();
            }}
          />
        )}

        {isInteractionModalOpen && (
          <CreateInteractionModal
            customerId={customerId}
            customerName={`${customer.lastName} ${customer.firstName}`}
            onClose={() => setIsInteractionModalOpen(false)}
            onSuccess={() => {
              setIsInteractionModalOpen(false);
              // Перезагрузить взаимодействия
              const fetchInteractions = async () => {
                try {
                  const interactionsRes = await api.get<CustomerInteraction[]>(
                    `/customer-interactions/customer/${customerId}`
                  );
                  setInteractions(interactionsRes.data);
                } catch (error) {
                  console.error('Ошибка обновления взаимодействий:', error);
                }
              };
              fetchInteractions();
            }}
          />
        )}
      </div>
    </PageContainer>
  );
}

// Компонент модального окна редактирования
function EditCustomerModal({
  customer,
  onClose,
  onSuccess
}: {
  customer: Customer;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    middleName: customer.middleName,
    iin: customer.iin,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    birthDate: customer.birthDate ? customer.birthDate.split('T')[0] : '',
    trafficSourceCode: customer.trafficSource?.code || '',
    customerStatusCode: customer.customerStatus?.code || '',
    warmingLevel: customer.warmingLevel,
    tags: [...customer.tags],
    notes: customer.notes,
    isActive: customer.isActive
  });

  const [loading, setLoading] = useState(false);
  const [trafficSources, setTrafficSources] = useState<
    { code: string; name: string }[]
  >([]);
  const [customerStatuses, setCustomerStatuses] = useState<
    { code: string; name: string; color: string }[]
  >([]);
  const [newTag, setNewTag] = useState('');

  // Загрузка справочников
  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [trafficRes, statusRes] = await Promise.all([
          api.get('/traffic-sources'),
          api.get('/customer-statuses')
        ]);
        setTrafficSources(trafficRes.data);
        setCustomerStatuses(statusRes.data);
      } catch (error) {
        console.error('Ошибка загрузки справочников:', error);
      }
    };
    loadDictionaries();
  }, []);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
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

    try {
      setLoading(true);
      await api.patch(`/customers/${customer.id}`, formData);
      toast.success('Клиент успешно обновлён!');
      onSuccess();
    } catch (error: any) {
      console.error('Ошибка обновления клиента:', error);
      const message =
        error.response?.data?.message || 'Не удалось обновить клиента';
      toast.error(
        typeof message === 'string' ? message : 'Ошибка при обновлении клиента'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
      <div className='max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl'>
        <div className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Редактировать клиента</h2>
            <Button variant='ghost' onClick={onClose}>
              <X className='h-5 w-5' />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Основная информация */}
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Фамилия *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value
                    }))
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label>Имя *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value
                    }))
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label>Отчество</Label>
                <Input
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      middleName: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label>Дата рождения</Label>
                <Input
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
                <Label>ИИН</Label>
                <Input
                  value={formData.iin}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iin: e.target.value }))
                  }
                  maxLength={12}
                />
              </div>
              <div className='space-y-2'>
                <Label>Адрес</Label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value
                    }))
                  }
                />
              </div>
            </div>

            {/* Контакты */}
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Телефон *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label>Email</Label>
                <Input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Маркетинг и статус */}
            <div className='grid gap-6 md:grid-cols-2'>
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
            </div>

            {/* Теги и заметки */}
            <div className='space-y-4'>
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
                  rows={3}
                />
              </div>
            </div>

            {/* Активность */}
            <div className='flex items-center space-x-2'>
              <input
                id='isActive'
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked
                  }))
                }
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <Label htmlFor='isActive' className='text-sm font-medium'>
                Активен
              </Label>
            </div>

            {/* Кнопки */}
            <div className='flex justify-end gap-3 pt-4'>
              <Button type='button' variant='outline' onClick={onClose}>
                Отмена
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Компонент модального окна создания взаимодействия
function CreateInteractionModal({
  customerId,
  customerName,
  onClose,
  onSuccess
}: {
  customerId: string;
  customerName: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    customerId: customerId,
    employeeId: '',
    type: 'CALL', // ← interactionType → type
    title: '', // ← новое поле
    description: '', // ← notes → description
    interactionDate: new Date().toISOString(), // ← полный ISO формат
    nextActionDate: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [trafficSources, setTrafficSources] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);
  const [employees, setEmployees] = useState<
    { id: string; firstName: string; lastName: string }[]
  >([]);

  // Загрузка сотрудников
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const resEmpl = await api.get('/employees');
        const resTraf = await api.get('/traffic-sources');
        setEmployees(resEmpl.data);
        setTrafficSources(resTraf.data);

        // Предзаполнить текущим пользователем (если есть в localStorage или через auth)
        // const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        // if (currentUser.id && res.data.some(emp => emp.id === currentUser.id)) {
        //   setFormData(prev => ({ ...prev, employeeId: currentUser.id }));
        // }
      } catch (error) {
        console.error('Ошибка загрузки сотрудников:', error);
      }
    };
    loadEmployees();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.employeeId || !formData.title.trim()) {
      toast.error('Заполните обязательные поля: Сотрудник и Заголовок');
      return;
    }

    const payload = {
      customerId: formData.customerId,
      employeeId: formData.employeeId,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      interactionDate: new Date(),
      nextActionDate: new Date(), // undefined если пусто
      isActive: true
    };

    try {
      setLoading(true);
      await api.post('/customer-interactions', payload);
      toast.success('Взаимодействие успешно создано!');
      onSuccess();
    } catch (error: any) {
      console.error('Ошибка создания взаимодействия:', error);
      const message =
        error.response?.data?.message || 'Не удалось создать взаимодействие';
      toast.error(
        typeof message === 'string'
          ? message
          : 'Ошибка при создании взаимодействия'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
      <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl'>
        <div className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>
              Новое взаимодействие с {customerName}
            </h2>
            <Button variant='ghost' onClick={onClose}>
              <X className='h-5 w-5' />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label>Заголовок *</Label>
              <Input
                type='text'
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value
                  }))
                }
                required
              />
            </div>
            {/* Сотрудник */}
            <div className='space-y-2'>
              <Label>Сотрудник *</Label>
              <SingleSelect
                options={
                  employees.map((e) => ({
                    value: e.id,
                    label: `${e.firstName} ${e.lastName}`
                  })) || []
                }
                value={formData.employeeId || ''}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, employeeId: value }))
                }
                placeholder={`Выберите сотрудника`}
                className='w-full'
              />
            </div>

            {/* Тип взаимодействия */}
            <div className='space-y-2'>
              <Label>Тип взаимодействия *</Label>
              <SingleSelect
                options={
                  trafficSources.map((e) => ({
                    value: e.code,
                    label: e.name
                  })) || []
                }
                value={formData.type || ''}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
                placeholder={`Выберите тип взаимодействия`}
                className='w-full'
              />
            </div>

            {/* Дата и время взаимодействия */}
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label>Дата взаимодействия *</Label>
                <Input
                  type='datetime-local'
                  value={
                    formData.interactionDate
                      ? formData.interactionDate.slice(0, 16)
                      : ''
                  }
                  onChange={(e) => {
                    const iso = new Date(e.target.value).toISOString();
                    setFormData((prev) => ({ ...prev, interactionDate: iso }));
                  }}
                  required
                />
              </div>
            </div>

            {/* Следующее действие */}
            <div className='space-y-2'>
              <Label>Следующее действие (опционально)</Label>
              <div className='grid gap-4 md:grid-cols-2'>
                <Input
                  type='datetime-local'
                  value={
                    formData.nextActionDate
                      ? formData.nextActionDate.slice(0, 16)
                      : ''
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      nextActionDate: value ? new Date(value).toISOString() : ''
                    }));
                  }}
                />
              </div>
            </div>

            {/* Заметки */}
            <div className='space-y-2'>
              <Label>Заметки</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                placeholder='Детали взаимодействия...'
                rows={4}
              />
            </div>

            {/* Кнопки */}
            <div className='flex justify-end gap-3 pt-4'>
              <Button type='button' variant='outline' onClick={onClose}>
                Отмена
              </Button>
              <Button type='submit' disabled={loading || !formData.employeeId}>
                {loading ? 'Создание...' : 'Создать взаимодействие'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
