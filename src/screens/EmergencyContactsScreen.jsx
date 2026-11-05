import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Phone, 
  ShieldCheck, 
  HeartPulse, 
  Flame, 
  BadgeAlert, 
  UserCheck, 
  HeartHandshake, 
  AlertCircle,
  X,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmergencyContactsScreen() {
  const navigate = useNavigate();
  const { contacts, startCall } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const getContactIcon = (cat) => {
    switch (cat) {
      case 'security':
        return { Icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950/60' };
      case 'medical':
        return { Icon: HeartPulse, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-950/60' };
      case 'emergency':
        return { Icon: Flame, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-950/60' };
      case 'police':
        return { Icon: BadgeAlert, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-950/60' };
      case 'warden':
        return { Icon: UserCheck, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' };
      default:
        return { Icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950/60' };
    }
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

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
          Emergency Contacts
        </h2>

        <div className="w-9" />
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search contacts..."
          className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Safety Notice Banner */}
      <div className="mb-4 p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
        <Info className="w-4 h-4 shrink-0 text-amber-500" />
        <span>Demo numbers trigger simulated phone calls without external dialing.</span>
      </div>

      {/* Contacts List matching prototype */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => {
          const style = getContactIcon(contact.category);
          const Icon = style.Icon;

          return (
            <div
              key={contact.id}
              className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between gap-3 group"
            >
              {/* Category Icon */}
              <div className={`w-11 h-11 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shrink-0 shadow-xs`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {contact.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {contact.role}
                </p>
                <p className="text-xs font-mono font-bold text-red-600 dark:text-red-400 mt-0.5">
                  {contact.phone}
                </p>
              </div>

              {/* Green Call Action Button matching prototype */}
              <button
                onClick={() => startCall(contact)}
                className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 transition-all shrink-0"
                aria-label={`Call ${contact.name}`}
              >
                <Phone className="w-5 h-5 fill-white" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
