
import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, BatteryWarning, CheckCircle2, Clock, Zap, Cpu } from 'lucide-react';
import { SystemMetrics, subscribeToKeyStatus } from '../services/geminiService';
import { TEXTS } from '../constants';

interface KeyMonitorProps {
  language: 'en' | 'vi';
}

const KeyMonitor: React.FC<KeyMonitorProps> = ({ language }) => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const t = TEXTS[language];

  useEffect(() => {
    // Subscribe to the global key status in geminiService
    const unsubscribe = subscribeToKeyStatus((newMetrics) => {
      setMetrics(newMetrics);
    });
    return () => unsubscribe();
  }, []);

  if (!metrics || metrics.keyStates.length === 0) return null;

  const { keyStates, successCount, errorCount, avgLatency } = metrics;
  const activeCount = keyStates.filter(k => k.status === 'active' || k.status === 'idle').length;
  const exhaustedCount = keyStates.filter(k => k.status === 'exhausted').length;
  const leakedCount = keyStates.filter(k => k.status === 'leaked').length;

  return (
    <div className="fixed bottom-4 left-6 z-40 hidden md:block animate-fadeIn">
      <div className="bg-cinematic-900/90 backdrop-blur-md border border-cinematic-700 rounded-lg p-3 shadow-2xl shadow-black/50 hover:border-cinematic-500 transition-colors group min-w-[280px]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-cinematic-800">
            <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cinematic-accent" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.systemStatus}</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-gray-500">
                <Cpu className="w-3 h-3" />
                <span>2.5 Flash</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
            {/* Keys Active */}
            <div className="flex items-center text-xs text-gray-400" title={t.keysActive}>
                <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500" />
                <span>{t.keysActive}: <span className="text-white font-mono">{activeCount}</span></span>
            </div>

            {/* Quota Exceeded */}
            <div className="flex items-center text-xs text-gray-400" title={t.keysExhausted}>
                <BatteryWarning className={`w-3.5 h-3.5 mr-2 ${exhaustedCount > 0 ? 'text-yellow-500' : 'text-gray-600'}`} />
                <span>{t.keysExhausted}: <span className={`${exhaustedCount > 0 ? 'text-yellow-400' : 'text-gray-500'} font-mono`}>{exhaustedCount}</span></span>
            </div>

            {/* Session Usage */}
            <div className="flex items-center text-xs text-gray-400" title={t.sessionUsage}>
                <div className="w-3.5 h-3.5 mr-2 flex items-center justify-center">
                   <span className="block w-2 h-2 rounded-full bg-cinematic-accent"></span>
                </div>
                 <span>{t.sessionUsage}: <span className="text-white font-mono">{successCount}</span></span>
            </div>

            {/* Latency */}
            <div className="flex items-center text-xs text-gray-400" title={t.avgLatency}>
                <Clock className="w-3.5 h-3.5 mr-2 text-blue-400" />
                <span>Latency: <span className="text-white font-mono">{avgLatency}ms</span></span>
            </div>

            {/* Total Errors */}
            {errorCount > 0 && (
                 <div className="flex items-center text-xs text-gray-400" title={t.totalErrors}>
                    <Zap className="w-3.5 h-3.5 mr-2 text-red-400" />
                    <span>Errors: <span className="text-red-300 font-mono">{errorCount}</span></span>
                </div>
            )}

            {/* Leaked */}
            {leakedCount > 0 && (
                <div className="flex items-center text-xs text-red-400 font-bold col-span-2">
                    <ShieldAlert className="w-3.5 h-3.5 mr-2" />
                    <span>{t.keysLeaked}: {leakedCount}</span>
                </div>
            )}
        </div>

        {/* Visual Dots */}
        <div className="flex items-center space-x-1.5 bg-black/20 p-1.5 rounded justify-between">
            <div className="flex space-x-1.5">
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
            </div>
             <span className="text-[10px] text-gray-600 italic">
                {t.monitoring}
            </span>
        </div>
      </div>
    </div>
  );
};

export default KeyMonitor;
