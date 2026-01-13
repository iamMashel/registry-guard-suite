import { X, Tag, Calendar, Hash, HardDrive, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { DockerImage } from '@/data/mocks';

interface ImageDetailPanelProps {
  image: DockerImage | null;
  onClose: () => void;
}

export const ImageDetailPanel = ({ image, onClose }: ImageDetailPanelProps) => {
  if (!image) return null;

  const getStatusIcon = (status: DockerImage['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-card border-l border-border z-50 animate-fade-in overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(image.status)}
            <h2 className="font-mono text-lg font-semibold">{image.tag}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Built</span>
              </div>
              <p className="font-medium">
                {format(new Date(image.buildDate), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <HardDrive className="w-4 h-4" />
                <span className="text-xs">Size</span>
              </div>
              <p className="font-medium">{image.size}</p>
            </div>
          </div>

          {/* SHA256 */}
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">SHA256 Digest</span>
            </div>
            <div className="code-block break-all">
              {image.sha256}
            </div>
          </div>

          {/* Row Count */}
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">Validated Rows</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {image.rowCount.toLocaleString()}
            </p>
          </div>

          {/* Labels */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Docker Labels
            </h3>
            <div className="space-y-2">
              {Object.entries(image.labels).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-secondary/30 rounded-lg p-3"
                >
                  <p className="font-mono text-xs text-muted-foreground mb-1">
                    {key}
                  </p>
                  <p className={cn(
                    "font-mono text-sm",
                    key.includes('error') && 'text-destructive',
                    key.includes('warning') && 'text-warning',
                    key.includes('validated') && value === 'true' && 'text-success'
                  )}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
