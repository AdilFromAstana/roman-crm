// app/dashboard/bring-car/new/page.tsx
'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload, X, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { BRANDS, EMPLOYEES, FEATURES, MODELS_BY_BRAND } from '@/constants/data';
import { useState, useRef } from 'react';

interface ImageWithPreview {
  file: File;
  preview: string;
}

export default function NewBringCarPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1);

    // Освобождаем память
    URL.revokeObjectURL(removedImage[0].preview);
    setImages(newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newImages = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnItem = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));

    if (draggedIndex !== targetIndex) {
      const newImages = [...images];
      const draggedItem = newImages[draggedIndex];

      // Удаляем элемент из старой позиции
      newImages.splice(draggedIndex, 1);
      // Вставляем в новую позицию
      newImages.splice(targetIndex, 0, draggedItem);

      setImages(newImages);
    }

    setDraggedItem(null);
  };

  return (
    <PageContainer>
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/bring-car'>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold'>Добавить авто для загона</h1>
        </div>

        <Separator />

        <form className='space-y-6'>
          {/* Основная информация об авто */}
          <Card>
            <CardHeader>
              <CardTitle>Информация об автомобиле</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='brand'>Марка *</Label>
                  <Select onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите марку' />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANDS.map((brand) => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='model'>Модель *</Label>
                  <Select disabled={!selectedBrand}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedBrand
                            ? 'Выберите модель'
                            : 'Сначала выберите марку'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedBrand &&
                        MODELS_BY_BRAND[selectedBrand]?.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='year'>Год *</Label>
                  <Input
                    id='year'
                    type='number'
                    min='1900'
                    max={new Date().getFullYear()}
                    placeholder='2020'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='price'>Цена (₸) *</Label>
                  <Input
                    id='price'
                    type='number'
                    min='0'
                    placeholder='5000000'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='mileage'>Пробег (км) *</Label>
                  <Input
                    id='mileage'
                    type='number'
                    min='0'
                    placeholder='50000'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='color'>Цвет *</Label>
                  <Input id='color' placeholder='Белый' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='fuelType'>Тип топлива *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите тип топлива' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='petrol'>Бензин</SelectItem>
                      <SelectItem value='diesel'>Дизель</SelectItem>
                      <SelectItem value='electric'>Электро</SelectItem>
                      <SelectItem value='hybrid'>Гибрид</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='transmission'>Коробка передач *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите коробку' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='manual'>Механика</SelectItem>
                      <SelectItem value='automatic'>Автомат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Фотографии */}
          <Card>
            <CardHeader>
              <CardTitle>Фотографии автомобиля</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Загрузить фотографии</Label>
                <div
                  className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/10'
                      : 'border-muted-foreground hover:border-primary'
                  }`}
                  onClick={triggerFileInput}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    accept='image/*'
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className='flex flex-col items-center gap-2'>
                    <Upload className='text-muted-foreground h-8 w-8' />
                    <p className='text-muted-foreground'>
                      Нажмите для загрузки или перетащите файлы сюда
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      Поддерживаются JPG, PNG, GIF (макс. 10 файлов)
                    </p>
                  </div>
                </div>
              </div>

              {images.length > 0 && (
                <div className='space-y-2'>
                  <Label>Загруженные фотографии</Label>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-lg border transition-all ${
                          draggedItem === index ? 'opacity-50' : ''
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropOnItem(e, index)}
                      >
                        <div className='bg-muted flex aspect-square items-center justify-center'>
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className='h-full w-full object-cover'
                          />
                        </div>

                        {/* Drag handle */}
                        <div className='absolute top-1 left-1 cursor-move rounded bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'>
                          <GripVertical className='h-4 w-4' />
                        </div>

                        {/* Remove button */}
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          className='absolute top-2 right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                          onClick={() => removeImage(index)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Сотрудник */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о сотруднике</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='bringEmployeeId'>Загнал авто *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите сотрудника' />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYEES.map((employee) => (
                        <SelectItem key={employee.value} value={employee.value}>
                          {employee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='createdAt'>Дата загона *</Label>
                  <Input id='createdAt' type='datetime-local' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Особенности авто */}
          <Card>
            <CardHeader>
              <CardTitle>Особенности автомобиля</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
                {FEATURES.map((feature) => (
                  <div key={feature} className='flex items-center space-x-2'>
                    <Checkbox id={`feature-${feature}`} />
                    <label
                      htmlFor={`feature-${feature}`}
                      className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Описание */}
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='Дополнительная информация о автомобиле...'
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className='flex justify-end gap-2'>
            <Button variant='outline' asChild>
              <Link href='/dashboard/bring-car'>Отмена</Link>
            </Button>
            <Button type='submit'>Добавить авто</Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
