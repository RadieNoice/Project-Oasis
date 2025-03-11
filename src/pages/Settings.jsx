import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useSettings } from "../contexts/SettingsContext";
import {
  User,
  Palette,
  Bell,
  Database,
  HelpCircle,
  ChevronRight,
  Shield
} from "lucide-react";
import AccountSettings from "../components/settings/AccountSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import DataBackupSettings from "../components/settings/DataBackupSettings";
import HelpSupportSettings from "../components/settings/HelpSupportSettings";
import PrivacySettings from "../components/settings/PrivacySettings";

const Settings = () => {
  const { isLightTheme, toggleTheme } = useTheme();
  const { activeTab, setActiveTab } = useSettings();
  const [theme, setTheme] = useState(isLightTheme ? "light" : "dark");

  useEffect(() => {
    setTheme(isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "light") {
      toggleTheme();
    } else if (newTheme === "dark") {
      toggleTheme();
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: <User className="h-5 w-5" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="h-5 w-5" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="h-5 w-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { id: "data", label: "Data & Backups", icon: <Database className="h-5 w-5" /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings isLightTheme={isLightTheme} />;
      case "privacy":
        return <PrivacySettings isLightTheme={isLightTheme} />;
      case "appearance":
        return <AppearanceSettings isLightTheme={isLightTheme} theme={theme} handleThemeChange={handleThemeChange} />;
      case "notifications":
        return <NotificationSettings isLightTheme={isLightTheme} />;
      case "data":
        return <DataBackupSettings isLightTheme={isLightTheme} />;
      case "help":
        return <HelpSupportSettings isLightTheme={isLightTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
            <h2 className={`text-xl font-semibold mb-6 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
              Settings
            </h2>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? isLightTheme
                        ? "bg-blue-500 text-white"
                        : "bg-blue-600 text-white"
                      : isLightTheme
                      ? "text-gray-700 hover:bg-gray-200"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
