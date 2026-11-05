import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Bell, MapPin, Phone, Settings, Siren } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  // Hide bottom nav on splash, login, and SOS full-screen views
  const hidePaths = ['/', '/login', '/sos', '/live-share'];
  if (hidePaths.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/alerts', label: 'Alerts', icon: Bell },
    { to: '/sos', label: 'SOS', icon: Siren, isSos: true },
    { to: '/map', label: 'Map', icon: MapPin },
    { to: '/contacts', label: 'Contacts', icon: Phone },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around max-w-[390px] mx-auto transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        if (item.isSos) {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative -top-5 flex flex-col items-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/40 ring-4 ring-white dark:ring-slate-900 transform active:scale-95 transition-transform">
                <Icon className="w-7 h-7 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 mt-0.5 tracking-wider">
                SOS
              </span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-1">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
