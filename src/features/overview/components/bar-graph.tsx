'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-08-01', added: 12, sold: 7 },
  { date: '2024-08-02', added: 9, sold: 5 },
  { date: '2024-08-03', added: 14, sold: 10 },
  { date: '2024-08-04', added: 8, sold: 6 },
  { date: '2024-08-05', added: 11, sold: 9 },
  { date: '2024-08-06', added: 15, sold: 12 },
  { date: '2024-08-07', added: 10, sold: 7 },
  { date: '2024-08-08', added: 13, sold: 8 },
  { date: '2024-08-09', added: 7, sold: 5 },
  { date: '2024-08-10', added: 16, sold: 12 },
  { date: '2024-08-11', added: 9, sold: 6 },
  { date: '2024-08-12', added: 12, sold: 9 },
  { date: '2024-08-13', added: 14, sold: 11 },
  { date: '2024-08-14', added: 10, sold: 8 },
  { date: '2024-08-15', added: 11, sold: 7 },
  { date: '2024-08-16', added: 13, sold: 9 },
  { date: '2024-08-17', added: 15, sold: 12 },
  { date: '2024-08-18', added: 8, sold: 6 },
  { date: '2024-08-19', added: 10, sold: 7 },
  { date: '2024-08-20', added: 12, sold: 8 },
  { date: '2024-08-21', added: 9, sold: 6 },
  { date: '2024-08-22', added: 14, sold: 10 },
  { date: '2024-08-23', added: 11, sold: 9 },
  { date: '2024-08-24', added: 13, sold: 8 },
  { date: '2024-08-25', added: 16, sold: 12 },
  { date: '2024-08-26', added: 10, sold: 7 },
  { date: '2024-08-27', added: 12, sold: 9 },
  { date: '2024-08-28', added: 15, sold: 11 },
  { date: '2024-08-29', added: 8, sold: 5 },
  { date: '2024-08-30', added: 13, sold: 9 },
  { date: '2024-08-31', added: 11, sold: 7 }
];

const chartConfig = {
  added: {
    label: 'Загнано авто',
    color: 'var(--primary)'
  },
  sold: {
    label: 'Продано авто',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('sold');

  const total = React.useMemo(
    () => ({
      added: chartData.reduce((acc, curr) => acc + curr.added, 0),
      sold: chartData.reduce((acc, curr) => acc + curr.sold, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>Статистика</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              За последний месяц
            </span>
            <span className='@[540px]/card:hidden'>За последний месяц</span>
          </CardDescription>
        </div>
        <div className='flex'>
          {(['added', 'sold'] as (keyof typeof chartConfig)[]).map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
