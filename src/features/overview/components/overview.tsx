import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { TopSalesPeople } from './recent-sales';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';

export default function OverViewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Автосалон — статистика 🚗
          </h2>
          <div className='hidden items-center space-x-2 md:flex'>
            <Button>Выгрузить отчёт</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Обзор</TabsTrigger>
            <TabsTrigger value='analytics' disabled>
              Аналитика
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
              {/* Выручка от продаж */}
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Выручка за месяц</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    12.800.500
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingUp />
                      +8.2%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='flex gap-2 font-medium'>
                    Продажи растут <IconTrendingUp className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    По сравнению с прошлым месяцем
                  </div>
                </CardFooter>
              </Card>

              {/* Новые загоны */}
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Новые загоны</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    87
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingDown />
                      -12%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='flex gap-2 font-medium'>
                    Снижение активности <IconTrendingDown className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Меньше машин привезли в этом месяце
                  </div>
                </CardFooter>
              </Card>

              {/* Активные машины на площадке */}
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Активные машины</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    142
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingUp />
                      +5%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='flex gap-2 font-medium'>
                    Больше машин в продаже <IconTrendingUp className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Включая новые поступления
                  </div>
                </CardFooter>
              </Card>

              {/* Средняя маржа */}
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Средняя маржа</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    18.7%
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingUp />
                      +1.3%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='flex gap-2 font-medium'>
                    Стабильный рост <IconTrendingUp className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    По сравнению с прошлым кварталом
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              {/* График по загонам/продажам */}
              <div className='col-span-4'>
                <BarGraph />
              </div>

              {/* Недавние сделки */}
              <Card className='col-span-4 md:col-span-3'>
                <TopSalesPeople />
              </Card>

              {/* Динамика продаж */}
              <div className='col-span-4'>
                <AreaGraph />
              </div>

              {/* Разбивка по маркам */}
              <div className='col-span-4 md:col-span-3'>
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
