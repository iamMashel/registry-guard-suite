import { useQuery } from '@tanstack/react-query';
import { fetchSchemaContract, queryKeys } from '@/services/api';
import { FileJson, Check } from 'lucide-react';

interface SchemaProperty {
  type: string;
  format?: string;
  description?: string;
  enum?: string[];
  minimum?: number;
  default?: string;
}

export const SchemaViewer = () => {
  const { data: schema, isLoading } = useQuery({
    queryKey: queryKeys.schema,
    queryFn: fetchSchemaContract,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-64 bg-muted/50 rounded" />
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <FileJson className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Schema Contract</h3>
        <span className="status-badge-success ml-auto">
          <Check className="w-3 h-3" />
          Active
        </span>
      </div>

      {/* Schema Info */}
      <div className="mb-4 p-4 bg-secondary/30 rounded-lg">
        <h4 className="font-mono font-semibold text-primary mb-2">
          {schema?.title}
        </h4>
        <p className="text-sm text-muted-foreground">
          Type: <span className="text-foreground">{schema?.type}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Required Fields: <span className="text-foreground">{schema?.required.join(', ')}</span>
        </p>
      </div>

      {/* Properties */}
      <div className="space-y-3">
        {schema?.properties && Object.entries(schema.properties).map(([key, value]) => {
          const prop = value as SchemaProperty;
          return (
            <div
              key={key}
              className="p-4 bg-secondary/20 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-medium text-foreground">{key}</span>
                {schema.required.includes(key) && (
                  <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                    required
                  </span>
                )}
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded ml-auto">
                  {prop.type}
                </span>
              </div>
              {prop.description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {prop.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 text-xs">
                {prop.format && (
                  <span className="text-muted-foreground">
                    format: <span className="text-foreground">{prop.format}</span>
                  </span>
                )}
                {prop.enum && (
                  <span className="text-muted-foreground">
                    enum: <span className="font-mono text-foreground">{prop.enum.join(' | ')}</span>
                  </span>
                )}
                {prop.minimum !== undefined && (
                  <span className="text-muted-foreground">
                    min: <span className="text-foreground">{prop.minimum}</span>
                  </span>
                )}
                {prop.default !== undefined && (
                  <span className="text-muted-foreground">
                    default: <span className="text-foreground">{prop.default}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
