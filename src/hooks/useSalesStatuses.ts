// hooks/useSalesStatuses.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export interface SalesStatus {
  id: string;
  code: string;
  name: string;
  description?: string;
  order: number;
  color?: string;
  icon?: string;
}

export function useSalesStatuses() {
  return useQuery<SalesStatus[]>({
    queryKey: ['sales-statuses'],
    queryFn: async () => {
      const res = await api.get('/sales-statuses');
      return res.data;
    },
    staleTime: 5 * 60 * 1000
  });
}

export function getNextStatus(statuses: SalesStatus[], currentCode: string) {
  const sorted = [...statuses].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((s) => s.code === currentCode);
  if (currentIndex === -1 || currentIndex === sorted.length - 1) return null;
  return sorted[currentIndex + 1];
}
