import React, { createContext, useContext, useState, useEffect } from 'react';
import initialLocations from '../data/locations.json';
import initialAlerts from '../data/alerts.json';
import initialContacts from '../data/contacts.json';
import safetyData from '../data/safetyTips.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('campussafe_auth') !== 'false';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campussafe_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'User',
      regNo: 'RA2411003010142',
      email: 'user@srmist.edu.in',
      dept: 'B.Tech Computer Science & Engg.',
      phone: '+91 98401 23456',
      hostel: 'Kaari Hostel, Room 412'
    };
  });

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('campussafe_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('campussafe_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('campussafe_theme', 'light');
    }
  }, [darkMode]);

  // Locations & Custom Markers
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('campussafe_locations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved locations', e);
      }
    }
    return initialLocations;
  });

  const saveLocations = (newLocs) => {
    setLocations(newLocs);
    localStorage.setItem('campussafe_locations', JSON.stringify(newLocs));
  };

  const updateLocation = (updated) => {
    const next = locations.map(loc => loc.id === updated.id ? updated : loc);
    saveLocations(next);
  };

  const addLocation = (newLoc) => {
    const next = [...locations, newLoc];
    saveLocations(next);
  };

  const resetLocationsToDefault = () => {
    saveLocations(initialLocations);
  };

  // User Simulated Position (Leaflet [y, x]: default near BELL Block: y=514, x=310)
  const [userPosition, setUserPosition] = useState(() => {
    const saved = localStorage.getItem('campussafe_user_pos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { x: 340, y: 490 }; // near Tech park / BELL block
  });

  const updateUserPosition = (pos) => {
    setUserPosition(pos);
    localStorage.setItem('campussafe_user_pos', JSON.stringify(pos));
  };

  // Marker Edit Mode
  const [editMode, setEditMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('edit') === '1' || localStorage.getItem('campussafe_edit_mode') === 'true';
  });

  const toggleEditMode = (val) => {
    const next = typeof val === 'boolean' ? val : !editMode;
    setEditMode(next);
    localStorage.setItem('campussafe_edit_mode', next ? 'true' : 'false');
  };

  // Live Location Sharing
  const [isSharingLive, setIsSharingLive] = useState(() => {
    return localStorage.getItem('campussafe_live_sharing') === 'true';
  });

  const toggleLiveSharing = (val) => {
    const next = typeof val === 'boolean' ? val : !isSharingLive;
    setIsSharingLive(next);
    localStorage.setItem('campussafe_live_sharing', next ? 'true' : 'false');
  };

  // Permissions & Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationAccessEnabled, setLocationAccessEnabled] = useState(true);
  const [language, setLanguage] = useState('English');

  // SOS state
  const [sosActive, setSosActive] = useState(false);
  const [sosTimestamp, setSosTimestamp] = useState(null);
  const [sosNearestPost, setSosNearestPost] = useState(null);

  const triggerSos = (nearestPost) => {
    setSosActive(true);
    setSosTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ', ' + new Date().toLocaleDateString());
    setSosNearestPost(nearestPost || 'SRM Main Security Post (Control Room)');
  };

  const cancelSos = () => {
    setSosActive(false);
    setSosTimestamp(null);
    setSosNearestPost(null);
  };

  // Simulated Call
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer;
    if (activeCall) {
      timer = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [activeCall]);

  const startCall = (contact) => {
    setActiveCall({
      contact,
      status: 'connected',
      muted: false,
      speaker: false
    });
  };

  const endCall = () => {
    setActiveCall(null);
    setCallDuration(0);
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('campussafe_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('campussafe_auth', 'false');
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      user,
      darkMode,
      setDarkMode,
      locations,
      updateLocation,
      addLocation,
      resetLocationsToDefault,
      userPosition,
      updateUserPosition,
      editMode,
      toggleEditMode,
      isSharingLive,
      toggleLiveSharing,
      notificationsEnabled,
      setNotificationsEnabled,
      locationAccessEnabled,
      setLocationAccessEnabled,
      language,
      setLanguage,
      sosActive,
      sosTimestamp,
      sosNearestPost,
      triggerSos,
      cancelSos,
      activeCall,
      startCall,
      endCall,
      callDuration,
      alerts: initialAlerts,
      contacts: initialContacts,
      safetyData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
