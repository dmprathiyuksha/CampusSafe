import React from 'react';
import { Wifi, Battery, Signal, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from './BottomNav';
import CallModal from './CallModal';

export default function PhoneFrame({ children }) {
  const { darkMode } = useApp();

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sm:py-6 sm:px-4 selection:bg-red-500 selection:text-white">
      {/* Desktop Header Pill */}
      <div className="hidden sm:flex items-center gap-3 text-slate-400 text-xs mb-3 font-medium">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 shadow-sm">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          <span className="font-semibold text-white">CampusSafe SRMIST</span>
          <span className="text-[10px] bg-red-950/80 text-red-400 px-1.5 py-0.5 rounded font-mono">DEMO</span>
        </span>
        <span className="text-slate-500">· Kattankulathur Campus Safety System</span>
      </div>

      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-[390px] h-screen sm:h-[844px] bg-white dark:bg-slate-950 sm:rounded-[48px] overflow-hidden flex flex-col shadow-2xl phone-screen-container border-0 sm:border-[8px] sm:border-slate-800 transition-colors">
        
        {/* Dynamic Island / Status Bar (Prototype style) */}
        <header className="shrink-0 w-full pt-3 px-6 pb-2 flex items-center justify-between z-40 select-none bg-inherit text-slate-800 dark:text-white transition-colors">
          <span className="text-xs font-bold tracking-tight font-mono">9:41</span>
          
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-1 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-slate-900/90 border border-slate-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-950" />
          </div>

          <div className="flex items-center gap-1.5 text-slate-800 dark:text-white">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </header>

        {/* Scrollable Screen Content */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col">
          {children}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Simulated Calling Modal */}
        <CallModal />
      </div>

      {/* Desktop Footer hint */}
      <div className="hidden sm:flex items-center gap-4 mt-3 text-[11px] text-slate-500 font-medium">
        <span>SRMIST College Demo Project</span>
        <span>•</span>
        <span>Mobile-First (390×844)</span>
        <span>•</span>
        <span>Simulated GPS & Offline Data</span>
      </div>
    </div>
  );
}
