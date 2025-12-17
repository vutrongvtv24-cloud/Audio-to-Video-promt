
import React, { useState } from 'react';
import { Copy, Check, FileText, Film, Palette, Clock } from 'lucide-react';
import { TEXTS } from '../constants';

interface ResultDisplayProps {
  content: string;
  language: 'en' | 'vi';
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, language }) => {
  const [copied, setCopied] = useState(false);
  const t = TEXTS[language];

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Export only the raw prompt strings
   */
  const handleDownloadCleanPrompts = () => {
    const lines = content.split('\n').map(l => l.trim());
    const prompts = lines
      .filter(line => line.toLowerCase().includes('prompt'))
      .map(line => {
        let clean = line.replace(/\*\*/g, ''); 
        clean = clean.replace(/^-/, ''); 
        return clean.trim();
      })
      .filter(line => line.toLowerCase().startsWith('prompt'));

    if (prompts.length === 0) {
       alert(language === 'vi' ? "Không tìm thấy prompt để xuất." : "No prompts found to export.");
       return;
    }

    const textContent = prompts.join('\n\n');
    downloadFile(textContent, 'prompts_clean.txt');
  };

  /**
   * Export Prompts along with their corresponding Scene Header and Timestamps
   */
  const handleDownloadDetailedPrompts = () => {
    const lines = content.split('\n').map(l => l.trim());
    let detailedContent = "";
    let currentSceneHeader = "";
    let currentTimeInfo = "";

    lines.forEach(line => {
      // Catch Scene Headers
      if (line.startsWith('## ') && (line.toLowerCase().includes('scene') || line.toLowerCase().includes('shot'))) {
        currentSceneHeader = line.replace(/#/g, '').trim();
      }
      // Catch Time/Timestamp lines
      if (line.toLowerCase().includes('time:') || line.toLowerCase().includes('thời gian:') || /\[\d{2}:\d{2}\s*-\s*\d{2}:\d{2}\]/.test(line)) {
        currentTimeInfo = line.replace(/\*\*/g, '').trim();
      }
      // Catch Prompts
      if (line.toLowerCase().includes('prompt #')) {
        let cleanPrompt = line.replace(/\*\*/g, '').replace(/^-/, '').trim();
        
        if (currentSceneHeader) {
          detailedContent += `${currentSceneHeader}\n`;
        }
        if (currentTimeInfo) {
          detailedContent += `${currentTimeInfo}\n`;
        }
        detailedContent += `${cleanPrompt}\n\n`;
        
        // Reset buffers for next block
        currentSceneHeader = "";
        currentTimeInfo = "";
      }
    });

    if (!detailedContent.trim()) {
       // Fallback to full content if special parsing fails
       detailedContent = content.replace(/\*\*/g, '').replace(/#/g, '');
    }

    downloadFile(detailedContent, 'prompts_detailed_with_time.txt');
  };

  const downloadFile = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderFormattedContent = () => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-cinematic-accent mt-6 mb-4 pb-2 border-b border-cinematic-700">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-white mt-8 mb-3 flex items-center"><Film className="w-5 h-5 mr-2 text-yellow-500"/>{line.replace('## ', '')}</h2>;
      }
      if (line.includes('**Master Visual Style Description:**') || line.includes('**Selected Visual Style:**') || line.includes('**Consistent Character:**') || line.includes('**Consistent Setting:**')) {
         return (
             <div key={index} className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-lg my-4">
                 <div className="flex items-center mb-2 text-indigo-400 font-bold uppercase text-xs tracking-wider">
                     <Palette className="w-4 h-4 mr-2" /> consistency lock
                 </div>
                 <p className="text-indigo-100 font-medium leading-relaxed whitespace-pre-wrap">{line.replace(/\*\*/g, '')}</p>
             </div>
         )
      }
      if (line.toLowerCase().includes('time:') || line.toLowerCase().includes('thời gian:') || line.includes('[00:')) {
          return <div key={index} className="text-yellow-400 font-mono mt-4 mb-1">{line}</div>
      }
      if (line.trim().startsWith('- **Prompt')) {
          const parts = line.split('**');
          return (
            <div key={index} className="ml-4 mb-3 p-3 bg-cinematic-800 rounded border border-cinematic-700 hover:border-cinematic-500 transition-colors">
                <span className="text-green-400 font-bold">{parts[1]}</span>
                <span className="text-gray-300">{parts[2]}</span>
            </div>
          );
      }
      if (line.startsWith('**')) {
          return <div key={index} className="font-semibold text-gray-200 mt-2">{line.replace(/\*\*/g, '')}</div>
      }
      
      return <div key={index} className="text-gray-400 min-h-[1rem] whitespace-pre-wrap">{line}</div>;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h2 className="text-xl font-semibold text-white">{t.resultTitle}</h2>
        <div className="flex flex-wrap gap-2 justify-center">
            <button
                onClick={handleDownloadCleanPrompts}
                className="flex items-center px-4 py-2 text-sm font-medium text-cinematic-accent bg-cinematic-800 border border-cinematic-700 rounded-lg hover:bg-cinematic-700 hover:border-cinematic-500 transition-all shadow-sm group"
                title="Download only prompt text"
            >
                <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {t.exportCleanTxt}
            </button>
            <button
                onClick={handleDownloadDetailedPrompts}
                className="flex items-center px-4 py-2 text-sm font-medium text-cinematic-accent bg-cinematic-800 border border-cinematic-700 rounded-lg hover:bg-cinematic-700 hover:border-cinematic-500 transition-all shadow-sm group"
                title="Download prompts with timestamps and scene info"
            >
                <Clock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform text-yellow-500" />
                {t.exportDetailedTxt}
            </button>
            <button
                onClick={handleCopy}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm ${
                copied
                    ? "bg-green-600 text-white border border-green-500"
                    : "bg-cinematic-accent text-white hover:bg-indigo-600 border border-indigo-500"
                }`}
            >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? t.copied : t.copy}
            </button>
        </div>
      </div>

      <div className="bg-cinematic-900 border border-cinematic-700 rounded-xl p-6 shadow-2xl overflow-hidden">
        <div className="prose prose-invert max-w-none font-sans">
            {renderFormattedContent()}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
