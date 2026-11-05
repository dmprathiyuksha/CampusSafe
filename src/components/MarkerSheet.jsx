import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  FileText, 
  Navigation, 
  X, 
  ShieldAlert, 
  HeartPulse, 
  Flame, 
  ShieldCheck, 
  ChevronRight,
  Footprints,
  Compass
} from 'lucide-react';
import { calculateCampusRoute } from '../utils/campusNavigation';

export default function MarkerSheet({ 
  location, 
  allLocations, 
  userPosition, 
  onClose, 
  onStartNavigation,
  isNavigating,
  onSelectOtherLocation,
  onCallLocation
}) {
  if (!location) return null;

  // Calculate actual road walking route from user to this location
  const route = calculateCampusRoute(userPosition, location, location.name);
  const walkingDist = route ? route.distanceMeters : 150;
  const walkingDuration = route ? route.durationMinutes : 2;

  // Find 3 nearest emergency/medical/security locations
  const safetyLocations = allLocations
    .filter(loc => loc.id !== location.id && ['emergency', 'medical', 'security'].includes(loc.category) && loc.verified && loc.x != null)
    .map(loc => {
      const r = calculateCampusRoute(location, loc, loc.name);
      return {
        ...loc,
        distMeters: r ? r.distanceMeters : Math.round(Math.hypot(loc.x - location.x, loc.y - location.y) * 1.8),
        duration: r ? r.durationMinutes : 2
      };
    })
    .sort((a, b) => a.distMeters - b.distMeters)
    .slice(0, 3);

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'emergency': return { label: 'Emergency Facility', bg: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-800' };
      case 'medical': return { label: 'Medical & Health', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' };
      case 'security': return { label: 'Security Post', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800' };
      case 'academic': return { label: 'Academic Block', bg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' };
      case 'hostel': return { label: 'Hostel Residence', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800' };
      case 'gate': return { label: 'Campus Entrance', bg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800' };
      case 'food': return { label: 'Food & Dining', bg: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200 dark:border-orange-800' };
      default: return { label: 'Campus Location', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'emergency': return <Flame className="w-4 h-4 text-red-500" />;
      case 'medical': return <HeartPulse className="w-4 h-4 text-emerald-500" />;
      case 'security': return <ShieldCheck className="w-4 h-4 text-blue-500" />;
      default: return <Building2 className="w-4 h-4 text-slate-500" />;
    }
  };

  const badge = getCategoryBadge(location.category);

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-800 max-h-[75vh] flex flex-col animate-in slide-in-from-bottom duration-300 select-none">
      
      {/* Drag handle & Close button */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />
        <button
          onClick={onClose}
          className="absolute right-4 top-3 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 overflow-y-auto space-y-4">
        
        {/* Header matching prototype card */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400 shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${badge.bg}`}>
                {badge.label}
              </span>
              {location.verified ? (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  ✓ Verified
                </span>
              ) : (
                <span className="text-[10px] text-amber-500 font-semibold">
                  Pending placement
                </span>
              )}
            </div>
            <h3 data-testid="marker-sheet-title" className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {location.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <Footprints className="w-3.5 h-3.5 text-blue-500" />
              <span>{walkingDuration} min walk · ~{walkingDist} meters via campus road</span>
            </p>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          {location.description || 'SRMIST campus academic / operational facility.'}
        </p>

        {/* Action Button: Google Maps Style Start Navigation */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => onStartNavigation(location)}
            className="col-span-3 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>{isNavigating ? 'Resume Navigation' : 'Start Navigation'}</span>
          </button>

          <button
            onClick={() => onCallLocation && onCallLocation(location)}
            className="col-span-1 py-3 px-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-all"
            title="Call contact"
          >
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>Call</span>
          </button>
        </div>

        {/* Section 1: Building Information */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 shadow-sm space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-red-500" />
            Building Information
          </h4>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500 dark:text-slate-400">Hours:</span>
              <span>{location.hours || 'Standard academic hours'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500 dark:text-slate-400">Contact:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{location.contact || '+91 98765 43210 (DEMO)'}</span>
            </div>
            {location.notes && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Safety note: </span>
                {location.notes}
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Nearby Safety Assistance (Top 3) */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              Nearby Safety Assistance
            </h4>
            <span className="text-[10px] text-slate-400">approx. walking distance</span>
          </div>

          <div className="space-y-1.5">
            {safetyLocations.length > 0 ? (
              safetyLocations.map((safety) => (
                <div
                  key={safety.id}
                  onClick={() => onSelectOtherLocation && onSelectOtherLocation(safety)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {getCategoryIcon(safety.category)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {safety.name}
                      </p>
                      <p className="text-[10px] text-slate-400 capitalize">{safety.category} facility</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      ~{safety.distMeters} m
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-2 text-center">Safety facilities available across campus</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
