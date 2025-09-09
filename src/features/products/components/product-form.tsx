'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Clients } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Схема валидации
const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  brand: z.string().min(1, { message: 'Brand is required.' }),
  model: z.string().min(1, { message: 'Model is required.' }),
  year: z
    .number()
    .min(1900, { message: 'Year must be after 1900.' })
    .max(new Date().getFullYear() + 1, {
      message: 'Year is too far in the future.'
    }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  mileage: z.number().min(0, { message: 'Mileage cannot be negative.' }),
  color: z.string().min(1, { message: 'Color is required.' }),
  fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid'], {
    required_error: 'Please select a fuel type.'
  }),
  transmission: z.enum(['manual', 'automatic'], {
    required_error: 'Please select transmission type.'
  }),
  employeeId: z
    .string()
    .min(1, { message: 'Please select an employee who brought the car.' }),
  features: z.array(z.string()).optional(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

type CarFormValues = z.infer<typeof formSchema>;

// Моковые данные — марки и модели
const carBrands = [
  { id: 'toyota', name: 'Toyota' },
  { id: 'kia', name: 'Kia' },
  { id: 'hyundai', name: 'Hyundai' },
  { id: 'nissan', name: 'Nissan' },
  { id: 'bmw', name: 'BMW' }
];

const carModels: Record<string, { id: string; name: string }[]> = {
  toyota: [
    { id: 'camry', name: 'Camry' },
    { id: 'corolla', name: 'Corolla' },
    { id: 'rav4', name: 'RAV4' },
    { id: 'land_cruiser_prado', name: 'Land Cruiser Prado' },
    { id: 'highlander', name: 'Highlander' }
  ],
  kia: [
    { id: 'rio', name: 'Rio' },
    { id: 'sportage', name: 'Sportage' },
    { id: 'sorento', name: 'Sorento' },
    { id: 'ceed', name: 'Ceed' },
    { id: 'k5', name: 'K5' }
  ],
  hyundai: [
    { id: 'solaris', name: 'Solaris' },
    { id: 'tucson', name: 'Tucson' },
    { id: 'creta', name: 'Creta' },
    { id: 'elantra', name: 'Elantra' },
    { id: 'santa_fe', name: 'Santa Fe' }
  ],
  nissan: [
    { id: 'x-trail', name: 'X-Trail' },
    { id: 'qashqai', name: 'Qashqai' },
    { id: 'murano', name: 'Murano' },
    { id: 'patrol', name: 'Patrol' },
    { id: 'note', name: 'Note' }
  ],
  bmw: [
    { id: 'x5', name: 'X5' },
    { id: 'x3', name: 'X3' },
    { id: '3-series', name: '3 Series' },
    { id: '5-series', name: '5 Series' },
    { id: 'i4', name: 'i4' }
  ]
};

// Моковые фичи/подарки
const availableFeatures = [
  { id: 'winter_tires', label: 'В подарок зимняя резина' },
  { id: 'ceramic_coating', label: 'Керамическое покрытие кузова' },
  { id: 'armor_film', label: 'Бронеплёнка на фары и кузов' },
  { id: 'floor_mats', label: 'Коврики в салон' },
  { id: 'car_cover', label: 'Чехол для машины' },
  { id: 'extended_warranty', label: 'Расширенная гарантия 3 года' },
  { id: 'free_service', label: 'Бесплатное ТО 1 раз' },
  { id: 'navigation', label: 'Навигация + камера 360°' },
  { id: 'premium_sound', label: 'Премиум аудиосистема' },
  { id: 'leather_seats', label: 'Кожаные сиденья' }
];

// Мок-данные сотрудников
const employees = [
  { id: 'emp-1', name: 'Иван Петров' },
  { id: 'emp-2', name: 'Мария Сидорова' },
  { id: 'emp-3', name: 'Алексей Козлов' },
  { id: 'emp-4', name: 'Елена Смирнова' }
];

export default function CarForm({
  initialData,
  pageTitle
}: {
  initialData: Clients | null;
  pageTitle: string;
}) {
  const [selectedBrand, setSelectedBrand] = useState<string>(
    initialData?.brand || ''
  );

  const defaultValues: CarFormValues = {
    image: null,
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    color: initialData?.color || '',
    fuelType: initialData?.fuelType || 'petrol',
    transmission: initialData?.transmission || 'automatic',
    employeeId: initialData?.employeeId || '',
    features: initialData?.features || [],
    description: initialData?.description || ''
  };

  const form = useForm<CarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const features = useWatch({
    control: form.control,
    name: 'features',
    defaultValue: []
  }) as string[];

  // Сброс модели при смене марки
  useEffect(() => {
    if (
      !carModels[selectedBrand]?.some((m) => m.id === form.getValues('model'))
    ) {
      form.setValue('model', '');
    }
  }, [selectedBrand, form]);

  function onSubmit(values: CarFormValues) {
    console.log('Submitting car data:', values);
    // Здесь будет логика отправки — например, вызов API
  }

  const currentModels = carModels[selectedBrand] || [];

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Фото автомобиля *</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={MAX_FILE_SIZE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Марка */}
              <FormField
                control={form.control}
                name='brand'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Марка *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedBrand(value);
                        form.setValue('model', ''); // Сброс модели при смене марки
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите марку' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Модель (зависит от марки) */}
              <FormField
                control={form.control}
                name='model'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Модель *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedBrand}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedBrand
                                ? 'Выберите модель'
                                : 'Сначала выберите марку'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currentModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Год выпуска *</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='2020'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена (₸) *</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='1000'
                        placeholder='5000000'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mileage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пробег (км) *</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='35000'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цвет *</FormLabel>
                    <FormControl>
                      <Input placeholder='Белый' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fuelType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип топлива *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите тип топлива' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='petrol'>Бензин</SelectItem>
                        <SelectItem value='diesel'>Дизель</SelectItem>
                        <SelectItem value='electric'>Электро</SelectItem>
                        <SelectItem value='hybrid'>Гибрид</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='transmission'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Коробка передач *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите коробку' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='manual'>Механика</SelectItem>
                        <SelectItem value='automatic'>Автомат</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сотрудник, загнавший авто *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите сотрудника' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Фичи / Подарки */}
              <FormField
                control={form.control}
                name='features'
                render={() => (
                  <FormItem className='md:col-span-2'>
                    <div className='mb-2 flex items-center justify-between'>
                      <FormLabel className='text-base'>
                        Дополнительно / Подарки
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            className='w-full justify-between'
                          >
                            {features.length > 0
                              ? `${features.length} выбрано`
                              : 'Выберите опции...'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-4'>
                          <div className='grid max-h-60 gap-2 overflow-y-auto'>
                            {availableFeatures.map((feature) => (
                              <FormField
                                key={feature.id}
                                control={form.control}
                                name='features'
                                render={({ field }) => {
                                  const isSelected = field.value?.includes(
                                    feature.id
                                  );
                                  return (
                                    <FormItem
                                      key={feature.id}
                                      className='flex flex-row items-start space-y-0 space-x-3'
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={isSelected}
                                          onCheckedChange={(checked) => {
                                            const updated = checked
                                              ? [
                                                  ...(field.value || []),
                                                  feature.id
                                                ]
                                              : (field.value || []).filter(
                                                  (v: string) =>
                                                    v !== feature.id
                                                );
                                            field.onChange(updated);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className='text-sm font-normal'>
                                        {feature.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание автомобиля *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Опишите состояние, комплектацию, особенности...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full md:w-auto'>
              {initialData ? 'Обновить автомобиль' : 'Добавить автомобиль'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
