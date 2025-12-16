import React, { useState } from 'react';
import { Copy, Check, Download, Film, Palette, FileText } from 'lucide-react';
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

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-director-prompts.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPrompts = () => {
    const prompts = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.toLowerCase().includes('prompt'))
      .map(line => {
        let clean = line.replace(/\*\*/g, ''); 
        clean = clean.replace(/^-/, ''); 
        return clean.trim();
      })
      .filter(line => line.toLowerCase().startsWith('prompt'));

    if (prompts.length === 0) {
       alert("No prompts found to export.");
       return;
    }

    const textContent = prompts.join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompts_only.txt';
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
      if (line.includes('**Master Visual Style Description:**') || line.includes('**Selected Visual Style:**')) {
         return (
             <div key={index} className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-lg my-4">
                 <div className="flex items-center mb-2 text-indigo-400 font-bold uppercase text-xs tracking-wider">
                     <Palette className="w-4 h-4 mr-2" /> consistency lock
                 </div>
                 <p className="text-indigo-100 font-medium leading-relaxed whitespace-pre-wrap">{line.replace(/\*\*/g, '')}</p>
             </div>
         )
      }
      if (line.includes('Timestamp:') || line.includes('Segment')) {
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
                onClick={handleDownloadPrompts}
                className="flex items-center px-4 py-2 text-sm font-medium text-cinematic-accent bg-cinematic-800 border border-cinematic-700 rounded-lg hover:bg-cinematic-700 hover:border-cinematic-500 transition-all shadow-sm"
            >
                <FileText className="w-4 h-4 mr-2" />
                {t.exportTxt}
            </button>
            <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 text-sm font-medium text-cinematic-accent bg-cinematic-800 border border-cinematic-700 rounded-lg hover:bg-cinematic-700 hover:border-cinematic-500 transition-all shadow-sm"
            >
                <Download className="w-4 h-4 mr-2" />
                {t.downloadMd}
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