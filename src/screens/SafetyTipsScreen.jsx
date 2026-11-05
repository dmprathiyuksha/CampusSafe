import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Moon, 
  Radio, 
  PhoneCall, 
  Lock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SafetyTipsScreen() {
  const navigate = useNavigate();
  const { safetyData } = useApp();

  const tipIcons = [Moon, Radio, PhoneCall, Lock];

  return (
    <div className="flex-1 flex flex-col p-5 pb-24 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 pt-1">
        <button
          onClick={() => navigate('/home')}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Safety Tips
        </h2>

        <div className="w-9" />
      </div>

      {/* Intro Banner */}
      <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Daily Safety Awareness
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Key habits to keep yourself and your peers secure across the Kattankulathur campus.
          </p>
        </div>
      </div>

      {/* Tips Cards */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {safetyData.safetyTips.map((tip, idx) => {
          const IconComponent = tipIcons[idx % tipIcons.length];

          return (
            <div
              key={tip.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {tip.title}
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                {tip.summary}
              </p>

              <div className="flex items-center gap-1.5 pt-1">
                {tip.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
