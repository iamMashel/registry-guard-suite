import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  status?: 'success' | 'warning' | 'error';
}

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  status 
}: KPICardProps) => {
  const statusColors = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
  };

  return (
    <div className="kpi-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={cn(
            "text-3xl font-bold tracking-tight",
            status ? statusColors[status] : 'text-foreground'
          )}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-sm font-medium",
              trend.positive ? 'text-success' : 'text-destructive'
            )}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          status === 'success' && 'bg-success/10',
          status === 'warning' && 'bg-warning/10',
          status === 'error' && 'bg-destructive/10',
          !status && 'bg-primary/10'
        )}>
          <Icon className={cn(
            "w-6 h-6",
            status ? statusColors[status] : 'text-primary'
          )} />
        </div>
      </div>
    </div>
  );
};
