import { MainLayout } from '@/components/layout/MainLayout';
import { ValidationPlayground } from '@/components/playground/ValidationPlayground';
import { Terminal } from 'lucide-react';

const Playground = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Sentinel <span className="text-gradient">Playground</span>
              </h1>
              <p className="text-muted-foreground">
                Test data validation against the schema contract
              </p>
            </div>
          </div>
        </div>

        {/* Playground */}
        <ValidationPlayground />
      </div>
    </MainLayout>
  );
};

export default Playground;
