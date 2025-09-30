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
// import { BRANDS, EMPLOYEES, FEATURES, MODELS_BY_BRAND } from '@/constants/data';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface ImageWithPreview {
  file: File;
  preview: string;
}

export default function NewBringCarPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [fuelTypes, setFuelTypes] = useState<any[]>([]);
  const [transmissions, setTransmissions] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);

  const router = useRouter();
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const [salePrice, setSalePrice] = useState<number>(0);
  const [mileage, setMileage] = useState<number>(0);
  const [colorCode, setColorCode] = useState<string>('');
  const [fuelTypeCode, setFuelTypeCode] = useState<string>('');
  const [transmissionCode, setTransmissionCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⚡️ В реальном проекте нужно загружать файлы на сервер/облако.
      // Пока возьмём preview как imageUrl (моки).
      const imageUrls = images.map((img) => img.preview);

      const dto = {
        brandCode: selectedBrand,
        modelCode: selectedModel,
        year: year ? Number(year) : null,
        price: price ? Number(price) : null,
        salePrice: salePrice ? Number(salePrice) : null,
        mileage: mileage ? Number(mileage) : null,
        colorCode,
        fuelTypeCode,
        transmissionCode,
        featureCodes: features.map((f) => f.code),
        description,
        bringEmployeeId: selectedEmployee,
        createdAt,
        imageUrls,
        isActive: true,
        bringCarStatusCode: "BRINGED"
      };

      await api.post('/bring-cars', dto); // прокси на твой NestJS (или прям URL)

      router.push('/dashboard/bring-car');
    } catch (err) {
      console.error('Ошибка при создании авто', err);
      alert('Ошибка при добавлении автомобиля');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          brandsRes,
          colorsRes,
          fuelTypesRes,
          transmissionsRes,
          employeesRes,
          featuresRes
        ] = await Promise.all([
          api.get('/brands'),
          api.get('/colors'),
          api.get('/fuel-types'),
          api.get('/transmissions'),
          api.get('/employees'),
          api.get('/features')
        ]);

        setBrands(brandsRes.data);
        setColors(colorsRes.data);
        setFuelTypes(fuelTypesRes.data);
        setTransmissions(transmissionsRes.data);
        setEmployees(employeesRes.data);
        setFeatures(featuresRes.data);
      } catch (err) {
        console.error('Ошибка загрузки справочников', err);
      }
    }

    fetchData();
  }, []);

  // Загружаем модели только после выбора бренда
  useEffect(() => {
    async function fetchModels() {
      if (!selectedBrand) {
        setModels([]);
        return;
      }
      const needBrandId = brands.find((b) => b.code === selectedBrand)?.id;
      try {
        const res = await api.get(`/models?brandId=${needBrandId}`);
        setModels(res.data);
      } catch (err) {
        console.error('Ошибка загрузки моделей', err);
      }
    }

    fetchModels();
  }, [selectedBrand]);

  return (
    <PageContainer>
      <div className='w-full space-y-6'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/bring-car'>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold'>Добавить авто для загона</h1>
        </div>

        <Separator />

        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Основная информация об авто */}
          <Card>
            <CardHeader>
              <CardTitle>Информация об автомобиле</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Марка *</Label>
                  <Select
                    onValueChange={setSelectedBrand}
                    value={selectedBrand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите марку' />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.code} value={brand.code}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Модель *</Label>
                  <Select
                    disabled={!selectedBrand}
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
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
                      {models.map((model) => (
                        <SelectItem key={model.code} value={model.code}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Цена продажи (₸)</Label>
                  <Input
                    type='number'
                    min='0'
                    placeholder='6000000'
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Цена загона(₸) *</Label>
                  <Input
                    type='number'
                    min='0'
                    placeholder='5000000'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Пробег (км) *</Label>
                  <Input
                    type='number'
                    min='0'
                    placeholder='50000'
                    value={mileage ?? 0}
                    onChange={(e) => setMileage(Number(e.target.value))}
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Цвет *</Label>
                  <Select value={colorCode} onValueChange={setColorCode}>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите цвет' />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.code} value={color.code}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Тип топлива *</Label>
                  <Select value={fuelTypeCode} onValueChange={setFuelTypeCode}>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите тип топлива' />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((fuel) => (
                        <SelectItem key={fuel.code} value={fuel.code}>
                          {fuel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Коробка передач *</Label>
                  <Select
                    value={transmissionCode}
                    onValueChange={setTransmissionCode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите коробку' />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissions.map((tr) => (
                        <SelectItem key={tr.code} value={tr.code}>
                          {tr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Год *</Label>
                  <Input
                    type='number'
                    min='1900'
                    max={new Date().getFullYear()}
                    placeholder='2020'
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
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
                  <Select onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите сотрудника' />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.firstName} {employee.lastName}
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
                {features.map((feature) => (
                  <div key={feature} className='flex items-center space-x-2'>
                    <Checkbox id={`feature-${feature}`} />
                    <label
                      htmlFor={`feature-${feature}`}
                      className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {feature.name}
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
