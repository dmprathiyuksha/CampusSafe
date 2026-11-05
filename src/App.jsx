import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import PhoneFrame from './components/PhoneFrame';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AlertsScreen from './screens/AlertsScreen';
import CampusMapScreen from './screens/CampusMapScreen';
import SosScreen from './screens/SosScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import SafetyInstructionsScreen from './screens/SafetyInstructionsScreen';
import SafetyTipsScreen from './screens/SafetyTipsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LiveShareScreen from './screens/LiveShareScreen';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PhoneFrame>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/alerts" element={<AlertsScreen />} />
            <Route path="/map" element={<CampusMapScreen />} />
            <Route path="/sos" element={<SosScreen />} />
            <Route path="/contacts" element={<EmergencyContactsScreen />} />
            <Route path="/safety-instructions" element={<SafetyInstructionsScreen />} />
            <Route path="/safety-tips" element={<SafetyTipsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/live-share" element={<LiveShareScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneFrame>
      </BrowserRouter>
    </AppProvider>
  );
}
