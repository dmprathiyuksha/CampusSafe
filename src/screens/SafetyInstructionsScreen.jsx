import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  HeartPulse, 
  FlaskConical,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SafetyInstructionsScreen() {
  const navigate = useNavigate();
  const { safetyData } = useApp();

  const [expandedId, setExpandedId] = useState('inst-1');
  const [activeTab, setActiveTab] = useState('guidelines'); // 'guidelines' | 'evacuation'

  const getIcon = (id) => {
    switch (id) {
      case 'inst-1': return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'inst-2': return <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'inst-3': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'inst-4': return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-slate-500" />;
    }
  };

  const getProcedureIcon = (iconName) => {
    switch (iconName) {
      case 'flame': return <Flame className="w-4 h-4 text-red-500" />;
      case 'heart-pulse': return <HeartPulse className="w-4 h-4 text-emerald-500" />;
      case 'flask-conical': return <FlaskConical className="w-4 h-4 text-purple-500" />;
      default: return <Flame className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-5 pb-24 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Header matching prototype */}
      <div className="flex items-center justify-between pb-4 pt-1">
        <button
          onClick={() => navigate('/home')}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Safety Instructions
        </h2>

        <div className="w-9" />
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-200/80 dark:bg-slate-800 p-1 mb-4">
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'guidelines'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Core Guidelines
        </button>
        <button
          onClick={() => setActiveTab('evacuation')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'evacuation'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Emergency Evacuation
        </button>
      </div>

      {/* Tab 1: Core Guidelines (Matching prototype cards) */}
      {activeTab === 'guidelines' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          {safetyData.instructions.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs cursor-pointer hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {getIcon(item.id)}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in">
                    {item.details}
                  </div>
                )}
              </div>
            );
          })}

          {/* Yellow Card: Your safety matters! matching prototype */}
          <div className="mt-4 p-4 rounded-3xl bg-[#fef3c7] dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-900/60 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                Your safety matters!
              </h4>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 mt-0.5 leading-snug">
                Remember you can access 24/7 security escorts for late-night movement across campus via the SOS button.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evacuation & Emergency Procedures */}
      {activeTab === 'evacuation' && (
        <div className="space-y-3.5 flex-1 overflow-y-auto">
          {safetyData.emergencyProcedures.map((proc) => (
            <div
              key={proc.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {getProcedureIcon(proc.icon)}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  {proc.title}
                </h3>
              </div>

              <ol className="space-y-1.5 pl-5 list-decimal text-xs text-slate-600 dark:text-slate-300">
                {proc.steps.map((st, i) => (
                  <li key={i} className="leading-relaxed">
                    {st}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
