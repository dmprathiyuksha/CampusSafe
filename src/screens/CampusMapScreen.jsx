import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import L from 'leaflet';
import { 
  ArrowLeft, 
  Search, 
  RotateCcw, 
  Plus, 
  Minus, 
  Layers, 
  Edit3, 
  Navigation, 
  MapPin, 
  Building2, 
  HeartPulse, 
  ShieldCheck, 
  Flame, 
  Crosshair, 
  Footprints,
  Compass,
  Radio,
  SlidersHorizontal,
  X,
  AlertTriangle,
  Flag,
  Utensils,
  GraduationCap,
  ShieldAlert,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import MarkerSheet from '../components/MarkerSheet';
import MarkerEditorModal from '../components/MarkerEditorModal';
import NavigationBanner from '../components/NavigationBanner';
import NavigationBottomBar from '../components/NavigationBottomBar';
import EmergencyNearbyModal from '../components/EmergencyNearbyModal';
import { calculateCampusRoute, distanceBetween } from '../utils/campusNavigation';

export default function CampusMapScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { 
    locations, 
    userPosition, 
    updateUserPosition, 
    editMode, 
    toggleEditMode,
    updateLocation,
    startCall
  } = useApp();

  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersGroup = useRef(null);
  const userMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const walkIntervalRef = useRef(null);

  // UI state
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showLegend, setShowLegend] = useState(false);
  const [showEmergencyNearby, setShowEmergencyNearby] = useState(false);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingMarker, setEditingMarker] = useState(null);
  const [pendingCoord, setPendingCoord] = useState(null);
  const [isLiveGpsActive, setIsLiveGpsActive] = useState(false);

  // Exact 7 filters requested: ALL, MEDICAL, SECURITY, EMERGENCY, HOSTELS, ACADEMIC and FOOD
  const filterChips = [
    { id: 'ALL', label: 'ALL', count: locations.length },
    { id: 'MEDICAL', label: 'MEDICAL', category: 'medical' },
    { id: 'SECURITY', label: 'SECURITY', category: 'security' },
    { id: 'EMERGENCY', label: 'EMERGENCY', category: 'emergency' },
    { id: 'HOSTELS', label: 'HOSTELS', category: 'hostel' },
    { id: 'ACADEMIC', label: 'ACADEMIC', category: 'academic' },
    { id: 'FOOD', label: 'FOOD', category: 'food' }
  ];

  // Check URL query param for ?edit=1 or target
  useEffect(() => {
    if (searchParams.get('edit') === '1') {
      toggleEditMode(true);
    }
    const targetId = searchParams.get('target');
    if (targetId) {
      const match = locations.find(l => l.id === targetId);
      if (match) {
        setSelectedLocation(match);
      }
    }
  }, [searchParams]);

  // Map Initialization
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Real dimensions of SRMIST campus map: 683px width x 1024px height
    const bounds = [[0, 0], [1024, 683]];

    const map = L.map(mapRef.current, {
      crs: L.CRS.Simple,
      minZoom: -1.2,
      maxZoom: 2.8,
      zoomSnap: 0.1,
      zoomDelta: 0.4,
      zoomControl: false,
      attributionControl: false,
      bounceAtZoomLimits: false,
      maxBounds: [[-100, -100], [1124, 783]],
      maxBoundsViscosity: 0.85
    });

    leafletMap.current = map;

    // Base layer: real SRMIST campus map image overlay
    L.imageOverlay('/assets/srmist-campus-map.png', bounds).addTo(map);

    map.fitBounds(bounds, { padding: [10, 10] });

    markersGroup.current = L.layerGroup().addTo(map);

    map.on('click', (e) => {
      const clickedX = Math.round(e.latlng.lng);
      const clickedY = Math.round(e.latlng.lat);

      if (editMode) {
        setPendingCoord({ x: clickedX, y: clickedY });
        setEditingMarker(null);
        setEditorModalOpen(true);
      } else {
        // If navigation or card not focused, clicking empty map closes sheet
        if (!isNavigating) {
          // Keep card open if clicking pin, handled in pin click
        }
      }
    });

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // "You are here" User Marker (Google Maps Style Pulsing Blue Halo)
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const userIcon = L.divIcon({
      className: 'google-maps-user-marker',
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <div class="radar-ping" style="background-color: rgba(37, 99, 235, 0.45); width: 36px; height: 36px;"></div>
          <div style="
            width: 20px; 
            height: 20px; 
            border-radius: 50%; 
            background: #2563eb; 
            border: 3px solid #ffffff; 
            box-shadow: 0 4px 14px rgba(37,99,235,0.7); 
            z-index: 10;
            position: relative;
          "></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([userPosition.y, userPosition.x], {
      icon: userIcon,
      draggable: !isSimulatingWalk,
      zIndexOffset: 1200
    }).addTo(map);

    marker.on('dragend', (e) => {
      const latlng = e.target.getLatLng();
      updateUserPosition({
        x: Math.round(latlng.lng),
        y: Math.round(latlng.lat)
      });
      // Recalculate route if navigation active
      if (isNavigating && selectedLocation) {
        startRouteCalculation(selectedLocation, {
          x: Math.round(latlng.lng),
          y: Math.round(latlng.lat)
        });
      }
    });

    marker.bindTooltip("You Are Here (Drag to change location)", {
      direction: 'top',
      offset: [0, -12],
      className: 'bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-lg'
    });

    userMarkerRef.current = marker;
  }, [userPosition, isSimulatingWalk, isNavigating, selectedLocation]);

  // Render Marker Pins based on active filter
  useEffect(() => {
    const map = leafletMap.current;
    if (!map || !markersGroup.current) return;

    markersGroup.current.clearLayers();

    const getPinColor = (cat) => {
      switch (cat) {
        case 'emergency': return '#dc2626'; // Red
        case 'medical': return '#10b981';   // Emerald
        case 'security': return '#2563eb';  // Blue
        case 'academic': return '#4f46e5';  // Indigo
        case 'hostel': return '#d97706';    // Amber
        case 'food': return '#ea580c';      // Orange
        case 'gate': return '#9333ea';      // Purple
        default: return '#475569';          // Slate
      }
    };

    locations.forEach((loc) => {
      if (loc.x == null || loc.y == null) return;

      // Filter check
      if (activeCategory !== 'ALL') {
        const matchingChip = filterChips.find(c => c.id === activeCategory);
        if (matchingChip && matchingChip.category && loc.category !== matchingChip.category) {
          return;
        }
      }

      const color = getPinColor(loc.category);
      const isSelected = selectedLocation && selectedLocation.id === loc.id;

      const pinIcon = L.divIcon({
        className: 'google-maps-location-pin',
        html: `
          <div style="
            position: relative;
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50% 50% 50% 0;
            background: ${color};
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px ${color}88;
            border: 2px solid #ffffff;
            transition: all 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              width: ${isSelected ? '12px' : '9px'};
              height: ${isSelected ? '12px' : '9px'};
              border-radius: 50%;
              background: #ffffff;
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const marker = L.marker([loc.y, loc.x], {
        icon: pinIcon,
        draggable: editMode,
        zIndexOffset: isSelected ? 800 : 200
      });

      marker.on('click', () => {
        if (editMode) {
          setEditingMarker(loc);
          setEditorModalOpen(true);
        } else {
          setSelectedLocation(loc);
          // If already in navigation, switch destination to clicked location
          if (isNavigating) {
            startRouteCalculation(loc);
          }
        }
      });

      if (editMode) {
        marker.on('dragend', (e) => {
          const latlng = e.target.getLatLng();
          const updated = {
            ...loc,
            x: Math.round(latlng.lng),
            y: Math.round(latlng.lat)
          };
          updateLocation(updated);
        });
      }

      marker.bindTooltip(loc.name, {
        direction: 'top',
        offset: [0, -26],
        className: 'font-bold text-[11px] px-2 py-0.5 rounded shadow'
      });

      markersGroup.current.addLayer(marker);
    });
  }, [locations, activeCategory, selectedLocation, editMode, isNavigating]);

  // Route drawing & update
  const startRouteCalculation = (dest, customStart = null) => {
    const start = customStart || userPosition;
    const computedRoute = calculateCampusRoute(start, dest, dest.name);

    if (computedRoute) {
      setActiveRoute(computedRoute);
      setCurrentStepIndex(0);

      // Render polyline on Leaflet
      const map = leafletMap.current;
      if (map) {
        if (routeLineRef.current) {
          routeLineRef.current.remove();
        }

        // Google Maps highlighted blue walking route with road glow
        const routeLine = L.polyline(computedRoute.coordinates, {
          color: '#2563eb', // Google Maps vibrant blue
          weight: 6,
          opacity: 0.95,
          lineJoin: 'round',
          lineCap: 'round',
          dashArray: '2, 10' // Distinctive dotted walking path
        }).addTo(map);

        routeLineRef.current = routeLine;

        // Fly to fit the entire route
        map.flyToBounds(computedRoute.coordinates, {
          padding: [80, 80],
          duration: 0.8
        });
      }
    }
  };

  // Start Navigation handler
  const handleStartNavigation = (targetLoc) => {
    setSelectedLocation(targetLoc);
    setIsNavigating(true);
    startRouteCalculation(targetLoc);
  };

  // End Navigation
  const handleEndNavigation = () => {
    setIsNavigating(false);
    setIsSimulatingWalk(false);
    if (walkIntervalRef.current) {
      clearInterval(walkIntervalRef.current);
      walkIntervalRef.current = null;
    }
    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }
    setActiveRoute(null);
    setCurrentStepIndex(0);
  };

  // Simulate Walking animation along actual road nodes
  const handleToggleSimulateWalk = () => {
    if (isSimulatingWalk) {
      // Pause
      setIsSimulatingWalk(false);
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current);
        walkIntervalRef.current = null;
      }
    } else {
      if (!activeRoute || activeRoute.coordinates.length < 2) return;
      setIsSimulatingWalk(true);

      const pathCoords = activeRoute.coordinates;
      let currentIndex = 0;

      // Find closest node along path to current user pos
      let closestIdx = 0;
      let minD = Infinity;
      pathCoords.forEach((coord, idx) => {
        const d = Math.hypot(coord[1] - userPosition.x, coord[0] - userPosition.y);
        if (d < minD) {
          minD = d;
          closestIdx = idx;
        }
      });

      currentIndex = closestIdx;

      walkIntervalRef.current = setInterval(() => {
        currentIndex++;
        if (currentIndex < pathCoords.length) {
          const nextY = pathCoords[currentIndex][0];
          const nextX = pathCoords[currentIndex][1];
          updateUserPosition({ x: nextX, y: nextY });

          // Update step index
          const nextStepIdx = Math.min(currentIndex, activeRoute.steps.length - 1);
          setCurrentStepIndex(nextStepIdx);

          // Pan camera with user
          if (leafletMap.current) {
            leafletMap.current.panTo([nextY, nextX], { animate: true, duration: 0.5 });
          }
        } else {
          // Reached destination!
          setIsSimulatingWalk(false);
          clearInterval(walkIntervalRef.current);
          walkIntervalRef.current = null;
        }
      }, 900);
    }
  };

  // Clean up walking interval on unmount
  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current);
      }
    };
  }, []);

  // Autocomplete Search Logic
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const query = q.toLowerCase();
    const matches = locations
      .filter(loc => 
        loc.name.toLowerCase().includes(query) ||
        loc.category.toLowerCase().includes(query) ||
        (loc.description && loc.description.toLowerCase().includes(query)) ||
        (loc.notes && loc.notes.toLowerCase().includes(query))
      )
      .map(loc => ({
        ...loc,
        distMeters: loc.x != null ? Math.round(distanceBetween(userPosition, loc) * 1.8) : null
      }))
      .sort((a, b) => (a.distMeters || 9999) - (b.distMeters || 9999));

    setSearchResults(matches);
  };

  const handleSelectSearchResult = (loc) => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedLocation(loc);

    if (leafletMap.current && loc.x != null && loc.y != null) {
      leafletMap.current.flyTo([loc.y, loc.x], 1.2, { duration: 0.8 });
    }
  };

  // Recenter button
  const handleRecenter = () => {
    if (leafletMap.current) {
      leafletMap.current.flyTo([userPosition.y, userPosition.x], 1.2, { duration: 0.7 });
    }
  };

  // Reset map view
  const handleResetView = () => {
    if (leafletMap.current) {
      leafletMap.current.fitBounds([[0, 0], [1024, 683]], { padding: [10, 10], duration: 0.7 });
    }
  };

  // Live GPS handler
  const handleToggleRealGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    if (isLiveGpsActive) {
      setIsLiveGpsActive(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLiveGpsActive(true);
          // If on campus, maps smoothly; if remote, centers simulated position with notification
          alert(`GPS Connected (Accuracy ~${Math.round(pos.coords.accuracy)}m). Simulated Campus position active.`);
        },
        (err) => {
          alert('GPS permission denied or unavailable. Using simulated campus radar.');
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col relative w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. Google Maps Style Top Floating Search & Filter Bar */}
      {/* ------------------------------------------------------------- */}
      {!isNavigating ? (
        <div className="absolute top-3 inset-x-3 z-30 flex flex-col gap-2">
          
          {/* Search Box Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/home')}
              className="p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-md border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-white active:scale-95 transition-all shrink-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Google Search Style Bar */}
            <div className="flex-1 relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search SRM KTR buildings, hostels, labs..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {searchQuery ? (
                  <button
                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="absolute right-3 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    KTR
                  </div>
                )}
              </div>

              {/* Autocomplete Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-11 inset-x-0 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 max-h-64 overflow-y-auto space-y-1 z-50">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      data-search-id={result.id}
                      onClick={() => handleSelectSearchResult(result)}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                            {result.name}
                          </p>
                          <p className="text-[10px] text-slate-400 capitalize">
                            {result.category} · {result.hours || 'Campus facility'}
                          </p>
                        </div>
                      </div>

                      {result.distMeters != null && (
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                            ~{result.distMeters} m
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Filter Chips Carousel (ALL, MEDICAL, SECURITY, EMERGENCY, HOSTELS, ACADEMIC, FOOD) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
            {filterChips.map((chip) => {
              const isActive = activeCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveCategory(chip.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-tight whitespace-nowrap transition-all shadow-xs flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white ring-2 ring-blue-600/30'
                      : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  {chip.id === 'EMERGENCY' && <Flame className="w-3 h-3 text-red-500 fill-red-500" />}
                  {chip.id === 'MEDICAL' && <HeartPulse className="w-3 h-3 text-emerald-500" />}
                  {chip.id === 'SECURITY' && <ShieldCheck className="w-3 h-3 text-blue-500" />}
                  {chip.id === 'FOOD' && <Utensils className="w-3 h-3 text-orange-500" />}
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Marker Editor Banner (If edit mode active) */}
          {editMode && (
            <div className="p-2 rounded-2xl bg-amber-500/95 text-slate-950 shadow-md flex items-center justify-between text-xs font-bold animate-in fade-in">
              <div className="flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-slate-950" />
                <span>Marker Editor: Tap pin or click map to place</span>
              </div>
              <button
                onClick={() => {
                  setEditingMarker(null);
                  setEditorModalOpen(true);
                }}
                className="bg-black text-white px-2 py-0.5 rounded-lg text-[10px] font-bold"
              >
                Export JSON
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Top Turn-by-Turn Navigation Banner */
        <NavigationBanner
          currentStep={activeRoute?.steps[currentStepIndex]}
          nextStep={activeRoute?.steps[currentStepIndex + 1]}
          totalDistance={activeRoute?.distanceMeters}
          onClose={handleEndNavigation}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Map Canvas (Leaflet L.CRS.Simple with real SRMIST Map) */}
      {/* ------------------------------------------------------------- */}
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* ------------------------------------------------------------- */}
      {/* 3. Floating Quick Actions (Emergency Nearby & Recenter) */}
      {/* ------------------------------------------------------------- */}
      
      {/* Emergency Nearby Floating Pill (Google Maps Quick Assist style) */}
      {!isNavigating && (
        <div className="absolute left-3 bottom-20 z-30">
          <button
            onClick={() => setShowEmergencyNearby(true)}
            className="flex items-center gap-2 py-2.5 px-3.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs shadow-xl shadow-red-600/40 ring-2 ring-red-400/50 transition-all group"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>Emergency Nearby</span>
          </button>
        </div>
      )}

      {/* Right-Side Floating Map Controls */}
      <div className="absolute right-3 bottom-20 z-30 flex flex-col gap-2">
        
        {/* Recenter Button (Google Maps target icon) */}
        <button
          onClick={handleRecenter}
          title="Recenter on your location"
          className="p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200/90 dark:border-slate-800 text-blue-600 dark:text-blue-400 hover:bg-white active:scale-95 transition-all"
          aria-label="Recenter location"
        >
          <Crosshair className="w-5 h-5" />
        </button>

        {/* Reset View Button */}
        <button
          onClick={handleResetView}
          title="Reset map view"
          className="p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white active:scale-95 transition-all"
          aria-label="Reset view"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden">
          <button
            onClick={() => leafletMap.current && leafletMap.current.zoomIn()}
            className="p-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="border-t border-slate-200 dark:border-slate-800" />
          <button
            onClick={() => leafletMap.current && leafletMap.current.zoomOut()}
            className="p-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Legend Toggle */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          title="Toggle Legend"
          className={`p-3 rounded-2xl shadow-xl border transition-all active:scale-95 ${
            showLegend
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800'
          }`}
          aria-label="Map legend"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Marker Editor Toggle */}
        <button
          onClick={() => toggleEditMode()}
          title="Toggle Marker Editor Mode"
          className={`p-3 rounded-2xl shadow-xl border transition-all active:scale-95 ${
            editMode
              ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800'
          }`}
          aria-label="Marker editor"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Collapsible Map Legend Overlay */}
      {/* ------------------------------------------------------------- */}
      {showLegend && (
        <div className="absolute left-3 bottom-32 z-30 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 text-xs animate-in slide-in-from-left duration-200 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <span className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider">
              SRM Campus Legend
            </span>
            <button onClick={() => setShowLegend(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
              <span>Emergency & Trauma</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <span>SRM Hospital & Dental</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
              <span>Security & Control Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
              <span>Academic Departments & Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <span>Student Hostels & Mess</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
              <span>Food Courts & Dining</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 border border-white shrink-0 animate-ping" />
              <span>Live Position (Draggable)</span>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. Location Details Bottom Sheet (Matching bell-block-card.png) */}
      {/* ------------------------------------------------------------- */}
      {!isNavigating && (
        <MarkerSheet
          location={selectedLocation}
          allLocations={locations}
          userPosition={userPosition}
          isNavigating={isNavigating}
          onClose={() => setSelectedLocation(null)}
          onStartNavigation={handleStartNavigation}
          onSelectOtherLocation={(other) => {
            setSelectedLocation(other);
            if (leafletMap.current && other.x != null && other.y != null) {
              leafletMap.current.flyTo([other.y, other.x], 1.2, { duration: 0.8 });
            }
          }}
          onCallLocation={(loc) => {
            startCall({
              name: loc.name,
              role: 'Campus Location Facility',
              phone: loc.contact || '+91 98765 43210 (DEMO)'
            });
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. Active Navigation Bottom Drawer (Google Maps Style) */}
      {/* ------------------------------------------------------------- */}
      {isNavigating && (
        <NavigationBottomBar
          route={activeRoute}
          currentStepIndex={currentStepIndex}
          isSimulating={isSimulatingWalk}
          onToggleSimulate={handleToggleSimulateWalk}
          onEndNavigation={handleEndNavigation}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. Emergency Nearby Quick Drawer Modal */}
      {/* ------------------------------------------------------------- */}
      {showEmergencyNearby && (
        <EmergencyNearbyModal
          onClose={() => setShowEmergencyNearby(false)}
          onSelectFacilityForRoute={(fac) => {
            handleStartNavigation(fac);
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. Marker Editor Modal */}
      {/* ------------------------------------------------------------- */}
      {editorModalOpen && (
        <MarkerEditorModal
          selectedLocation={editingMarker}
          pendingCoord={pendingCoord}
          onClose={() => {
            setEditorModalOpen(false);
            setEditingMarker(null);
            setPendingCoord(null);
          }}
          onSave={() => {
            setEditorModalOpen(false);
            setEditingMarker(null);
            setPendingCoord(null);
          }}
        />
      )}

    </div>
  );
}
