import { useQuery } from '@tanstack/react-query';
import { fetchDashboardMetrics, queryKeys } from '@/services/api';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecentBuilds } from '@/components/dashboard/RecentBuilds';
import { Database, CheckCircle, Rows3, Shield } from 'lucide-react';

const Dashboard = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: queryKeys.metrics,
    queryFn: fetchDashboardMetrics,
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your containerized data validation pipeline
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Images"
            value={isLoading ? '...' : metrics?.totalImages || 0}
            icon={Database}
            trend={{ value: 12.5, positive: true }}
          />
          <KPICard
            title="Pass Rate"
            value={isLoading ? '...' : `${metrics?.passRate || 0}%`}
            icon={CheckCircle}
            status="success"
            trend={{ value: 2.3, positive: true }}
          />
          <KPICard
            title="Rows Validated"
            value={isLoading ? '...' : metrics?.totalRowsValidated || 0}
            subtitle="Last 30 days"
            icon={Rows3}
          />
          <KPICard
            title="Security Status"
            value={isLoading ? '...' : metrics?.securityStatus === 'secure' ? 'Secure' : 'Warning'}
            icon={Shield}
            status={metrics?.securityStatus === 'secure' ? 'success' : 'warning'}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Placeholder for chart - will show recent activity */}
            <div className="glass-card p-6 h-full">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/registry"
                  className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <Database className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium">Browse Registry</h4>
                  <p className="text-sm text-muted-foreground">View all Docker images</p>
                </a>
                <a
                  href="/health"
                  className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <CheckCircle className="w-8 h-8 text-success mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium">Data Health</h4>
                  <p className="text-sm text-muted-foreground">View health metrics</p>
                </a>
              </div>
            </div>
          </div>
          <RecentBuilds />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
