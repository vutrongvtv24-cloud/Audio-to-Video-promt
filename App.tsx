import React, { useState } from 'react';
import { Video, Wand2, RefreshCw, Globe } from 'lucide-react';
import AudioUploader from './components/AudioUploader';
import LoadingState from './components/LoadingState';
import ResultDisplay from './components/ResultDisplay';
import StyleSelector from './components/StyleSelector';
import { analyzeAudio } from './services/geminiService';
import { VIDEO_STYLES, TEXTS } from './constants';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(VIDEO_STYLES[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const t = TEXTS[language];

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
    handleAnalyze(file, selectedStyleId);
  };

  const handleAnalyze = async (file: File, styleId: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const styleObj = VIDEO_STYLES.find(s => s.id === styleId);
      const styleModifier = styleObj ? styleObj.prompt_modifier : VIDEO_STYLES[0].prompt_modifier;

      const analysisResult = await analyzeAudio(file, styleModifier, language);
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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
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
              <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">{t.appTitle}</h1>
              <h1 className="text-xl font-bold tracking-tight text-white sm:hidden">AI Video Director</h1>
              <p className="text-xs text-indigo-400 font-mono tracking-wider">{t.role}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             {/* Language Switcher */}
            <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-cinematic-800 border border-cinematic-700 hover:border-cinematic-500 transition-colors text-sm font-medium"
            >
                <Globe className="w-4 h-4 text-gray-400" />
                <span className={language === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
                <span className="text-gray-600">|</span>
                <span className={language === 'vi' ? 'text-white' : 'text-gray-500'}>VI</span>
            </button>

            {audioFile && !isAnalyzing && (
                <button 
                    onClick={handleReset}
                    className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.newProject}</span>
                </button>
            )}
          </div>
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
                    {t.heroTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{t.heroTitleSuffix}</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    {t.heroDesc}
                </p>
            </div>
        )}

        <div className="flex flex-col items-center">
            
            {/* Style Selector & Upload Section */}
            {(!audioFile || error) && (
                <>
                    <StyleSelector 
                        selectedStyleId={selectedStyleId} 
                        onSelect={setSelectedStyleId} 
                        disabled={isAnalyzing}
                        language={language}
                    />
                    <AudioUploader 
                        onFileSelect={handleFileSelect} 
                        disabled={isAnalyzing} 
                        language={language}
                    />
                </>
            )}

            {/* Error Message */}
            {error && (
                <div className="w-full max-w-2xl mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-center">
                    <p className="font-semibold">{t.analysisFailed}</p>
                    <p className="text-sm opacity-80">{error}</p>
                    <button 
                        onClick={() => handleReset()}
                        className="mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 rounded text-sm transition-colors"
                    >
                        {t.tryAgain}
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isAnalyzing && <LoadingState language={language} />}

            {/* Result Display */}
            {result && !isAnalyzing && (
                <ResultDisplay content={result} language={language} />
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cinematic-800 bg-cinematic-900 py-8 mt-auto">
        <div className="container mx-auto px-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
                {t.footerPowered}
            </p>
            <p className="text-xs text-gray-600">
                {t.author}: <span className="text-gray-400 font-medium">Vũ Trọng</span> • {t.zalo}: <span className="text-gray-400 font-medium">0835.242.357</span>
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;