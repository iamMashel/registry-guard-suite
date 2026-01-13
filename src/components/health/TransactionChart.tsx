import { useQuery } from '@tanstack/react-query';
import { fetchTransactionData, queryKeys } from '@/services/api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export const TransactionChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: fetchTransactionData,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-[400px] animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-full bg-muted/50 rounded" />
      </div>
    );
  }

  const chartData = data?.map((point) => ({
    ...point,
    date: format(new Date(point.date), 'MMM d'),
  }));

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Transaction Volume Trend</h3>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="validatedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 30%, 18%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(222, 30%, 18%)' }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="hsl(173, 80%, 50%)"
              strokeWidth={2}
              fill="url(#volumeGradient)"
              name="Total Volume"
            />
            <Area
              type="monotone"
              dataKey="validated"
              stroke="hsl(142, 76%, 45%)"
              strokeWidth={2}
              fill="url(#validatedGradient)"
              name="Validated"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Validated</span>
        </div>
      </div>
    </div>
  );
};
