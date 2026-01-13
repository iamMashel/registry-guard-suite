import { MainLayout } from '@/components/layout/MainLayout';
import { TransactionChart } from '@/components/health/TransactionChart';
import { CurrencyChart } from '@/components/health/CurrencyChart';
import { SchemaViewer } from '@/components/health/SchemaViewer';
import { Activity } from 'lucide-react';

const Health = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Data <span className="text-gradient">Health</span>
              </h1>
              <p className="text-muted-foreground">
                Monitor validation trends and schema compliance
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TransactionChart />
          <CurrencyChart />
        </div>

        {/* Schema Contract */}
        <SchemaViewer />
      </div>
    </MainLayout>
  );
};

export default Health;
