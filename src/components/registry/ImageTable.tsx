import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchImages, queryKeys } from '@/services/api';
import { Search, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ImageDetailPanel } from './ImageDetailPanel';
import type { DockerImage } from '@/data/mocks';

export const ImageTable = () => {
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState<DockerImage | null>(null);
  
  const { data: images, isLoading } = useQuery({
    queryKey: queryKeys.images,
    queryFn: fetchImages,
  });

  const filteredImages = images?.filter((img) =>
    img.tag.toLowerCase().includes(search.toLowerCase()) ||
    img.sha256.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: DockerImage['status']) => {
    switch (status) {
      case 'passed':
        return (
          <span className="status-badge-success">
            <CheckCircle className="w-3 h-3" />
            Passed
          </span>
        );
      case 'failed':
        return (
          <span className="status-badge-error">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      case 'warning':
        return (
          <span className="status-badge-warning">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card p-6 animate-fade-in">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by tag or SHA256..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border focus:border-primary input-glow"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tag</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Build Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Rows</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">SHA256</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages?.map((image) => (
                <tr
                  key={image.id}
                  className="table-row-hover border-b border-border/50"
                  onClick={() => setSelectedImage(image)}
                >
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {image.tag}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(image.status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    {formatDistanceToNow(new Date(image.buildDate), { addSuffix: true })}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-sm hidden lg:table-cell">
                    {image.rowCount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 hidden xl:table-cell">
                    <span className="font-mono text-xs text-muted-foreground">
                      {image.sha256.substring(0, 20)}...
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredImages?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No images found matching your search.
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <ImageDetailPanel 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
};
