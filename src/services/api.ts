/**
 * API Service Layer
 * 
 * This file provides a clean abstraction for API calls.
 * Currently uses mock data, but is architected for easy REST API integration.
 * 
 * To switch to real API:
 * 1. Set API_BASE_URL to your backend URL
 * 2. Uncomment the fetch implementations
 * 3. Remove mock data imports
 */

import {
  dockerImages,
  recentBuilds,
  dashboardMetrics,
  transactionData,
  currencyData,
  schemaContract,
  validateData as mockValidate,
  getImageDetails as mockGetImageDetails,
  type DockerImage,
  type Build,
  type DashboardMetrics,
  type TransactionPoint,
  type CurrencyDistribution,
  type ValidationResult,
} from '@/data/mocks';

// API Configuration
const API_BASE_URL = '/api'; // Change this for production

// Simulated network delay for realistic UX
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all Docker images
 * Endpoint: GET /api/images
 */
export const fetchImages = async (): Promise<DockerImage[]> => {
  await simulateDelay();
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/images`);
  // return response.json();
  return dockerImages;
};

/**
 * Fetch single image details by tag
 * Endpoint: GET /api/images/:tag
 */
export const fetchImageDetails = async (tag: string): Promise<DockerImage | undefined> => {
  await simulateDelay(200);
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/images/${tag}`);
  // return response.json();
  return mockGetImageDetails(tag);
};

/**
 * Fetch dashboard overview metrics
 * Endpoint: GET /api/metrics/overview
 */
export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  await simulateDelay();
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/metrics/overview`);
  // return response.json();
  return dashboardMetrics;
};

/**
 * Fetch recent builds
 * Endpoint: GET /api/builds/recent
 */
export const fetchRecentBuilds = async (): Promise<Build[]> => {
  await simulateDelay();
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/builds/recent`);
  // return response.json();
  return recentBuilds;
};

/**
 * Fetch transaction volume data
 * Endpoint: GET /api/health/transactions
 */
export const fetchTransactionData = async (): Promise<TransactionPoint[]> => {
  await simulateDelay();
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/health/transactions`);
  // return response.json();
  return transactionData;
};

/**
 * Fetch currency distribution data
 * Endpoint: GET /api/health/currencies
 */
export const fetchCurrencyData = async (): Promise<CurrencyDistribution[]> => {
  await simulateDelay();
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/health/currencies`);
  // return response.json();
  return currencyData;
};

/**
 * Fetch schema contract
 * Endpoint: GET /api/schema
 */
export const fetchSchemaContract = async (): Promise<typeof schemaContract> => {
  await simulateDelay(200);
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/schema`);
  // return response.json();
  return schemaContract;
};

/**
 * Validate data against schema
 * Endpoint: POST /api/validate
 */
export const validateDataPayload = async (input: string): Promise<ValidationResult> => {
  await simulateDelay(500);
  // Real implementation:
  // const response = await fetch(`${API_BASE_URL}/validate`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ data: input }),
  // });
  // return response.json();
  return mockValidate(input);
};

/**
 * React Query keys for cache management
 */
export const queryKeys = {
  images: ['images'] as const,
  imageDetails: (tag: string) => ['images', tag] as const,
  metrics: ['metrics'] as const,
  builds: ['builds'] as const,
  transactions: ['transactions'] as const,
  currencies: ['currencies'] as const,
  schema: ['schema'] as const,
};
