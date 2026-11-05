import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  AlertTriangle, 
  Megaphone, 
  Info, 
  ChevronRight, 
  Clock, 
  MapPin, 
  ShieldAlert,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AlertsScreen() {
  const navigate = useNavigate();
  const { alerts } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filters = ['All', 'Emergency', 'Notice', 'Info'];

  const filteredAlerts = activeFilter === 'All'
    ? alerts
    : alerts.filter(a => a.type.toLowerCase() === activeFilter.toLowerCase());

  const getAlertStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'emergency':
        return {
          bg: 'bg-red-500/10 dark:bg-red-950/30',
          border: 'border-red-500/30',
          badge: 'bg-red-600 text-white',
          iconBg: 'bg-red-600 text-white',
          Icon: AlertTriangle,
          textColor: 'text-red-700 dark:text-red-400'
        };
      case 'notice':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-950/30',
          border: 'border-amber-500/30',
          badge: 'bg-amber-500 text-white',
          iconBg: 'bg-amber-500 text-white',
          Icon: Megaphone,
          textColor: 'text-amber-700 dark:text-amber-400'
        };
      case 'info':
      default:
        return {
          bg: 'bg-sky-500/10 dark:bg-sky-950/30',
          border: 'border-sky-500/30',
          badge: 'bg-sky-500 text-white',
          iconBg: 'bg-sky-500 text-white',
          Icon: Info,
          textColor: 'text-sky-700 dark:text-sky-400'
        };
    }
  };

  return (
    <div className="flex-1 flex flex-col p-5 pb-24 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Header matching prototype */}
      <div className="flex items-center justify-between pb-4 pt-1">
        <button
          onClick={() => navigate('/home')}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Alerts
        </h2>

        <button
          onClick={() => setActiveFilter(activeFilter === 'All' ? 'Emergency' : 'All')}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Filter"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips matching prototype */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Alerts List matching prototype */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {filteredAlerts.map((alert) => {
          const style = getAlertStyle(alert.type);
          const Icon = style.Icon;

          return (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`p-4 rounded-3xl ${style.bg} border ${style.border} cursor-pointer hover:shadow-sm transition-all group flex items-start gap-3.5`}
            >
              {/* Alert Type Icon */}
              <div className={`w-10 h-10 rounded-2xl ${style.iconBg} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Alert Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {alert.title}
                  </h3>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${style.badge}`}>
                    {alert.type}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {alert.summary}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                  <div className="flex items-center gap-0.5 font-bold text-slate-500 dark:text-slate-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getAlertStyle(selectedAlert.type).badge}`}>
                  {selectedAlert.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedAlert.timestamp}</span>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {selectedAlert.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {selectedAlert.location}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedAlert.description}
            </div>

            {selectedAlert.actionRequired && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-700 dark:text-red-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Action Required:</span>
                </div>
                <p>{selectedAlert.actionRequired}</p>
              </div>
            )}

            <button
              onClick={() => setSelectedAlert(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
