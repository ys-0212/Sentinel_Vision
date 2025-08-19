'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface DetectionResultProps {
  result: {
    predictions: Array<{
      class: 'real' | 'fake';
      confidence: number;
    }>;
    metadata?: {
      processing_time?: number;
      model_version?: string;
    };
  };
  fileName: string;
  fileType: 'image' | 'video';
}

const DetectionResult: React.FC<DetectionResultProps> = ({
  result,
  fileName,
  fileType,
}) => {
  const primaryPrediction = result.predictions[0];
  const isReal = primaryPrediction.class === 'real';
  const confidence = primaryPrediction.confidence * 100;

  const getResultIcon = () => {
    if (isReal) {
      return <CheckCircle className="w-12 h-12 text-success-500" />;
    } else {
      return <AlertTriangle className="w-12 h-12 text-danger-500" />;
    }
  };

  const getResultTitle = () => {
    if (isReal) {
      return 'Authentic Content Detected';
    } else {
      return 'Deepfake Detected';
    }
  };

  const getResultDescription = () => {
    if (isReal) {
      return 'This content appears to be authentic and not manipulated by AI.';
    } else {
      return 'This content shows signs of AI manipulation and may be a deepfake.';
    }
  };

  const getConfidenceColor = () => {
    if (confidence >= 80) {
      return isReal ? 'success' : 'danger';
    } else if (confidence >= 60) {
      return 'warning';
    } else {
      return 'gray';
    }
  };

  const getConfidenceLabel = () => {
    if (confidence >= 90) return 'Very High';
    if (confidence >= 80) return 'High';
    if (confidence >= 70) return 'Moderate';
    if (confidence >= 60) return 'Low';
    return 'Very Low';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="result-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Shield className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Detection Complete
            </h2>
            <p className="text-sm text-gray-500">
              {fileType === 'image' ? 'Image' : 'Video'} Analysis Results
            </p>
          </div>
        </div>
        
        {result.metadata?.processing_time && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{result.metadata.processing_time.toFixed(2)}s</span>
          </div>
        )}
      </div>

      {/* Main Result */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getResultIcon()}
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 ${
          isReal ? 'text-success-600' : 'text-danger-600'
        }`}>
          {getResultTitle()}
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {getResultDescription()}
        </p>

        {/* Confidence Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Confidence Level
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {confidence.toFixed(1)}% ({getConfidenceLabel()})
            </span>
          </div>
          
          <div className="confidence-bar">
            <motion.div
              className={`confidence-fill ${getConfidenceColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 mb-3">Detailed Analysis</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="font-medium text-gray-900">Authentic Probability</span>
            </div>
            <div className="text-2xl font-bold text-success-600">
              {isReal ? confidence.toFixed(1) : (100 - confidence).toFixed(1)}%
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-danger-500" />
              <span className="font-medium text-gray-900">Deepfake Probability</span>
            </div>
            <div className="text-2xl font-bold text-danger-600">
              {isReal ? (100 - confidence).toFixed(1) : confidence.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* File Information */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Analyzed File</h5>
          <div className="text-sm text-blue-800">
            <p><strong>Name:</strong> {fileName}</p>
            <p><strong>Type:</strong> {fileType === 'image' ? 'Image' : 'Video'}</p>
            {result.metadata?.model_version && (
              <p><strong>Model Version:</strong> {result.metadata.model_version}</p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h5 className="font-medium text-yellow-900 mb-2">Recommendations</h5>
          <div className="text-sm text-yellow-800 space-y-1">
            {isReal ? (
              <>
                <p>• Content appears authentic based on AI analysis</p>
                <p>• Consider additional verification for critical decisions</p>
                <p>• Always use multiple sources for important information</p>
              </>
            ) : (
              <>
                <p>• Exercise caution with this content</p>
                <p>• Verify information through trusted sources</p>
                <p>• Consider reporting if content is misleading</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          This analysis is provided by AI technology and should be used as a reference only. 
          Always verify important information through multiple trusted sources.
        </p>
      </div>
    </motion.div>
  );
};

export default DetectionResult;
