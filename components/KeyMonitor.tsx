
import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, BatteryWarning, CheckCircle2, Clock, Zap, Cpu, AlertTriangle, AlertOctagon, RefreshCw } from 'lucide-react';
import { SystemMetrics, subscribeToKeyStatus, checkAllKeysHealth } from '../services/geminiService';
import { TEXTS } from '../constants';

interface KeyMonitorProps {
  language: 'en' | 'vi';
}

const KeyMonitor: React.FC<KeyMonitorProps> = ({ language }) => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const t = TEXTS[language];

  useEffect(() => {
    // Subscribe to the global key status in geminiService
    const unsubscribe = subscribeToKeyStatus((newMetrics) => {
      setMetrics(newMetrics);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckHealth = async () => {
    if (isChecking) return;
    setIsChecking(true);
    await checkAllKeysHealth();
    setIsChecking(false);
  };

  if (!metrics || metrics.keyStates.length === 0) return null;

  const { keyStates, successCount, errorCount, avgLatency } = metrics;
  const activeCount = keyStates.filter(k => k.status === 'active' || k.status === 'idle').length;
  const exhaustedCount = keyStates.filter(k => k.status === 'exhausted').length;
  const leakedCount = keyStates.filter(k => k.status === 'leaked').length;
  const totalKeys = keyStates.length;

  // Determine Health State
  let healthState: 'operational' | 'degraded' | 'critical' = 'operational';
  if (exhaustedCount > 0 || leakedCount > 0) {
      if (activeCount === 0) {
          healthState = 'critical';
      } else {
          healthState = 'degraded';
      }
  }

  // Styling based on health
  const getBorderColor = () => {
      if (healthState === 'critical') return 'border-red-500 shadow-red-900/50';
      if (healthState === 'degraded') return 'border-yellow-500 shadow-yellow-900/50';
      return 'border-cinematic-700 shadow-black/50';
  }

  const getStatusText = () => {
      if (healthState === 'critical') return t.healthCritical;
      if (healthState === 'degraded') return t.healthDegraded;
      return t.healthOperational;
  }

  const getStatusMessage = () => {
      if (healthState === 'critical') return t.statusMessageCritical;
      if (healthState === 'degraded') return t.statusMessageDegraded;
      return t.statusMessageNormal;
  }

  const getStatusColor = () => {
      if (healthState === 'critical') return 'text-red-500';
      if (healthState === 'degraded') return 'text-yellow-400';
      return 'text-green-400';
  }

  return (
    <div className="fixed bottom-4 left-6 z-40 hidden md:block animate-fadeIn">
      <div className={`bg-cinematic-900/95 backdrop-blur-md border rounded-xl p-4 shadow-2xl transition-all duration-500 min-w-[320px] max-w-[360px] ${getBorderColor()}`}>
        
        {/* Header with Dynamic Status & Check Button */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-cinematic-800">
            <div className="flex items-center space-x-2 text-left">
                {healthState === 'operational' && <Activity className="w-5 h-5 text-green-500" />}
                {healthState === 'degraded' && <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse" />}
                {healthState === 'critical' && <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />}
                
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{t.systemStatus}</span>
                    <span className={`text-sm font-bold leading-none ${getStatusColor()}`}>{getStatusText()}</span>
                </div>
            </div>
            
            <button 
                onClick={handleCheckHealth}
                disabled={isChecking}
                className="group flex items-center px-2 py-1.5 bg-cinematic-800 hover:bg-cinematic-700 disabled:opacity-50 rounded transition-all border border-cinematic-700"
                title={t.checkHealth}
            >
                <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isChecking ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span className="text-[10px] ml-1.5 text-gray-300 font-medium">{isChecking ? t.checking : t.checkHealth}</span>
            </button>
        </div>

        {/* Detailed Status Message Logic */}
        {healthState !== 'operational' && (
            <div className={`mb-3 p-2 rounded text-[11px] leading-snug border ${healthState === 'critical' ? 'bg-red-900/20 border-red-800 text-red-200' : 'bg-yellow-900/20 border-yellow-800 text-yellow-200'}`}>
                {getStatusMessage()}
            </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
            {/* Keys Active */}
            <div className="flex justify-between items-center text-xs text-gray-400 bg-cinematic-800/50 p-2 rounded">
                <div className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-green-500" /> {t.keysActive}</div>
                <span className="text-white font-mono font-bold">{activeCount}/{totalKeys}</span>
            </div>

            {/* Quota Exceeded */}
            <div className="flex justify-between items-center text-xs text-gray-400 bg-cinematic-800/50 p-2 rounded">
                <div className="flex items-center"><BatteryWarning className={`w-3 h-3 mr-1.5 ${exhaustedCount > 0 ? 'text-yellow-500' : 'text-gray-600'}`} /> {t.keysExhausted}</div>
                <span className={`${exhaustedCount > 0 ? 'text-yellow-400 font-bold' : 'text-gray-500 font-mono'}`}>{exhaustedCount}</span>
            </div>

            {/* Session Usage */}
            <div className="flex justify-between items-center text-xs text-gray-400 bg-cinematic-800/50 p-2 rounded">
                <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-cinematic-accent mr-2"></span> {t.sessionUsage}
                </div>
                <span className="text-white font-mono">{successCount}</span>
            </div>

            {/* Latency */}
            <div className="flex justify-between items-center text-xs text-gray-400 bg-cinematic-800/50 p-2 rounded">
                <div className="flex items-center"><Clock className="w-3 h-3 mr-1.5 text-blue-400" /> {t.avgLatency}</div>
                <span className="text-white font-mono">{avgLatency}ms</span>
            </div>

            {/* Leaked Warning - Full Width */}
            {leakedCount > 0 && (
                <div className="flex items-center justify-center text-[11px] text-red-200 bg-red-900/40 p-2 rounded col-span-2 font-bold border border-red-500/30">
                    <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                    <span>{t.keysLeaked}: {leakedCount} (Revoked)</span>
                </div>
            )}
        </div>

        {/* Visual Dots & Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-cinematic-800">
            <div className="flex space-x-1.5">
                {keyStates.map((k) => {
                    let colorClass = "bg-gray-600"; // idle
                    let title = "Idle";
                    if (k.status === 'active') { colorClass = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"; title="Active"; }
                    if (k.status === 'exhausted') { colorClass = "bg-yellow-500 animate-pulse"; title="Quota Exceeded (Busy/429)"; }
                    if (k.status === 'leaked') { colorClass = "bg-red-500 animate-pulse"; title="Leaked/Invalid/Revoked"; }

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
