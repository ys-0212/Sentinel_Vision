'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Video, File, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  isLoading = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileType = file.type;
      
      // Check if file is image or video
      if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'],
    },
    multiple: false,
    disabled: isLoading,
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    } else if (file.type.startsWith('video/')) {
      return <Video className="w-8 h-8 text-purple-500" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getFileType = (file: File) => {
    if (file.type.startsWith('image/')) {
      return 'Image';
    } else if (file.type.startsWith('video/')) {
      return 'Video';
    }
    return 'File';
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`upload-zone ${isDragActive || isDragOver ? 'dragover' : ''} ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary-100 rounded-full">
                <Upload className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {isDragActive ? 'Drop your file here' : 'Upload Image or Video'}
              </h3>
              <p className="text-gray-600">
                Drag and drop your file here, or click to browse
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Image className="w-4 h-4" />
                <span>Images (JPG, PNG, GIF)</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span>Videos (MP4, AVI, MOV)</span>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              Maximum file size: 100MB
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getFileIcon(selectedFile)}
              <div>
                <h3 className="font-medium text-gray-900">
                  {selectedFile.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {getFileType(selectedFile)} • {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <button
              onClick={onFileRemove}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedFile.type.startsWith('image/') && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}

          {selectedFile.type.startsWith('video/') && (
            <div className="mt-4">
              <video
                src={URL.createObjectURL(selectedFile)}
                controls
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
