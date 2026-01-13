/**
 * Mock Data for Data Sentinel Dashboard
 * 
 * This file contains all mock data that will be replaced with real API calls.
 * Each export corresponds to an API endpoint response.
 * 
 * API Integration Points:
 * - GET /api/images -> dockerImages
 * - GET /api/images/:tag -> getImageDetails(tag)
 * - GET /api/metrics/overview -> dashboardMetrics
 * - GET /api/builds/recent -> recentBuilds
 * - GET /api/health/transactions -> transactionData
 * - GET /api/health/currencies -> currencyData
 * - POST /api/validate -> validateData(input)
 */

export interface DockerImage {
  id: string;
  tag: string;
  status: 'passed' | 'failed' | 'warning';
  buildDate: string;
  rowCount: number;
  sha256: string;
  size: string;
  labels: Record<string, string>;
}

export interface Build {
  id: string;
  imageTag: string;
  status: 'passed' | 'failed' | 'building';
  timestamp: string;
  duration: string;
  rowsValidated: number;
}

export interface DashboardMetrics {
  totalImages: number;
  passRate: number;
  totalRowsValidated: number;
  securityStatus: 'secure' | 'warning' | 'critical';
  lastScanTime: string;
}

export interface TransactionPoint {
  date: string;
  volume: number;
  validated: number;
}

export interface CurrencyDistribution {
  currency: string;
  count: number;
  percentage: number;
}

export const dockerImages: DockerImage[] = [
  {
    id: '1',
    tag: 'finance-v1.4.2',
    status: 'passed',
    buildDate: '2024-01-13T14:30:00Z',
    rowCount: 1245890,
    sha256: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef',
    size: '342 MB',
    labels: {
      'com.sentinel.schema': 'transaction-v2',
      'com.sentinel.source': 'kafka-stream',
      'com.sentinel.validated': 'true',
      'com.sentinel.compliance': 'SOX,PCI-DSS',
      'org.opencontainers.image.version': '1.4.2',
      'org.opencontainers.image.created': '2024-01-13T14:30:00Z',
    },
  },
  {
    id: '2',
    tag: 'finance-v1.4.1',
    status: 'passed',
    buildDate: '2024-01-12T09:15:00Z',
    rowCount: 1198234,
    sha256: 'sha256:b2c3d4e5f6789012345678901234567890abcdef01',
    size: '338 MB',
    labels: {
      'com.sentinel.schema': 'transaction-v2',
      'com.sentinel.source': 'kafka-stream',
      'com.sentinel.validated': 'true',
      'com.sentinel.compliance': 'SOX,PCI-DSS',
    },
  },
  {
    id: '3',
    tag: 'finance-v1.4.0',
    status: 'failed',
    buildDate: '2024-01-11T16:45:00Z',
    rowCount: 1156789,
    sha256: 'sha256:c3d4e5f6789012345678901234567890abcdef0123',
    size: '335 MB',
    labels: {
      'com.sentinel.schema': 'transaction-v2',
      'com.sentinel.source': 'kafka-stream',
      'com.sentinel.validated': 'false',
      'com.sentinel.error': 'Schema mismatch in currency field',
    },
  },
  {
    id: '4',
    tag: 'finance-v1.3.9',
    status: 'passed',
    buildDate: '2024-01-10T11:20:00Z',
    rowCount: 1089567,
    sha256: 'sha256:d4e5f6789012345678901234567890abcdef012345',
    size: '330 MB',
    labels: {
      'com.sentinel.schema': 'transaction-v1',
      'com.sentinel.source': 'batch-import',
      'com.sentinel.validated': 'true',
    },
  },
  {
    id: '5',
    tag: 'finance-v1.3.8',
    status: 'warning',
    buildDate: '2024-01-09T08:00:00Z',
    rowCount: 1045234,
    sha256: 'sha256:e5f6789012345678901234567890abcdef01234567',
    size: '328 MB',
    labels: {
      'com.sentinel.schema': 'transaction-v1',
      'com.sentinel.source': 'batch-import',
      'com.sentinel.validated': 'true',
      'com.sentinel.warning': 'Deprecated currency codes detected',
    },
  },
];

