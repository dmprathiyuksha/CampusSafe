import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Radio, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Compass, 
  AlertCircle, 
  StopCircle, 
  Power 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LiveShareScreen() {
  const navigate = useNavigate();
  const { 
    isSharingLive, 
    toggleLiveSharing, 
    userPosition, 
    contacts 
  } = useApp();

  return (
    <div className="flex-1 flex flex-col p-5 pb-8 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
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
          Live Location Sharing
        </h2>

        <div className="w-9" />
      </div>

      <div className="space-y-4 flex-1">
        
        {/* Status Card */}
        <div className={`p-5 rounded-3xl border transition-all ${
          isSharingLive 
            ? 'bg-emerald-500/10 border-emerald-500/30' 
            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isSharingLive 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                <Radio className={`w-6 h-6 ${isSharingLive ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isSharingLive 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {isSharingLive ? 'Broadcasting Active' : 'Sharing Paused'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {isSharingLive ? 'Real-Time Radar Link' : 'Location Not Shared'}
                </h3>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSharingLive}
                onChange={() => toggleLiveSharing()}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Coordinates & Accuracy */}
          <div className="p-3 bg-white/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                Simulated Grid:
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                X: {userPosition.x}, Y: {userPosition.y}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                GPS Telemetry:
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                High Precision (~4m)
              </span>
            </div>
          </div>
        </div>

        {/* Sharing With List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" />
              Sharing With
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              {isSharingLive ? '3 active responders' : '0 connected'}
            </span>
          </div>

          <div className="space-y-2">
            {contacts.slice(0, 3).map((contact) => (
              <div
                key={contact.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {contact.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{contact.role}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSharingLive 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                  {isSharingLive ? 'Tracking Live' : 'Standby'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-End Encrypted Campus Link</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Your simulated location is shared exclusively with designated SRM security units. You may revoke live sharing at any moment.
          </p>
        </div>

      </div>

      {/* Stop Sharing Action */}
      {isSharingLive && (
        <div className="pt-4">
          <button
            onClick={() => toggleLiveSharing(false)}
            className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            <StopCircle className="w-4 h-4" />
            <span>Stop Sharing Live Location</span>
          </button>
        </div>
      )}

    </div>
  );
}
