import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Shield, Phone, AlertCircle } from 'lucide-react';

export default function CallModal() {
  const { activeCall, endCall, callDuration } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  if (!activeCall) return null;

  const contact = activeCall.contact;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white text-center shadow-2xl relative flex flex-col items-center">
        {/* Simulation Banner */}
        <div className="w-full bg-amber-500/15 border border-amber-500/30 rounded-xl px-3 py-1.5 mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>SIMULATION: No real call is placed</span>
        </div>

        {/* Contact Avatar / Icon */}
        <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mb-4 relative">
          <div className="sos-ping" />
          <Shield className="w-12 h-12 text-red-500" />
        </div>

        {/* Contact Info */}
        <h3 className="text-xl font-bold text-white mb-1">{contact.name}</h3>
        <p className="text-sm text-slate-400 mb-2">{contact.role || 'Campus Emergency Service'}</p>
        <p className="text-xs text-red-400 font-mono tracking-wider mb-4">{contact.phone}</p>

        {/* Call Status / Timer */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-emerald-400 font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Connected · {formatTime(callDuration)}</span>
        </div>

        {/* Call Controls Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all ${
              isMuted
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span className="text-xs font-medium">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border transition-all ${
              isSpeaker
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            <span className="text-xs font-medium">{isSpeaker ? 'Speaker On' : 'Speaker'}</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={endCall}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all"
          aria-label="End Call"
        >
          <PhoneOff className="w-7 h-7" />
        </button>
        <span className="text-xs text-slate-400 mt-2 font-medium">End Call</span>
      </div>
    </div>
  );
}
