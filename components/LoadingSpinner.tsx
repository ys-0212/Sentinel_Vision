'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  isAnalyzing?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Processing...',
  isAnalyzing = false 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative w-16 h-16 mb-6"
      >
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
        <motion.div
          className="absolute inset-0 border-4 border-primary-600 rounded-full"
          style={{ borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {isAnalyzing ? (
            <Brain className="w-6 h-6 text-primary-600" />
          ) : (
            <Shield className="w-6 h-6 text-primary-600" />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isAnalyzing ? 'Analyzing Content' : 'Processing Request'}
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        
        {isAnalyzing && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 animate-pulse" />
            <span>AI-powered deepfake detection in progress...</span>
          </div>
        )}
      </motion.div>

      {/* Progress dots */}
      <div className="flex space-x-1 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
