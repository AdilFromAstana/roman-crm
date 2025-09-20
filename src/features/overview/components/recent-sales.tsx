import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const topSalesPeople = [
  {
    name: 'Алексей Жумагулов',
    role: 'Старший менеджер по продажам',
    avatar: 'https://api.slingacademy.com/public/sample-users/10.png',
    fallback: 'АЖ',
    sales: '₸ 12 500 000',
    growth: '+15%'
  },
  {
    name: 'Мария Абилова',
    role: 'Региональный менеджер (Алматы)',
    avatar: 'https://api.slingacademy.com/public/sample-users/11.png',
    fallback: 'МА',
    sales: '₸ 9 850 000',
    growth: '+8%'
  },
  {
    name: 'Данияр Садыков',
    role: 'Аккаунт-менеджер',
    avatar: 'https://api.slingacademy.com/public/sample-users/12.png',
    fallback: 'ДС',
    sales: '₸ 7 520 000',
    growth: '+12%'
  },
  {
    name: 'Эльмира Нурланова',
    role: 'Менеджер по ключевым клиентам',
    avatar: 'https://api.slingacademy.com/public/sample-users/13.png',
    fallback: 'ЭН',
    sales: '₸ 6 980 000',
    growth: '+6%'
  },
  {
    name: 'Айдос Бекенов',
    role: 'Менеджер по продажам',
    avatar: 'https://api.slingacademy.com/public/sample-users/14.png',
    fallback: 'АБ',
    sales: '₸ 5 540 000',
    growth: '+10%'
  }
];

const medals = ['🥇', '🥈', '🥉'];

export function TopSalesPeople() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Лучшие продавцы</CardTitle>
        <CardDescription>Результаты за этот месяц</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {topSalesPeople.map((person, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>{person.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-0.5'>
                <p className='text-sm leading-none font-medium'>
                  {medals[index] ? medals[index] + ' ' : ''}
                  {person.name}
                </p>
                <p className='text-muted-foreground text-xs'>{person.role}</p>
              </div>
              <div className='ml-auto text-right'>
                <p className='text-sm font-semibold'>{person.sales}</p>
                <p className='text-xs text-green-600'>{person.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
