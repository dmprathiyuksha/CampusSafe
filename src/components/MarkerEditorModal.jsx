import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Download, Copy, Check, RotateCcw, Plus, Trash2, X, MapPin } from 'lucide-react';

export default function MarkerEditorModal({ 
  selectedLocation, 
  onClose, 
  onSave, 
  pendingCoord 
}) {
  const { locations, addLocation, updateLocation, resetLocationsToDefault } = useApp();
  
  const [formData, setFormData] = useState(() => {
    if (selectedLocation) {
      return { ...selectedLocation };
    }
    return {
      id: 'custom-' + Date.now().toString(36),
      name: '',
      category: 'academic',
      x: pendingCoord ? pendingCoord.x : 340,
      y: pendingCoord ? pendingCoord.y : 500,
      description: '',
      hours: '08:00 AM - 05:00 PM',
      contact: '+91 98765 43210 (DEMO)',
      notes: '',
      verified: true
    };
  });

  const [copied, setCopied] = useState(false);

  const categories = [
    'academic',
    'building',
    'emergency',
    'medical',
    'security',
    'hostel',
    'gate',
    'food',
    'transport'
  ];

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(locations, null, 2);
    // Copy to clipboard
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Also download file
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'locations.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      ...formData,
      x: formData.x !== '' && formData.x !== null ? Number(formData.x) : null,
      y: formData.y !== '' && formData.y !== null ? Number(formData.y) : null,
    };

    if (selectedLocation) {
      updateLocation(payload);
    } else {
      addLocation(payload);
    }
    onSave && onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 sm:rounded-3xl rounded-t-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedLocation ? 'Edit Marker Details' : 'Add New Campus Marker'}
              </h3>
              <p className="text-[11px] text-slate-500">Live coordinates on real map</p>
            </div>
          </div>
          <button
            type="button"
            data-testid="close-editor-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200/60 dark:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          
          {/* Coordinates Bar */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">Pixel Coordinates:</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">
                X: {formData.x != null ? formData.x : 'null'}
              </span>
              <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-bold text-red-600 dark:text-red-400">
                Y: {formData.y != null ? formData.y : 'null'}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Location Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. BELL Block, Main Library..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-900 dark:text-white capitalize"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Coordinates override */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                X (0 - 683)
              </label>
              <input
                type="number"
                value={formData.x ?? ''}
                onChange={(e) => setFormData({ ...formData, x: e.target.value ? Number(e.target.value) : null })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                Y (0 - 1024)
              </label>
              <input
                type="number"
                value={formData.y ?? ''}
                onChange={(e) => setFormData({ ...formData, y: e.target.value ? Number(e.target.value) : null })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Primary facilities, departments, or purpose..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          {/* Hours & Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                Hours
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                Contact (DEMO)
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Safety / Building Notes
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Emergency stairwell location, AED post"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Verified Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="verified-cb"
              checked={formData.verified}
              onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <label htmlFor="verified-cb" className="text-slate-700 dark:text-slate-300 font-medium">
              Verified on real SRMIST campus map
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Save & Persist Marker</span>
            </button>
          </div>
        </form>

        {/* Global JSON Export / Revert Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied & Downloaded!' : 'Export JSON'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all markers back to original default locations?')) {
                resetLocationsToDefault();
                onClose();
              }
            }}
            title="Reset to default map markers"
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
