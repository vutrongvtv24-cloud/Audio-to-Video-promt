import React from 'react';
import { Loader2, Mic, Clapperboard, Sparkles } from 'lucide-react';
import { TEXTS } from '../constants';

interface LoadingStateProps {
    language: 'en' | 'vi';
}

const LoadingState: React.FC<LoadingStateProps> = ({ language }) => {
  const t = TEXTS[language];
  
  return (
    <div className="w-full max-w-2xl mx-auto my-12 text-center">
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-cinematic-accent/20 rounded-full animate-ping"></div>
        <div className="relative bg-cinematic-800 p-6 rounded-full border border-cinematic-accent/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
           <Loader2 className="w-10 h-10 text-cinematic-accent animate-spin" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">{t.analyzing}</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        {t.analyzingDesc}
      </p>

      <div className="flex justify-center space-x-8 sm:space-x-12 text-sm font-medium text-gray-500">
        <div className="flex flex-col items-center animate-pulse" style={{ animationDelay: '0s' }}>
            <Mic className="w-6 h-6 mb-2 text-blue-400" />
            <span>{t.step1}</span>
        </div>
        <div className="flex flex-col items-center animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-6 h-6 mb-2 text-purple-400" />
            <span>{t.step2}</span>
        </div>
        <div className="flex flex-col items-center animate-pulse" style={{ animationDelay: '1s' }}>
            <Clapperboard className="w-6 h-6 mb-2 text-yellow-400" />
            <span>{t.step3}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;