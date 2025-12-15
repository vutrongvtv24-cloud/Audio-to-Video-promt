import React, { useState } from 'react';
import { Video, Wand2, RefreshCw } from 'lucide-react';
import AudioUploader from './components/AudioUploader';
import LoadingState from './components/LoadingState';
import ResultDisplay from './components/ResultDisplay';
import { analyzeAudio } from './services/geminiService';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
    handleAnalyze(file);
  };

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeAudio(file);
      setResult(analysisResult);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAudioFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-cinematic-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-cinematic-800 bg-cinematic-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg shadow-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Audio to Video Prompts</h1>
              <p className="text-xs text-indigo-400 font-mono tracking-wider">PROMPT ENGINEER AGENT</p>
            </div>
          </div>
          {audioFile && !isAnalyzing && (
            <button 
                onClick={handleReset}
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Project
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {!audioFile && !isAnalyzing && !result && (
            <div className="text-center mb-12 animate-fadeIn">
                <div className="inline-block p-4 rounded-full bg-cinematic-800 mb-6">
                    <Wand2 className="w-12 h-12 text-cinematic-accent" />
                </div>
                <h2 className="text-4xl font-extrabold text-white mb-4">
                    Turn Audio into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Cinematic Stories</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    Upload a voiceover, podcast clip, or story narration. The AI Director will analyze the context, establish a consistent visual style, and generate precise video generation prompts for you.
                </p>
            </div>
        )}

        <div className="flex flex-col items-center">
            {/* Upload Section - Hidden when result is shown to keep UI clean, or shown if no file yet */}
            {(!audioFile || error) && (
                 <AudioUploader onFileSelect={handleFileSelect} disabled={isAnalyzing} />
            )}

            {/* Error Message */}
            {error && (
                <div className="w-full max-w-2xl mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-center">
                    <p className="font-semibold">Analysis Failed</p>
                    <p className="text-sm opacity-80">{error}</p>
                    <button 
                        onClick={() => handleReset()}
                        className="mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 rounded text-sm transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isAnalyzing && <LoadingState />}

            {/* Result Display */}
            {result && !isAnalyzing && (
                <ResultDisplay content={result} />
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cinematic-800 bg-cinematic-900 py-8 mt-auto">
        <div className="container mx-auto px-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
                Powered by Gemini 2.5 Flash • Optimized for Video Generation Models
            </p>
            <p className="text-xs text-gray-600">
                Author: <span className="text-gray-400 font-medium">Vũ Trọng</span> • Zalo: <span className="text-gray-400 font-medium">0835.242.357</span>
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;