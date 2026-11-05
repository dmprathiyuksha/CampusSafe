import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Siren, 
  PhoneCall, 
  Send, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  X, 
  Clock, 
  MapPin, 
  Compass,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SosScreen() {
  const navigate = useNavigate();
  const { 
    userPosition, 
    locations, 
    contacts, 
    startCall, 
    sosActive, 
    sosTimestamp, 
    sosNearestPost, 
    triggerSos, 
    cancelSos,
    isSharingLive,
    toggleLiveSharing
  } = useApp();

  // Step states: 'idle' | 'countdown' | 'triggered'
  const [step, setStep] = useState(sosActive ? 'triggered' : 'idle');
  const [countdown, setCountdown] = useState(5);
  const [selectedContacts, setSelectedContacts] = useState([
    'sec-campus',
    'med-hospital',
    'warden-hostel'
  ]);

  // Find nearest emergency/security post to user simulated position
  const findNearestPost = () => {
    const safetyPosts = locations.filter(l => 
      ['security', 'medical', 'emergency'].includes(l.category) && l.x != null && l.y != null
    );

    if (safetyPosts.length === 0) return 'SRM Campus Security Station';

    let nearest = safetyPosts[0];
    let minD = Infinity;

    safetyPosts.forEach(p => {
      const dx = p.x - userPosition.x;
      const dy = p.y - userPosition.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < minD) {
        minD = d;
        nearest = p;
      }
    });

    return `${nearest.name} (~${Math.round(minD * 1.8)}m away)`;
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (step === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(c => c - 1);
        }, 1000);
      } else {
        // Countdown completed: trigger alert!
        const nearest = findNearestPost();
        triggerSos(nearest);
        setStep('triggered');
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleStartSosCountdown = () => {
    setCountdown(5);
    setStep('countdown');
  };

  const handleCancelCountdown = () => {
    setStep('idle');
    setCountdown(5);
  };

  const handleResetSos = () => {
    cancelSos();
    setStep('idle');
    setCountdown(5);
  };

  const handleCallSecurity = () => {
    const secContact = contacts.find(c => c.category === 'security') || contacts[0];
    startCall(secContact);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#140303] via-[#240606] to-[#0f0202] text-white relative select-none">
      
      {/* Simulation Warning Banner (Persistent matching instructions) */}
      <div className="w-full bg-amber-500/20 border border-amber-500/40 rounded-2xl px-3 py-2 mb-3 flex items-center justify-center gap-2 text-[11px] font-bold text-amber-300 shadow-md">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
        <span>SIMULATION: no real alert or call is sent.</span>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
          EMERGENCY PORTAL
        </span>
        <div className="w-9" />
      </div>

      {/* Main Flow State Container */}
      {step === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
          
          {/* Glowing Concentric SOS Button from prototype */}
          <div className="relative mb-8">
            <div className="absolute -inset-6 rounded-full bg-red-600/20 animate-pulse duration-1000" />
            <div className="absolute -inset-3 rounded-full bg-red-600/30" />
            
            <button
              onClick={handleStartSosCountdown}
              className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-rose-600 flex flex-col items-center justify-center text-white shadow-2xl shadow-red-600/60 ring-8 ring-red-900/50 hover:scale-105 active:scale-95 transition-all group"
            >
              <Siren className="w-12 h-12 mb-1 animate-bounce group-hover:scale-110 transition-transform" />
              <span className="text-3xl font-black tracking-wider">SOS</span>
            </button>
          </div>

          <p className="text-sm font-bold text-slate-300 tracking-wide mb-1">
            Tap to send emergency alert
          </p>
          <p className="text-xs text-slate-500 max-w-[240px]">
            Instantly alerts SRMIST Campus Security and dispatches nearest responder.
          </p>

        </div>
      )}

      {/* Countdown State */}
      {step === 'countdown' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-6 animate-in zoom-in-95 duration-200">
          
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full border-4 border-red-500/30 flex items-center justify-center relative">
              <div className="sos-ping" />
              <span className="text-6xl font-black text-white font-mono animate-pulse">
                {countdown}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-black text-red-400 mb-1">
            Dispatching Emergency Alert...
          </h3>
          <p className="text-xs text-slate-400 max-w-[260px] mb-8">
            Alert will trigger in {countdown} seconds. Press cancel below if pressed by mistake.
          </p>

          <button
            onClick={handleCancelCountdown}
            className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm border border-white/20 shadow-lg active:scale-95 transition-all"
          >
            Cancel Alert
          </button>
        </div>
      )}

      {/* Triggered / Confirmation State */}
      {step === 'triggered' && (
        <div className="flex-1 flex flex-col justify-center my-auto py-4 space-y-4 animate-in fade-in duration-300">
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-3xl bg-red-600/30 border-2 border-red-500 text-red-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-600/40">
              <CheckCircle2 className="w-9 h-9 text-red-500 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-red-400 tracking-tight">
              DEMO ALERT TRIGGERED
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Timestamp: {sosTimestamp || new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-900/90 border border-red-900/50 rounded-3xl p-4 space-y-3 text-xs">
            
            <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-800">
              <Compass className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Nearest Safety Post:</span>
                <span className="font-bold text-white text-xs">
                  {sosNearestPost || findNearestPost()}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-800">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Simulated GPS Coordinates:</span>
                <span className="font-mono text-slate-300 text-[11px]">
                  X: {userPosition.x}, Y: {userPosition.y} · (Accuracy ~4m)
                </span>
              </div>
            </div>

            {/* Notified Contacts */}
            <div>
              <span className="text-slate-400 block text-[11px] mb-2 font-semibold">
                Alert Broadcast to Selected Contacts:
              </span>
              <div className="space-y-1.5">
                {contacts.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="font-semibold text-slate-300 text-[11px]">{c.name}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">✓ Notified</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleCallSecurity}
              className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Campus Security (Simulated)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/home')}
                className="py-3 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={handleResetSos}
                className="py-3 px-3 rounded-2xl border border-red-500/40 text-red-400 hover:bg-red-950/40 font-bold text-xs transition-colors"
              >
                Cancel / Reset
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Bottom 3 Quick Actions matching prototype */}
      {step === 'idle' && (
        <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-red-950/60">
          
          <button
            onClick={handleCallSecurity}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200">Call Security</span>
          </button>

          <button
            onClick={() => navigate('/map')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200">Send Location</span>
          </button>

          <button
            onClick={() => navigate('/live-share')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-200">Share Live</span>
          </button>

        </div>
      )}

    </div>
  );
}
