'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// 🚗 Данные по брендам машин
const chartData = [
  { brand: 'Toyota', cars: 320 },
  { brand: 'Kia', cars: 250 },
  { brand: 'Hyundai', cars: 200 },
  { brand: 'Nissan', cars: 150 },
  { brand: 'Другое', cars: 180 }
];

const chartConfig = {
  cars: {
    label: 'Машины'
  },
  Toyota: {
    label: 'Toyota',
    color: 'var(--primary)'
  },
  Kia: {
    label: 'Kia',
    color: 'var(--primary)'
  },
  Hyundai: {
    label: 'Hyundai',
    color: 'var(--primary)'
  },
  Nissan: {
    label: 'Nissan',
    color: 'var(--primary)'
  },
  Другое: {
    label: 'Другое',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalCars = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cars, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Популярные марки машин</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Статистика загнанных машин за последние 6 месяцев
          </span>
          <span className='@[540px]/card:hidden'>Распределение по брендам</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {chartData.map((item, index) => (
                <linearGradient
                  key={item.brand}
                  id={`fill${item.brand}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='var(--primary)'
                    stopOpacity={1 - index * 0.15}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--primary)'
                    stopOpacity={0.8 - index * 0.15}
                  />
                </linearGradient>
              ))}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.brand})`
              }))}
              dataKey='cars'
              nameKey='brand'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalCars.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Всего машин
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Toyota лидирует с {((chartData[0].cars / totalCars) * 100).toFixed(1)}
          % <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Данные за январь – июнь 2024
        </div>
      </CardFooter>
    </Card>
  );
}
