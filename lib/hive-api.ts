import axios from 'axios';

export interface HiveApiConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface DeepfakeDetectionRequest {
  media: File;
  type: 'image' | 'video';
}

export interface DeepfakeDetectionResponse {
  status: 'success' | 'error';
  data?: {
    predictions: Array<{
      class: 'real' | 'fake';
      confidence: number;
    }>;
    metadata?: {
      processing_time?: number;
      model_version?: string;
    };
  };
  error?: string;
}

export class HiveApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: HiveApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.thehive.ai/api/v3';
  }

  private async makeRequest(endpoint: string, data: FormData): Promise<any> {
    try {
      // For Hive API V3, we need to use the correct authorization format
      const authHeader = this.apiKey.includes(':') 
        ? `Bearer ${this.apiKey}`
        : `Bearer ${this.apiKey}`;
        
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        throw new Error(`API Error: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to Hive API');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  }

  async detectDeepfake(request: DeepfakeDetectionRequest): Promise<DeepfakeDetectionResponse> {
    const formData = new FormData();
    formData.append('media', request.media);
    
    // Use the correct model name for Hive API
    formData.append('model', 'deepfake-detection');
    
    // Add additional parameters for better results
    formData.append('confidence_threshold', '0.5');
    formData.append('return_metadata', 'true');

    try {
      console.log('Making API request to:', `${this.baseUrl}/sync`);
      console.log('FormData contents:', Array.from(formData.entries()));
      
      const response = await this.makeRequest('/sync', formData);
      
      // Parse the response based on Hive API V3 format
      if (response.status === 'success' && response.results) {
        const predictions = response.results.map((result: any) => ({
          class: result.class as 'real' | 'fake',
          confidence: result.confidence || 0,
        }));

        return {
          status: 'success',
          data: {
            predictions,
            metadata: {
              processing_time: response.processing_time,
              model_version: response.model_version,
            },
          },
        };
      } else {
        throw new Error('Invalid response format from Hive API');
      }
    } catch (error: any) {
      return {
        status: 'error',
        error: error.message,
      };
    }
  }

  async detectDeepfakeAsync(request: DeepfakeDetectionRequest): Promise<{ taskId: string }> {
    const formData = new FormData();
    formData.append('media', request.media);
    formData.append('model', 'deepfake-detection');
    formData.append('confidence_threshold', '0.5');
    formData.append('return_metadata', 'true');

    try {
      const response = await this.makeRequest('/async', formData);
      
      if (response.status === 'success' && response.task_id) {
        return { taskId: response.task_id };
      } else {
        throw new Error('Invalid async response format from Hive API');
      }
    } catch (error: any) {
      throw new Error(`Async detection failed: ${error.message}`);
    }
  }

  async getTaskStatus(taskId: string): Promise<DeepfakeDetectionResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/task/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        timeout: 10000,
      });

      const data = response.data;

      if (data.status === 'completed' && data.results) {
        const predictions = data.results.map((result: any) => ({
          class: result.class as 'real' | 'fake',
          confidence: result.confidence || 0,
        }));

        return {
          status: 'success',
          data: {
            predictions,
            metadata: {
              processing_time: data.processing_time,
              model_version: data.model_version,
            },
          },
        };
      } else if (data.status === 'processing') {
        return {
          status: 'error',
          error: 'Task is still processing',
        };
      } else if (data.status === 'failed') {
        return {
          status: 'error',
          error: data.error || 'Task failed',
        };
      } else {
        throw new Error('Unknown task status');
      }
    } catch (error: any) {
      return {
        status: 'error',
        error: error.message,
      };
    }
  }
}

// Create a singleton instance
let hiveApiInstance: HiveApiService | null = null;

export function getHiveApiService(apiKey?: string): HiveApiService {
  if (!hiveApiInstance) {
    if (!apiKey) {
      throw new Error('Hive API key is required');
    }
    hiveApiInstance = new HiveApiService({ apiKey });
  }
  return hiveApiInstance;
}
