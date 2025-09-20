'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// Данные по месяцам: посетители и продажи
const chartData = [
  { month: 'Январь', visitors: 1200, sales: 320 },
  { month: 'Февраль', visitors: 1350, sales: 400 },
  { month: 'Март', visitors: 1500, sales: 450 },
  { month: 'Апрель', visitors: 1100, sales: 300 },
  { month: 'Май', visitors: 1600, sales: 500 },
  { month: 'Июнь', visitors: 1700, sales: 520 }
];

export function AreaGraph() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Статистика продаж и посетителей</CardTitle>
        <CardDescription>Данные за последние 6 месяцев</CardDescription>
      </CardHeader>

      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <div className='aspect-auto h-[250px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <defs>
                <linearGradient id='fillVisitors' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id='fillSales' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#22c55e' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#22c55e' stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <Tooltip />

              <Area
                dataKey='visitors'
                type='monotone'
                fill='url(#fillVisitors)'
                stroke='#3b82f6'
                stackId='a'
                name='Посетители'
              />
              <Area
                dataKey='sales'
                type='monotone'
                fill='url(#fillSales)'
                stroke='#22c55e'
                stackId='a'
                name='Продажи'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Рост на 5.2% в этом месяце
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              Январь – Июнь 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
