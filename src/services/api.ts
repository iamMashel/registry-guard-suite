import { DockerImage, recentBuilds, dashboardMetrics, transactionData, currencyData, schemaContract, validateData } from "@/data/mocks";

export interface RegistryData {
  repository_tags: string[];
  digest: string;
  size_bytes: number;
  layers: string[];
  validation_checksum: string;
  validated_row_count: number;
}

export const queryKeys = {
  images: ["images"],
  metrics: ["metrics"],
  recentBuilds: ["recentBuilds"],
  transactions: ["transactions"],
  currencies: ["currencies"],
  schema: ["schema"],
};

export const fetchRegistryData = async (): Promise<RegistryData> => {
  const response = await fetch("/api/registry");
  if (!response.ok) {
    throw new Error(`Failed to fetch registry data: ${response.statusText}`);
  }
  return response.json();
};

export const fetchImages = async (): Promise<DockerImage[]> => {
  try {
    const data = await fetchRegistryData();

    // Map backend data to DockerImage format
    const realImage: DockerImage = {
      id: "live-1",
      tag: data.repository_tags[0] || "unknown",
      status: "passed",
      buildDate: new Date().toISOString(),
      rowCount: data.validated_row_count,
      sha256: data.digest,
      size: `${(data.size_bytes / (1024 * 1024)).toFixed(2)} MB`,
      labels: {
        "com.registry.checksum": data.validation_checksum,
        "com.registry.layers": data.layers.length.toString(),
      }
    };

    return [realImage];
  } catch (error) {
    console.warn("Backend unavailable, falling back to mocks", error);
    // Import dynamically or just return empty/mock if backend fails? 
    // For now, let's return the mocks from the data file if the API fails, 
    // OR we can just return the static mocks for other components that don't have endpoints yet.
    const { dockerImages } = await import("@/data/mocks");
    return dockerImages;
  }
};

// Implement missing exports using mocks
export const fetchDashboardMetrics = async () => {
  return dashboardMetrics;
};

export const fetchRecentBuilds = async () => {
  return recentBuilds;
};

export const fetchTransactionData = async () => {
  return transactionData;
};

export const fetchCurrencyData = async () => {
  return currencyData;
};

export const fetchSchemaContract = async () => {
  return schemaContract;
};

export const validateDataPayload = async (payload: string) => {
  return validateData(payload);
};
