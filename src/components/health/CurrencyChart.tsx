import { useQuery } from '@tanstack/react-query';
import { fetchCurrencyData, queryKeys } from '@/services/api';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Wallet } from 'lucide-react';

const COLORS = [
  'hsl(173, 80%, 50%)',
  'hsl(142, 76%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 80%, 60%)',
  'hsl(0, 72%, 51%)',
  'hsl(215, 20%, 55%)',
];

export const CurrencyChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.currencies,
    queryFn: fetchCurrencyData,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-[400px] animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-full bg-muted/50 rounded" />
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Currency Distribution</h3>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="h-[250px] w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="count"
                nameKey="currency"
                strokeWidth={0}
              >
                {data?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 10%)',
                  border: '1px solid hsl(222, 30%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 98%)',
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-3">
            {data?.map((item, index) => (
              <div
                key={item.currency}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-mono font-medium">{item.currency}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
