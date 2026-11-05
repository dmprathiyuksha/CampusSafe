import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-white via-red-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-center select-none">
      
      {/* Top Branding */}
      <div className="pt-8 flex flex-col items-center">
        {/* Siren Icon with prototype glow */}
        <div className="relative mb-6">
          {/* Pulsing rings */}
          <div className="absolute -inset-4 bg-red-500/15 rounded-full animate-ping duration-1000" />
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/30 relative">
            <Siren className="w-12 h-12 animate-bounce" />
          </div>
          
          {/* Sound waves graphic */}
          <div className="absolute -top-1 -left-2 text-red-500 font-bold text-xl select-none">‹‹</div>
          <div className="absolute -top-1 -right-2 text-red-500 font-bold text-xl select-none">››</div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          Campus<span className="text-red-600">Safe</span>
        </h1>
        
        {/* Tagline matching prototype */}
        <p className="text-sm font-bold text-red-600 dark:text-red-400 tracking-wide uppercase mb-3">
          Be Aware. Be Safe.
        </p>

        {/* Subtitle matching prototype */}
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-[260px] leading-relaxed">
          Your one-stop platform for emergency alerts, help and support on campus.
        </p>
      </div>

      {/* Center Campus Building Illustration (Handcrafted SVG matching prototype) */}
      <div className="my-auto py-4 flex flex-col items-center">
        <div className="w-64 h-44 relative flex items-end justify-center">
          <svg viewBox="0 0 240 140" className="w-full h-full drop-shadow-md">
            {/* Ground Lawn */}
            <path d="M10 130 Q120 120 230 130 L230 140 L10 140 Z" fill="#86efac" />
            <path d="M0 135 L240 135 L240 140 L0 140 Z" fill="#4ade80" />
            
            {/* Side Trees */}
            <circle cx="35" cy="115" r="18" fill="#22c55e" />
            <circle cx="205" cy="115" r="18" fill="#22c55e" />
            <rect x="32" y="125" width="6" height="12" fill="#78350f" />
            <rect x="202" y="125" width="6" height="12" fill="#78350f" />

            {/* Main Campus Hall */}
            <rect x="50" y="70" width="140" height="65" fill="#f8fafc" stroke="#dc2626" strokeWidth="2.5" rx="4" />
            
            {/* Center Tower */}
            <rect x="100" y="40" width="40" height="95" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" rx="2" />
            
            {/* Red Gabled Roofs */}
            <polygon points="50,70 120,40 190,70" fill="#dc2626" />
            <polygon points="100,40 120,20 140,40" fill="#991b1b" />
            
            {/* SRM Flag */}
            <line x1="120" y1="20" x2="120" y2="8" stroke="#dc2626" strokeWidth="2" />
            <polygon points="120,8 135,12 120,16" fill="#dc2626" />
            
            {/* Clock Tower Dial */}
            <circle cx="120" cy="50" r="6" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="120" y1="50" x2="120" y2="47" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="120" y1="50" x2="123" y2="50" stroke="#dc2626" strokeWidth="1.5" />

            {/* Windows Matrix */}
            <rect x="62" y="85" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="78" y="85" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="154" y="85" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="170" y="85" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="62" y="105" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="78" y="105" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="154" y="105" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            <rect x="170" y="105" width="8" height="10" fill="#38bdf8" stroke="#cbd5e1" rx="1" />
            
            {/* Entrance Arches */}
            <path d="M110 135 L110 115 Q120 108 130 115 L130 135 Z" fill="#991b1b" stroke="#dc2626" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Pagination Dots matching prototype */}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-5 h-2 rounded-full bg-red-600 transition-all" />
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pb-4 space-y-3">
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-slate-400 font-medium">
          SRM Institute of Science and Technology · Kattankulathur
        </p>
      </div>

    </div>
  );
}
