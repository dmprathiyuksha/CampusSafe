import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Moon, 
  Globe, 
  HelpCircle, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Edit3, 
  Shield, 
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { 
    darkMode, 
    setDarkMode, 
    notificationsEnabled, 
    setNotificationsEnabled,
    locationAccessEnabled,
    setLocationAccessEnabled,
    language,
    setLanguage,
    editMode,
    toggleEditMode,
    logout
  } = useApp();

  const [policyOpen, setPolicyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

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
          Settings
        </h2>

        <div className="w-9" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        
        {/* Section: Permissions & Toggles */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3.5">
          
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Notifications</p>
                <p className="text-[11px] text-slate-400">Receive campus safety broadcast alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Location Access Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Location Access</p>
                <p className="text-[11px] text-slate-400">Simulate radar & nearby emergency posts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={locationAccessEnabled}
                onChange={() => setLocationAccessEnabled(!locationAccessEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-[11px] text-slate-400">High contrast night theme</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Language Selector */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Language</p>
                <p className="text-[11px] text-slate-400">Interface localization</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>{language}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

        </div>

        {/* Section: Developer / Map Marker Tools */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Map Customization
          </h3>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Edit Markers Mode</p>
                <p className="text-[11px] text-slate-400">Click & drag pins directly on campus map</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={editMode}
                onChange={() => toggleEditMode()}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        </div>

        {/* Section: About */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
            About
          </h3>

          <button
            onClick={() => setHelpOpen(true)}
            className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="border-t border-slate-100 dark:border-slate-800" />

          <button
            onClick={() => setPolicyOpen(true)}
            className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Log Out Button matching prototype */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full py-3.5 px-4 rounded-3xl bg-red-50 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-98"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>

      </div>

      {/* Privacy Policy Modal */}
      {policyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                Privacy & Data Policy
              </h3>
              <button onClick={() => setPolicyOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              CampusSafe is a college project demo designed for SRM Institute of Science and Technology. All user data, markers, and emergency broadcasts operate locally inside your browser via local storage and demo simulation APIs. No real personal telemetric logs are transmitted to commercial servers.
            </p>
            <button
              onClick={() => setPolicyOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                CampusSafe Support
              </h3>
              <button onClick={() => setHelpOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>For technical inquiries or project evaluation demonstrations:</p>
              <p className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                Email: safety-demo@srmist.edu.in<br/>
                Helpline: +91 98765 43210 (DEMO)
              </p>
            </div>
            <button
              onClick={() => setHelpOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
