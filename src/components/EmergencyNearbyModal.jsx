import React from 'react';
import { 
  ShieldAlert, 
  HeartPulse, 
  ShieldCheck, 
  Flame, 
  MapPin, 
  Navigation, 
  Phone, 
  X, 
  Flag,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getNearbyEmergencyFacilities } from '../utils/campusNavigation';

export default function EmergencyNearbyModal({ 
  onClose, 
  onSelectFacilityForRoute 
}) {
  const { userPosition, locations, startCall } = useApp();

  const facilities = getNearbyEmergencyFacilities(userPosition, locations);

  const getIcon = (category, name) => {
    if (name.includes('Assembly Point')) {
      return { Icon: Flag, bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' };
    }
    switch (category) {
      case 'medical':
        return { Icon: HeartPulse, bg: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' };
      case 'security':
        return { Icon: ShieldCheck, bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400' };
      case 'emergency':
        return { Icon: Flame, bg: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400' };
      default:
        return { Icon: ShieldAlert, bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-slate-200 dark:border-slate-800 bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight">
                Emergency Facilities Nearby
              </h3>
              <p className="text-[11px] text-red-100">
                1-tap road navigation & verified emergency units
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Facilities */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 text-xs">
          {facilities.length > 0 ? (
            facilities.map((fac) => {
              const { Icon, bg } = getIcon(fac.category, fac.name);

              return (
                <div
                  key={fac.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-2 hover:border-red-400 dark:hover:border-red-700 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {fac.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {fac.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono block">
                        ~{fac.distanceMeters} m
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {fac.durationMinutes} min walk
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    <button
                      onClick={() => {
                        onSelectFacilityForRoute(fac);
                        onClose();
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Start Navigation</span>
                    </button>

                    <button
                      onClick={() => {
                        startCall({
                          name: fac.name,
                          role: 'Emergency Facility',
                          phone: fac.contact || '+91 98765 43210 (DEMO)'
                        });
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      title="Call emergency facility"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Call (DEMO)</span>
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-center text-slate-400 py-4">No emergency facilities detected.</p>
          )}
        </div>

      </div>
    </div>
  );
}
