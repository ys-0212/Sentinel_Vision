import axios from 'axios';

export interface DeepAIConfig {
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

export class DeepAIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: DeepAIConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.deepai.org/api';
  }

  private async makeRequest(endpoint: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        throw new Error(`API Error: ${error.response.data?.err || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to connect to DeepAI API');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  }

  async detectDeepfake(request: DeepfakeDetectionRequest): Promise<DeepfakeDetectionResponse> {
    const formData = new FormData();
    formData.append('image', request.media);
    
    // Use DeepAI's deepfake detection model
    formData.append('model', 'deepfake-detection');

    try {
      console.log('Making API request to:', `${this.baseUrl}/deepfake-detection`);
      console.log('FormData contents:', Array.from(formData.entries()));
      
      const response = await this.makeRequest('/deepfake-detection', formData);
      
      console.log('DeepAI Response:', response);
      
      // Parse the response based on DeepAI format
      if (response && response.output) {
        // DeepAI returns a score between 0-1 where higher means more likely to be fake
        const fakeScore = response.output.fake_score || 0;
        const realScore = 1 - fakeScore;
        
        const predictions = [
          {
            class: 'real' as const,
            confidence: realScore,
          },
          {
            class: 'fake' as const,
            confidence: fakeScore,
          },
        ];

        return {
          status: 'success',
          data: {
            predictions,
            metadata: {
              processing_time: response.processing_time,
              model_version: 'deepfake-detection-v1',
            },
          },
        };
      } else {
        throw new Error('Invalid response format from DeepAI API');
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
let deepAIInstance: DeepAIService | null = null;

export function getDeepAIService(apiKey?: string): DeepAIService {
  if (!deepAIInstance) {
    if (!apiKey) {
      throw new Error('DeepAI API key is required');
    }
    deepAIInstance = new DeepAIService({ apiKey });
  }
  return deepAIInstance;
}
