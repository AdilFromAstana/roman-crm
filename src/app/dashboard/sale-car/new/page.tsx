// app/dashboard/sale-car/new/page.tsx
'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Search,
  Car,
  Calendar,
  Fuel,
  Settings
} from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { EMPLOYEES } from '@/constants/data';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { fakeBringCar } from '@/constants/fakeBringCar';
import { BringCar } from '@/types';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { bringCarColumns } from '@/features/products/components/product-tables/bringColumns';

interface SelectedCar extends BringCar {
  formattedLabel: string;
}

export default function NewSaleCarPage() {
  const [selectedCar, setSelectedCar] = useState<SelectedCar | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [cars, setCars] = useState<BringCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Таблица состояний
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Загружаем автомобили при монтировании
  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      try {
        const result = await fakeBringCar.getProducts({ page: 1, limit: 1000 });
        setCars(result.products);
      } catch (error) {
        console.error('Ошибка загрузки автомобилей:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  const formatFuelType = (fuelType: string): string => {
    const fuelTypes: Record<string, string> = {
      petrol: 'Бензин',
      diesel: 'Дизель',
      electric: 'Электро',
      hybrid: 'Гибрид'
    };
    return fuelTypes[fuelType] || fuelType;
  };

  const formatTransmission = (transmission: string): string => {
    const transmissions: Record<string, string> = {
      manual: 'Механика',
      automatic: 'Автомат'
    };
    return transmissions[transmission] || transmission;
  };

  // Создание таблицы
  const table = useReactTable({
    data: cars,
    columns: bringCarColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const handleSelectCar = (car: BringCar) => {
    const formattedLabel = `${car.brand} ${car.model} ${car.year}, ${car.mileage.toLocaleString('ru-RU')} км`;
    setSelectedCar({ ...car, formattedLabel });
    setIsSearchModalOpen(false);
  };

  return (
    <PageContainer>
      <div className='w-full space-y-6'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/sale-car'>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold'>Добавить новую продажу</h1>
        </div>

        <Separator />

        <form className='w-full space-y-6'>
          {/* Выбор автомобиля */}
          <Card>
            <CardHeader>
              <CardTitle>Выбор автомобиля</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Автомобиль *</Label>
                <Dialog
                  open={isSearchModalOpen}
                  onOpenChange={setIsSearchModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      type='button'
                      variant='outline'
                      className='w-full justify-between'
                    >
                      {selectedCar ? (
                        <span className='truncate'>
                          {selectedCar.formattedLabel}
                        </span>
                      ) : (
                        <span className='text-muted-foreground'>
                          Выберите автомобиль для продажи
                        </span>
                      )}
                      <Search className='ml-2 h-4 w-4' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='flex max-h-[80vh] max-w-6xl flex-col overflow-hidden'>
                    <DialogHeader>
                      <DialogTitle>Поиск автомобиля</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-1 flex-col space-y-4 overflow-hidden'>
                      {/* Тулбар с фильтрами */}
                      <DataTableToolbar table={table} tableType='bringCar' />

                      {/* Таблица с автомобилями */}
                      <div className='flex-1 overflow-auto rounded-md border'>
                        <Table className='min-w-full'>
                          <TableHeader className='bg-muted sticky top-0'>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                  return (
                                    <TableHead key={header.id}>
                                      {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                          )}
                                    </TableHead>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableHeader>
                          <TableBody>
                            {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && 'selected'}
                                  className='hover:bg-muted cursor-pointer'
                                  onClick={() => handleSelectCar(row.original)}
                                >
                                  {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={bringCarColumns.length}
                                  className='h-24 text-center'
                                >
                                  {isLoading
                                    ? 'Загрузка...'
                                    : 'Автомобили не найдены'}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Пагинация */}
                      <div className='border-t'>
                        <DataTablePagination table={table} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Карточка выбранного автомобиля */}
              {selectedCar && (
                <Card className='mt-4'>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg'>
                        {selectedCar.imageUrl ? (
                          <img
                            src={selectedCar.imageUrl}
                            alt={`${selectedCar.brand} ${selectedCar.model}`}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center'>
                            <Car className='text-muted-foreground h-8 w-8' />
                          </div>
                        )}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <h3 className='truncate font-semibold'>
                          {selectedCar.brand} {selectedCar.model}
                        </h3>
                        <div className='mt-2 grid grid-cols-2 gap-2 text-sm'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='text-muted-foreground h-4 w-4' />
                            <span>{selectedCar.year} г.</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Car className='text-muted-foreground h-4 w-4' />
                            <span>
                              {selectedCar.mileage.toLocaleString('ru-RU')} км
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Fuel className='text-muted-foreground h-4 w-4' />
                            <span>{formatFuelType(selectedCar.fuelType)}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Settings className='text-muted-foreground h-4 w-4' />
                            <span>
                              {formatTransmission(selectedCar.transmission)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex-shrink-0 text-right'>
                        <div className='text-lg font-bold'>
                          {selectedCar.price.toLocaleString('ru-RU')} ₸
                        </div>
                        <div className='text-muted-foreground text-sm'>
                          Цена автомобиля
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Информация о продаже */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о продаже</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='saleType'>Тип продажи *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите тип продажи' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Наличные</SelectItem>
                      <SelectItem value='credit'>Кредит</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bankCredit'>
                    Банк (при кредитной продаже)
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите банк' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='bereke'>Бereke Bank</SelectItem>
                      <SelectItem value='kaspi'>Kaspi Bank</SelectItem>
                      <SelectItem value='halyk'>Halyk Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='soldAt'>Дата продажи *</Label>
                  <Input id='soldAt' type='datetime-local' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сотрудники */}
          <Card>
            <CardHeader>
              <CardTitle>Сотрудники</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='saleEmployeeId'>Продал авто *</Label>
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
                  <Label htmlFor='marketgingEmployeeId'>Маркетинг *</Label>
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
              </div>
            </CardContent>
          </Card>

          {/* Описание */}
          <Card>
            <CardHeader>
              <CardTitle>Описание продажи</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='Дополнительная информация о продаже...'
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className='flex justify-end gap-2'>
            <Button variant='outline' asChild>
              <Link href='/dashboard/sale-car'>Отмена</Link>
            </Button>
            <Button type='submit' disabled={!selectedCar}>
              Добавить продажу
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
