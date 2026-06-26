import React, { useEffect, useState } from 'react';
import { BrainCircuit, AlertTriangle, Hammer, ShieldAlert, Zap, Thermometer, Clock } from 'lucide-react';

interface PredictiveInsight {
  id: string;
  location: string;
  type: string;
  indicator: string;
  timeframe: string;
  preventiveAction: string;
  riskLevel: 'High' | 'Critical' | 'Medium';
}

export default function PredictiveInsights() {
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchInsights() {
      try {
        const response = await fetch('/api/predictive-insights');
        if (!response.ok) {
          throw new Error('Failed to fetch predictive insights');
        }
        const data = await response.json();
        setInsights(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center h-full min-h-[300px]">
        <BrainCircuit className="text-purple-500 animate-pulse mb-3" size={32} />
        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">Running Predictive Models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <BrainCircuit size={100} className="text-purple-400" />
      </div>
      
      <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-4 relative z-10">
        <div className="p-2 bg-purple-900/50 text-purple-400 rounded-lg">
          <BrainCircuit size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-100 font-display">Predictive Insights</h4>
          <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Gemini AI Risk Forecasting</p>
        </div>
      </div>

      <div className="space-y-4 mt-2 overflow-y-auto flex-1 pr-1 custom-scrollbar relative z-10">
        {insights.length === 0 ? (
          <p className="text-slate-400 text-xs py-4 text-center">No immediate risks detected.</p>
        ) : (
          insights.map((insight) => {
            const isCritical = insight.riskLevel === 'Critical';
            const isHigh = insight.riskLevel === 'High';
            
            return (
              <div key={insight.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {isCritical ? (
                      <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                    ) : isHigh ? (
                      <Zap size={14} className="text-orange-500" />
                    ) : (
                      <Thermometer size={14} className="text-amber-500" />
                    )}
                    <span className="text-xs font-bold text-slate-200">{insight.type}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                    isCritical ? 'bg-red-900/40 text-red-400 border border-red-800' :
                    isHigh ? 'bg-orange-900/40 text-orange-400 border border-orange-800' :
                    'bg-amber-900/40 text-amber-400 border border-amber-800'
                  }`}>
                    {insight.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-16 shrink-0 mt-0.5">LOCATION</span>
                    <span className="text-xs text-slate-300">{insight.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-16 shrink-0 mt-0.5">PATTERN</span>
                    <span className="text-xs text-slate-400">{insight.indicator}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-16 shrink-0 mt-0.5">TIMEFRAME</span>
                    <span className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
                      <Clock size={10} />
                      {insight.timeframe}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Hammer size={12} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Recommended Action</span>
                      <p className="text-[11px] text-indigo-200 leading-snug">{insight.preventiveAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
