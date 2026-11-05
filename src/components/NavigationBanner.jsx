import React from 'react';
import { 
  ArrowUp, 
  CornerUpLeft, 
  CornerUpRight, 
  RotateCcw, 
  CheckCircle, 
  Navigation, 
  X, 
  Volume2, 
  VolumeX,
  Compass
} from 'lucide-react';

export default function NavigationBanner({ 
  currentStep, 
  nextStep, 
  totalDistance, 
  onClose,
  isMuted,
  onToggleMute 
}) {
  if (!currentStep) return null;

  const getActionIcon = (action) => {
    switch (action) {
      case 'turn-left':
        return <CornerUpLeft className="w-7 h-7 text-white stroke-[2.5]" />;
      case 'turn-right':
        return <CornerUpRight className="w-7 h-7 text-white stroke-[2.5]" />;
      case 'uturn':
        return <RotateCcw className="w-7 h-7 text-white stroke-[2.5]" />;
      case 'arrive':
        return <CheckCircle className="w-7 h-7 text-white stroke-[2.5]" />;
      case 'depart':
      case 'straight':
      default:
        return <ArrowUp className="w-7 h-7 text-white stroke-[2.5]" />;
    }
  };

  return (
    <div className="absolute top-3 inset-x-3 z-40 animate-in slide-in-from-top duration-300 select-none">
      <div className="bg-emerald-700 dark:bg-emerald-800 text-white rounded-3xl p-3.5 shadow-2xl border border-emerald-600/40 backdrop-blur-md flex items-center justify-between gap-3">
        
        {/* Turn Arrow Icon Box */}
        <div className="w-12 h-12 rounded-2xl bg-emerald-800 dark:bg-emerald-900 border border-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
          {getActionIcon(currentStep.action)}
        </div>

        {/* Instruction details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
              {currentStep.distanceMeters > 0 ? `In ${currentStep.distanceMeters} m` : 'Destination'}
            </span>
          </div>
          <h3 className="text-sm font-extrabold truncate leading-tight text-white mt-0.5">
            {currentStep.instruction}
          </h3>
          {nextStep && (
            <p className="text-[11px] text-emerald-200/90 truncate mt-0.5 flex items-center gap-1 font-medium">
              <span>Then:</span>
              <span className="truncate">{nextStep.instruction}</span>
            </p>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl hover:bg-emerald-600/60 text-emerald-100 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Exit Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
