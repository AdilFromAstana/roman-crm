'use client';

import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { getNextStatus, useSalesStatuses } from '@/hooks/useSalesStatuses';

interface Props {
  sale: {
    id: string;
    salesStatusCode: string;
    salesStatus?: { name: string; color?: string };
    saleEmployeeBonus?: number;
    bringEmployeeBonus?: number;
    managerEmployeeBonus?: number;
    totalBonuses?: number;
  };
}

export default function SaleStatusProgress({ sale }: Props) {
  const queryClient = useQueryClient();
  const { data: statuses } = useSalesStatuses();

  const mutation = useMutation({
    mutationFn: async (nextStatus: { code: string }) => {
      // собираем payload динамически
      const payload: Record<string, any> = {
        salesStatusCode: nextStatus.code
      };

      if (nextStatus.code === 'BONUSES_ISSUED') {
        payload.saleEmployeeBonus = sale.saleEmployeeBonus ?? 0;
        payload.bringEmployeeBonus = sale.bringEmployeeBonus ?? 0;
        payload.managerEmployeeBonus = sale.managerEmployeeBonus ?? 0;
        payload.totalBonuses = sale.totalBonuses ?? 0;
      }

      if (nextStatus.code === 'COMMISSION_ISSUED') {
        // можно дополнительно что-то передать, если требуется
        payload.isCommissionPaid = true;
      }

      return api.patch(`/sales/${sale.id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sale', sale.id] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    }
  });

  if (!statuses) return null;
  const nextStatus = getNextStatus(statuses, sale.salesStatusCode);

  return (
    <div className='flex items-center gap-3'>
      <span
        className='rounded px-3 py-1 text-white'
        style={{ backgroundColor: sale.salesStatus?.color || '#999' }}
      >
        {sale.salesStatus?.name || sale.salesStatusCode}
      </span>

      {nextStatus && (
        <Button
          onClick={() => mutation.mutate(nextStatus)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '⏳' : `Перевести в: ${nextStatus.name}`}
        </Button>
      )}
    </div>
  );
}
