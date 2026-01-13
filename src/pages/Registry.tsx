import { MainLayout } from '@/components/layout/MainLayout';
import { ImageTable } from '@/components/registry/ImageTable';
import { Database } from 'lucide-react';

const Registry = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Image <span className="text-gradient">Registry</span>
              </h1>
              <p className="text-muted-foreground">
                Browse and inspect validated Docker images
              </p>
            </div>
          </div>
        </div>

        {/* Image Table */}
        <ImageTable />
      </div>
    </MainLayout>
  );
};

export default Registry;
