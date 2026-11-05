import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  ListOrdered, 
  Footprints, 
  X, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function NavigationBottomBar({
  route,
  onEndNavigation,
  isSimulating,
  onToggleSimulate,
  currentStepIndex,
  onOpenSteps
}) {
  if (!route) return null;

  const [expanded, setExpanded] = useState(false);

  // Approximate ETA
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + (route.durationMinutes || 3) * 60000);
  const formattedArrival = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl p-4 transition-all duration-300 animate-in slide-in-from-bottom">
      
      {/* Top Handle / Peek Button */}
      <div 
        onClick={() => setExpanded(!expanded)} 
        className="w-full flex items-center justify-between pb-2 cursor-pointer border-b border-slate-100 dark:border-slate-800"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Footprints className="w-3.5 h-3.5 text-blue-500" />
            <span>Walking Navigation Active</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <span>{expanded ? 'Hide Details' : 'View Steps'}</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* Main Metric Row: Google Maps Style */}
      <div className="flex items-center justify-between pt-3 pb-2">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {route.durationMinutes} min
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              ({route.distanceMeters} m)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Arrival at {formattedArrival} · Fastest campus walkway
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Simulate Walking Progress Toggle */}
          <button
            onClick={onToggleSimulate}
            className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 ${
              isSimulating
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title="Simulate walking step-by-step along the route"
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSimulating ? 'Pause Walk' : 'Demo Walk'}</span>
          </button>

          {/* End Navigation Button */}
          <button
            onClick={onEndNavigation}
            className="w-10 h-10 rounded-2xl bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold shadow-xs active:scale-95 transition-all"
            aria-label="End Navigation"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>

        </div>
      </div>

      {/* Expandable Step-by-Step Directions */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 max-h-56 overflow-y-auto space-y-2.5 text-xs pr-1">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ListOrdered className="w-3.5 h-3.5 text-blue-500" />
            Turn-by-Turn Directions
          </h4>

          {route.steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={idx}
                className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                  isCurrent 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                  isCurrent ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold leading-snug ${isCurrent ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                    {step.instruction}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {step.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
