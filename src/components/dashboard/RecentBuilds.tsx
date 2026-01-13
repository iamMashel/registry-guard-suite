import { useQuery } from '@tanstack/react-query';
import { fetchRecentBuilds, queryKeys } from '@/services/api';
import { CheckCircle, XCircle, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export const RecentBuilds = () => {
  const { data: builds, isLoading } = useQuery({
    queryKey: queryKeys.builds,
    queryFn: fetchRecentBuilds,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'building':
        return <Loader2 className="w-5 h-5 text-warning animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-muted-foreground" />
        Recent Builds
      </h3>
      <div className="space-y-3">
        {builds?.map((build) => (
          <div
            key={build.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(build.status)}
              <div>
                <p className="font-mono text-sm font-medium">{build.imageTag}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(build.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-sm font-medium",
                build.status === 'passed' && 'text-success',
                build.status === 'failed' && 'text-destructive',
                build.status === 'building' && 'text-warning'
              )}>
                {build.status.charAt(0).toUpperCase() + build.status.slice(1)}
              </p>
              <p className="text-xs text-muted-foreground">{build.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