export const recentBuilds: Build[] = [
  {
    id: '1',
    imageTag: 'finance-v1.4.2',
    status: 'passed',
    timestamp: '2024-01-13T14:30:00Z',
    duration: '4m 23s',
    rowsValidated: 1245890,
  },
  {
    id: '2',
    imageTag: 'finance-v1.4.1',
    status: 'passed',
    timestamp: '2024-01-12T09:15:00Z',
    duration: '4m 18s',
    rowsValidated: 1198234,
  },
  {
    id: '3',
    imageTag: 'finance-v1.4.0',
    status: 'failed',
    timestamp: '2024-01-11T16:45:00Z',
    duration: '2m 45s',
    rowsValidated: 0,
  },
  {
    id: '4',
    imageTag: 'finance-v1.3.9',
    status: 'passed',
    timestamp: '2024-01-10T11:20:00Z',
    duration: '4m 12s',
    rowsValidated: 1089567,
  },
  {
    id: '5',
    imageTag: 'finance-v1.3.8',
    status: 'building',
    timestamp: '2024-01-09T08:00:00Z',
    duration: '3m 58s',
    rowsValidated: 1045234,
  },
];

export const dashboardMetrics: DashboardMetrics = {
  totalImages: 47,
  passRate: 94.2,
  totalRowsValidated: 45678901,
  securityStatus: 'secure',
  lastScanTime: '2024-01-13T14:35:00Z',
};

export const transactionData: TransactionPoint[] = [
  { date: '2024-01-07', volume: 892345, validated: 889234 },
  { date: '2024-01-08', volume: 945678, validated: 942345 },
  { date: '2024-01-09', volume: 1023456, validated: 1019876 },
  { date: '2024-01-10', volume: 1089567, validated: 1085432 },
  { date: '2024-01-11', volume: 1156789, validated: 1152345 },
  { date: '2024-01-12', volume: 1198234, validated: 1195678 },
  { date: '2024-01-13', volume: 1245890, validated: 1243567 },
];

export const currencyData: CurrencyDistribution[] = [
  { currency: 'USD', count: 15234567, percentage: 45.2 },
  { currency: 'EUR', count: 8765432, percentage: 26.0 },
  { currency: 'GBP', count: 4567890, percentage: 13.5 },
  { currency: 'JPY', count: 2345678, percentage: 7.0 },
  { currency: 'CHF', count: 1234567, percentage: 3.7 },
  { currency: 'Other', count: 1530767, percentage: 4.6 },
];

export const schemaContract = {
  title: 'TransactionRecord',
  type: 'object',
  required: ['transaction_id', 'amount', 'currency', 'timestamp'],
  properties: {
    transaction_id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique transaction identifier',
    },
    amount: {
      type: 'number',
      minimum: 0,
      description: 'Transaction amount in base currency units',
    },
    currency: {
      type: 'string',
      enum: ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD'],
      description: 'ISO 4217 currency code',
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
      description: 'Transaction timestamp in ISO 8601 format',
    },
    merchant_id: {
      type: 'string',
      description: 'Merchant identifier',
    },
    category: {
      type: 'string',
      enum: ['retail', 'services', 'travel', 'entertainment', 'other'],
    },
    status: {
      type: 'string',
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
};

export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    path: string;
    message: string;
    code: string;
  }>;
  warnings: Array<{
    path: string;
    message: string;
  }>;
  stats: {
    rowsProcessed: number;
    validRows: number;
    invalidRows: number;
    processingTime: string;
  };
}

/**
 * Mock validation function
 * Replace with: POST /api/validate
 */
export const validateData = (input: string): ValidationResult => {
  try {
    const parsed = JSON.parse(input);
    const isArray = Array.isArray(parsed);
    const records = isArray ? parsed : [parsed];
    
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];
    
    records.forEach((record, index) => {
      if (!record.transaction_id) {
        errors.push({
          path: `[${index}].transaction_id`,
          message: 'Required field missing',
          code: 'REQUIRED_FIELD',
        });
      }
      if (!record.amount || typeof record.amount !== 'number') {
        errors.push({
          path: `[${index}].amount`,
          message: 'Amount must be a positive number',
          code: 'INVALID_TYPE',
        });
      }
      if (!record.currency) {
        errors.push({
          path: `[${index}].currency`,
          message: 'Currency code required',
          code: 'REQUIRED_FIELD',
        });
      }
      if (record.amount && record.amount > 1000000) {
        warnings.push({
          path: `[${index}].amount`,
          message: 'Large transaction detected - manual review recommended',
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        rowsProcessed: records.length,
        validRows: records.length - errors.length,
        invalidRows: errors.length > 0 ? 1 : 0,
        processingTime: '0.023s',
      },
    };
  } catch {
    return {
      valid: false,
      errors: [{
        path: 'root',
        message: 'Invalid JSON format',
        code: 'PARSE_ERROR',
      }],
      warnings: [],
      stats: {
        rowsProcessed: 0,
        validRows: 0,
        invalidRows: 1,
        processingTime: '0.001s',
      },
    };
  }
};

export const getImageDetails = (tag: string): DockerImage | undefined => {
  return dockerImages.find((img) => img.tag === tag);
};
