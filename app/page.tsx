'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Settings, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/FileUpload';
import DetectionResult from '@/components/DetectionResult';
import LoadingSpinner from '@/components/LoadingSpinner';

interface DetectionState {
  isLoading: boolean;
  result: any;
  fileName: string;
  fileType: 'image' | 'video';
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [detectionState, setDetectionState] = useState<DetectionState>({
    isLoading: false,
    result: null,
    fileName: '',
    fileType: 'image',
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setDetectionState(prev => ({
      ...prev,
      result: null,
      fileName: file.name,
      fileType: file.type.startsWith('image/') ? 'image' : 'video',
    }));
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setDetectionState(prev => ({
      ...prev,
      result: null,
      fileName: '',
    }));
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDetection = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    if (!apiKey.trim()) {
      toast.error('Please enter your Hive API key');
      setShowApiKeyInput(true);
      return;
    }

    setDetectionState(prev => ({ ...prev, isLoading: true }));

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('apiKey', apiKey);

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Detection failed');
      }

      if (data.success) {
        setDetectionState(prev => ({
          ...prev,
          isLoading: false,
          result: data.result,
          fileName: data.fileName,
          fileType: data.fileType,
        }));
        toast.success('Detection completed successfully!');
      } else {
        throw new Error(data.error || 'Detection failed');
      }
    } catch (error: any) {
      console.error('Detection error:', error);
      setDetectionState(prev => ({ ...prev, isLoading: false }));
      toast.error(error.message || 'An error occurred during detection');
    }
  };

  const resetDetection = () => {
    setSelectedFile(null);
    setDetectionState({
      isLoading: false,
      result: null,
      fileName: '',
      fileType: 'image',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Deepfake Detection
                </h1>
                <p className="text-sm text-gray-600">
                  AI-powered content authenticity verification
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* API Key Input */}
          {showApiKeyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Hive API Configuration
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    placeholder="Enter your Hive API key"
                    className="input-field"
                  />
                </div>
                
                <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">How to use your API key:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Use your <strong>Secret Key</strong> (not Access Key ID)</li>
                      <li>Format: <code>HZsGJnppnXsyN3Wr:qdFEu+mrwxs+e+dkjhcEIA==</code></li>
                      <li>Or just use the Secret Key: <code>qdFEu+mrwxs+e+dkjhcEIA==</code></li>
                      <li>Make sure you're using V3 API keys</li>
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* File Upload Section */}
          {!detectionState.result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <Brain className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Detect Deepfakes
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Upload an image or video to analyze it for AI-generated content using advanced deepfake detection technology.
                </p>
              </div>

              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                isLoading={detectionState.isLoading}
              />

              {selectedFile && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleDetection}
                    disabled={detectionState.isLoading || !apiKey.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {detectionState.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Start Detection</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Loading State */}
          {detectionState.isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
            >
              <LoadingSpinner
                message="Analyzing your content for deepfake detection..."
                isAnalyzing={true}
              />
            </motion.div>
          )}

          {/* Results Section */}
          {detectionState.result && !detectionState.isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <DetectionResult
                result={detectionState.result}
                fileName={detectionState.fileName}
                fileType={detectionState.fileType}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={resetDetection}
                  className="btn-secondary"
                >
                  Analyze Another File
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Powered by Hive AI • Advanced deepfake detection technology
            </p>
            <p className="text-xs mt-2 text-gray-500">
              This tool uses AI to analyze content authenticity. Results should be used as a reference only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
