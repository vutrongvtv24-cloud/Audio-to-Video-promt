import React, { useState, useRef } from 'react';
import { Upload, FileAudio, AlertCircle } from 'lucide-react';
import { MAX_FILE_SIZE_MB, SUPPORTED_AUDIO_TYPES } from '../constants';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!SUPPORTED_AUDIO_TYPES.includes(file.type)) {
      setError(`Unsupported file type. Please upload: ${SUPPORTED_AUDIO_TYPES.map(t => t.split('/')[1]).join(', ')}`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer
        ${dragActive ? "border-cinematic-accent bg-cinematic-800/50 scale-[1.02]" : "border-cinematic-700 bg-cinematic-800/30 hover:border-cinematic-500"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!disabled ? onButtonClick : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={handleChange}
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className={`p-4 rounded-full mb-4 ${dragActive ? 'bg-cinematic-accent/20 text-cinematic-accent' : 'bg-cinematic-700/50 text-gray-400'}`}>
                {dragActive ? <FileAudio size={48} /> : <Upload size={48} />}
            </div>
          <p className="mb-2 text-lg font-semibold text-gray-200">
            {dragActive ? "Drop the audio here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-400">
            MP3, WAV, AAC, M4A (Max {MAX_FILE_SIZE_MB}MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center text-red-200 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioUploader;