import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { validateDataPayload } from '@/services/api';
import { Terminal, Play, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ValidationResult } from '@/data/mocks';

const sampleData = `{
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 150.50,
  "currency": "USD",
  "timestamp": "2024-01-13T10:30:00Z",
  "merchant_id": "MERCHANT_001",
  "category": "retail",
  "status": "completed"
}`;

export const ValidationPlayground = () => {
  const [input, setInput] = useState(sampleData);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const mutation = useMutation({
    mutationFn: validateDataPayload,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleValidate = () => {
    mutation.mutate(input);
  };

  const loadSample = () => {
    setInput(sampleData);
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Data Validator</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadSample}
            className="text-muted-foreground"
          >
            Load Sample
          </Button>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON or CSV data here..."
          className="font-mono text-sm h-64 bg-secondary/50 border-border focus:border-primary resize-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Supports JSON objects, arrays, or CSV format
          </p>
          <Button
            onClick={handleValidate}
            disabled={mutation.isPending || !input.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Validate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            {result.valid ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive" />
            )}
            <h3 className={cn(
              "text-xl font-semibold",
              result.valid ? "text-success" : "text-destructive"
            )}>
              Validation {result.valid ? 'Passed' : 'Failed'}
            </h3>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{result.stats.rowsProcessed}</p>
              <p className="text-xs text-muted-foreground">Rows Processed</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-success">{result.stats.validRows}</p>
              <p className="text-xs text-muted-foreground">Valid</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{result.stats.invalidRows}</p>
              <p className="text-xs text-muted-foreground">Invalid</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold font-mono">{result.stats.processingTime}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Errors ({result.errors.length})
              </h4>
              <div className="space-y-2">
                {result.errors.map((error, i) => (
                  <div
                    key={i}
                    className="bg-destructive/10 border border-destructive/30 rounded-lg p-3"
                  >
                    <p className="font-mono text-sm text-destructive">
                      <span className="text-muted-foreground">{error.path}:</span> {error.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Code: {error.code}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-warning mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warnings ({result.warnings.length})
              </h4>
              <div className="space-y-2">
                {result.warnings.map((warning, i) => (
                  <div
                    key={i}
                    className="bg-warning/10 border border-warning/30 rounded-lg p-3"
                  >
                    <p className="font-mono text-sm text-warning">
                      <span className="text-muted-foreground">{warning.path}:</span> {warning.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
