import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <SettingsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext; 