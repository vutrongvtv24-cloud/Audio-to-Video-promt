
import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, BatteryWarning, CheckCircle2, Circle } from 'lucide-react';
import { KeyStatusType, subscribeToKeyStatus } from '../services/geminiService';
import { TEXTS } from '../constants';

interface KeyMonitorProps {
  language: 'en' | 'vi';
}

interface KeyState {
  index: number;
  status: KeyStatusType;
}

const KeyMonitor: React.FC<KeyMonitorProps> = ({ language }) => {
  const [keyStates, setKeyStates] = useState<KeyState[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const t = TEXTS[language];

  useEffect(() => {
    // Subscribe to the global key status in geminiService
    const unsubscribe = subscribeToKeyStatus((states, count) => {
      setKeyStates(states);
      setSuccessCount(count);
    });
    return () => unsubscribe();
  }, []);

  if (keyStates.length === 0) return null;

  const activeCount = keyStates.filter(k => k.status === 'active' || k.status === 'idle').length;
  const exhaustedCount = keyStates.filter(k => k.status === 'exhausted').length;
  const leakedCount = keyStates.filter(k => k.status === 'leaked').length;

  return (
    <div className="fixed bottom-4 left-6 z-40 hidden md:block animate-fadeIn">
      <div className="bg-cinematic-900/90 backdrop-blur-md border border-cinematic-700 rounded-lg p-3 shadow-2xl shadow-black/50 hover:border-cinematic-500 transition-colors group">
        
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-cinematic-800">
            <Activity className="w-4 h-4 text-cinematic-accent" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.systemStatus}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3">
            <div className="flex items-center text-xs text-gray-400">
                <CheckCircle2 className="w-3 h-3 mr-1.5 text-green-500" />
                <span>{t.keysActive}: <span className="text-white font-mono">{activeCount}</span></span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
                <BatteryWarning className="w-3 h-3 mr-1.5 text-yellow-500" />
                <span>{t.keysExhausted}: <span className="text-white font-mono">{exhaustedCount}</span></span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
                <div className="w-3 h-3 mr-1.5 flex items-center justify-center">
                   <span className="block w-2 h-2 rounded-full bg-cinematic-accent"></span>
                </div>
                 <span>{t.sessionUsage}: <span className="text-white font-mono">{successCount}</span></span>
            </div>
            {leakedCount > 0 && (
                <div className="flex items-center text-xs text-red-400 font-bold">
                    <ShieldAlert className="w-3 h-3 mr-1.5" />
                    <span>{t.keysLeaked}: {leakedCount}</span>
                </div>
            )}
        </div>

        {/* Visual Dots */}
        <div className="flex items-center space-x-1.5 bg-black/20 p-1.5 rounded">
            {keyStates.map((k) => {
                let colorClass = "bg-gray-600"; // idle
                let title = "Idle";
                if (k.status === 'active') { colorClass = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"; title="Active"; }
                if (k.status === 'exhausted') { colorClass = "bg-yellow-500"; title="Quota Exceeded (429)"; }
                if (k.status === 'leaked') { colorClass = "bg-red-500 animate-pulse"; title="Leaked/Invalid"; }

                return (
                    <div 
                        key={k.index} 
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${colorClass}`}
                        title={`Key #${k.index + 1}: ${title}`}
                    />
                )
            })}
             <span className="text-[10px] text-gray-500 ml-2 italic hidden group-hover:inline-block transition-all">
                {t.monitoring}
            </span>
        </div>
      </div>
    </div>
  );
};

export default KeyMonitor;
