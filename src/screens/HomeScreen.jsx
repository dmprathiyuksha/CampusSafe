import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  AlertTriangle, 
  ChevronRight, 
  Siren, 
  MapPin, 
  Phone, 
  Info, 
  ShieldCheck, 
  Settings,
  Radio,
  X,
  User,
  GraduationCap,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user, isSharingLive, toggleLiveSharing, logout } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-5 pb-24 bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Header matching prototype */}
      <header className="flex items-center justify-between pb-4 pt-1">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center Brand Title */}
        <div data-testid="home-brand-title" className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/home')}>
          <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs">
            <Siren className="w-4 h-4" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Campus<span className="text-red-600">Safe</span>
          </span>
        </div>

        {/* Notification Bell with Badge */}
        <button
          onClick={() => navigate('/alerts')}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          aria-label="Alerts"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse" />
        </button>
      </header>

      {/* Live Sharing Status Pill (If active) */}
      {isSharingLive && (
        <div 
          onClick={() => navigate('/live-share')}
          className="mb-4 p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs cursor-pointer hover:bg-emerald-500/15 transition-all"
        >
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Location Sharing is ACTIVE</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 underline">
            Manage
          </span>
        </div>
      )}

      {/* Emergency Alert Banner Card matching prototype */}
      <div 
        onClick={() => navigate('/alerts')}
        className="mb-6 p-4 rounded-3xl bg-red-500/10 dark:bg-red-950/30 border border-red-500/20 shadow-sm cursor-pointer hover:bg-red-500/15 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-600/30">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                Emergency Alert
              </span>
              <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                Active
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
              Fire drill at Block B. Check important instructions.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* 3 Pagination dots matching prototype */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1 border-t border-red-200/40 dark:border-red-900/40">
          <div className="w-4 h-1.5 rounded-full bg-red-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-300 dark:bg-red-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-300 dark:bg-red-800" />
        </div>
      </div>

      {/* 6-Tile Grid in EXACT positions from prototype */}
      <div className="grid grid-cols-2 gap-3.5 flex-1">
        
        {/* Tile 1: Emergency Alerts (Pastel Red) */}
        <button
          onClick={() => navigate('/alerts')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#fee2e2] dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-red-600 dark:text-red-400 mb-2.5 group-hover:rotate-6 transition-transform">
            <Bell className="w-6 h-6 fill-red-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Emergency<br />Alerts
          </span>
        </button>

        {/* Tile 2: Campus Map (Pastel Blue) */}
        <button
          onClick={() => navigate('/map')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#e0f2fe] dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-sky-600 dark:text-sky-400 mb-2.5 group-hover:-rotate-6 transition-transform">
            <MapPin className="w-6 h-6 fill-sky-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Campus<br />Map
          </span>
        </button>

        {/* Tile 3: Emergency Contacts (Pastel Green) */}
        <button
          onClick={() => navigate('/contacts')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#dcfce7] dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2.5 group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6 fill-emerald-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Emergency<br />Contacts
          </span>
        </button>

        {/* Tile 4: Important Instructions (Pastel Purple) */}
        <button
          onClick={() => navigate('/safety-instructions')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#f3e8ff] dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2.5 group-hover:rotate-6 transition-transform">
            <Info className="w-6 h-6 fill-purple-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Important<br />Instructions
          </span>
        </button>

        {/* Tile 5: Safety Tips (Pastel Yellow) */}
        <button
          onClick={() => navigate('/safety-tips')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#fef3c7] dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2.5 group-hover:-rotate-6 transition-transform">
            <ShieldCheck className="w-6 h-6 fill-amber-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Safety<br />Tips
          </span>
        </button>

        {/* Tile 6: Settings (Pastel Orange) */}
        <button
          onClick={() => navigate('/settings')}
          className="flex flex-col items-center justify-center p-5 rounded-3xl bg-[#ffedd5] dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/50 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group text-center min-h-[115px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-orange-600 dark:text-orange-400 mb-2.5 group-hover:rotate-45 transition-transform">
            <Settings className="w-6 h-6 fill-orange-600/20" />
          </div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Settings
          </span>
        </button>

      </div>

      {/* Slide-out Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div 
            onClick={() => setDrawerOpen(false)} 
            className="flex-1 bg-black/60 backdrop-blur-xs" 
          />
          <div className="w-72 bg-white dark:bg-slate-900 h-full p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                    CS
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">CampusSafe</span>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card */}
              <div className="py-4 my-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-400 text-white flex items-center justify-center font-bold text-base shadow-md uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{user.regNo}</p>
                  </div>
                </div>
                <div className="mt-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-[11px] text-slate-600 dark:text-slate-300">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{user.dept}</p>
                  <p className="text-slate-500 mt-0.5">{user.hostel}</p>
                </div>
              </div>

              {/* Drawer Links */}
              <div className="space-y-1 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <button 
                  onClick={() => { setDrawerOpen(false); navigate('/live-share'); }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <span>Live Location Sharing</span>
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); navigate('/safety-instructions'); }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <Info className="w-4 h-4 text-purple-500" />
                  <span>Evacuation Procedures</span>
                </button>
                <button 
                  onClick={() => { setDrawerOpen(false); navigate('/settings'); }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Preferences & Marker Editor</span>
                </button>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full py-3 px-4 rounded-xl border border-red-200 dark:border-red-950 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
