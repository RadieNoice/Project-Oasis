import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Monitor,
  Lock,
  Layers,
  HelpCircle,
  Download,
  Check,
  Clock,
  Moon,
  Sun,
  Cpu,
  Globe,
  AlertCircle,
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  Briefcase,
  Save,
  Settings,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import SpotlightCard from "../components/reactbits/SpotlightCard";

const Setting = () => {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({
    show: false,
    text: "",
    type: "",
  });

  // Theme settings
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("blue");

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    reminders: true,
    updates: true,
    achievements: true,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showActivity: true,
    shareStats: false,
    allowDataCollection: true,
  });

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    username: user?.username || "User",
    email: user?.email || "user@example.com",
    timezone: "UTC-5 (Eastern Time)",
    language: "English",
  });

  // Integration settings
  const [integrations, setIntegrations] = useState({
    google: true,
    github: false,
    slack: false,
    notion: true,
  });

  // Helper functions for UI interaction
  const handleToggle = (settingGroup, settingName) => {
    switch (settingGroup) {
      case "notification":
        setNotificationSettings((prev) => ({
          ...prev,
          [settingName]: !prev[settingName],
        }));
        break;
      case "privacy":
        setPrivacySettings((prev) => ({
          ...prev,
          [settingName]: !prev[settingName],
        }));
        break;
      case "integration":
        setIntegrations((prev) => ({
          ...prev,
          [settingName]: !prev[settingName],
        }));
        break;
      default:
        break;
    }
  };

  // Account settings input change handler
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save settings
  const handleSaveSettings = () => {
    setIsSaving(true);

    // Mock API call with setTimeout
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({
        show: true,
        text: "Settings saved successfully",
        type: "success",
      });

      // Hide the message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ show: false, text: "", type: "" });
      }, 3000);
    }, 1000);
  };

  // Toggle switch component
  const ToggleSwitch = ({ isOn, onToggle, size = "default" }) => {
    return (
      <motion.div
        className={`relative cursor-pointer rounded-full ${
          size === "small" ? "w-8 h-4" : "w-12 h-6"
        } ${isOn ? "bg-blue-500" : "bg-gray-700"}`}
        onClick={onToggle}
      >
        <motion.div
          className={`absolute ${
            size === "small" ? "w-3 h-3 top-0.5" : "w-5 h-5 top-0.5"
          } bg-white rounded-full`}
          initial={false}
          animate={{
            left: isOn
              ? size === "small"
                ? "calc(100% - 14px)"
                : "calc(100% - 22px)"
              : "2px",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    );
  };

  // Color picker option
  const ColorOption = ({ color, isSelected, onClick }) => {
    return (
      <motion.div
        className={`h-8 w-8 rounded-full cursor-pointer relative ${
          color === "blue"
            ? "bg-blue-500"
            : color === "purple"
            ? "bg-purple-500"
            : color === "green"
            ? "bg-green-500"
            : color === "amber"
            ? "bg-amber-500"
            : "bg-pink-500"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(color)}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 max-w-6xl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 md:mb-0"
        >
          Settings
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {saveMessage.show && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`px-4 py-2 rounded-lg ${
                saveMessage.type === "success"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {saveMessage.text}
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-1">
          <SpotlightCard
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-4 sticky top-6"
            spotlightColor="rgba(255, 255, 255, 0.07)"
          >
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "account"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Account</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "notifications"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="font-medium">Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "appearance"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Monitor className="h-5 w-5" />
                <span className="font-medium">Appearance</span>
              </button>

              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "privacy"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Lock className="h-5 w-5" />
                <span className="font-medium">Privacy</span>
              </button>

              <button
                onClick={() => setActiveTab("integrations")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "integrations"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Layers className="h-5 w-5" />
                <span className="font-medium">Integrations</span>
              </button>

              <button
                onClick={() => setActiveTab("backups")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "backups"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Download className="h-5 w-5" />
                <span className="font-medium">Data & Backups</span>
              </button>

              <button
                onClick={() => setActiveTab("help")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "help"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">Help & Support</span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800/40">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveSettings}
                disabled={isSaving}
                className={`w-full py-2.5 ${
                  isSaving
                    ? "bg-blue-600/50"
                    : "bg-blue-600/80 hover:bg-blue-500/80"
                } text-white rounded-lg flex items-center justify-center gap-2 transition-all`}
              >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </motion.button>
            </div>
          </SpotlightCard>
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {/* Account Settings */}
            {activeTab === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Account Settings
                    </h2>
                    <User size={20} className="text-gray-500" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={accountSettings.username}
                        onChange={handleAccountChange}
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2.5 text-gray-300 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={accountSettings.email}
                        onChange={handleAccountChange}
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2.5 text-gray-300 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Language
                        </label>
                        <select
                          name="language"
                          value={accountSettings.language}
                          onChange={handleAccountChange}
                          className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2.5 text-gray-300 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Timezone
                        </label>
                        <select
                          name="timezone"
                          value={accountSettings.timezone}
                          onChange={handleAccountChange}
                          className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2.5 text-gray-300 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                        >
                          <option value="UTC-8 (Pacific Time)">
                            UTC-8 (Pacific Time)
                          </option>
                          <option value="UTC-7 (Mountain Time)">
                            UTC-7 (Mountain Time)
                          </option>
                          <option value="UTC-6 (Central Time)">
                            UTC-6 (Central Time)
                          </option>
                          <option value="UTC-5 (Eastern Time)">
                            UTC-5 (Eastern Time)
                          </option>
                          <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                          <option value="UTC+1 (CET)">UTC+1 (CET)</option>
                          <option value="UTC+8 (CST)">UTC+8 (CST)</option>
                          <option value="UTC+9 (JST)">UTC+9 (JST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40">
                      <h3 className="text-md font-medium text-gray-300 mb-3">
                        Subscription
                      </h3>
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-blue-400 font-medium mb-1">
                              Premium Plan
                            </div>
                            <div className="text-sm text-gray-400">
                              Your subscription renews on April 15, 2025
                            </div>
                          </div>
                          <div className="bg-blue-500/30 text-blue-300 px-3 py-1 rounded-md text-sm font-medium">
                            Active
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          Manage subscription
                        </button>
                        <span className="mx-2 text-gray-600">•</span>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          View billing history
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40 space-y-4">
                      <h3 className="text-md font-medium text-gray-300">
                        Account Management
                      </h3>

                      <button className="w-full py-2.5 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all border border-gray-700/50">
                        Change Password
                      </button>

                      <button className="w-full py-2.5 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg flex items-center justify-center gap-2 transition-all border border-red-900/30">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Notification Settings
                    </h2>
                    <Bell size={20} className="text-gray-500" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-300 mb-4">
                        Notification Channels
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-gray-800/40 px-4 py-3 rounded-lg border border-gray-700/30">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="text-gray-300">
                                Email Notifications
                              </div>
                              <div className="text-sm text-gray-500">
                                Receive updates via email
                              </div>
                            </div>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.email}
                            onToggle={() =>
                              handleToggle("notification", "email")
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between bg-gray-800/40 px-4 py-3 rounded-lg border border-gray-700/30">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="text-gray-300">
                                Push Notifications
                              </div>
                              <div className="text-sm text-gray-500">
                                Receive alerts on your device
                              </div>
                            </div>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.push}
                            onToggle={() =>
                              handleToggle("notification", "push")
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between bg-gray-800/40 px-4 py-3 rounded-lg border border-gray-700/30">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="text-gray-300">
                                In-App Notifications
                              </div>
                              <div className="text-sm text-gray-500">
                                Receive notifications within the app
                              </div>
                            </div>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.inApp}
                            onToggle={() =>
                              handleToggle("notification", "inApp")
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40">
                      <h3 className="text-md font-medium text-gray-300 mb-4">
                        Notification Types
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-300">
                              Reminders & Due Dates
                            </span>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.reminders}
                            onToggle={() =>
                              handleToggle("notification", "reminders")
                            }
                            size="small"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-300">
                              Product Updates
                            </span>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.updates}
                            onToggle={() =>
                              handleToggle("notification", "updates")
                            }
                            size="small"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-300">
                              Achievements & Milestones
                            </span>
                          </div>
                          <ToggleSwitch
                            isOn={notificationSettings.achievements}
                            onToggle={() =>
                              handleToggle("notification", "achievements")
                            }
                            size="small"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/40">
                      <h3 className="text-md font-medium text-gray-300 mb-4">
                        Notification Schedule
                      </h3>

                      <div className="space-y-3">
                        <div className="grid grid-cols-7 gap-2">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <div
                              key={day}
                              className="bg-gray-800/40 hover:bg-gray-700/50 border border-gray-700/30 rounded-md p-2.5 flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <span className="text-sm text-gray-300">
                                {day}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <label className="text-sm text-gray-400">
                            Quiet Hours
                          </label>
                          <div className="flex items-center gap-2">
                            <select className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1.5 text-gray-300 text-sm focus:ring-1 focus:ring-blue-500/40 focus:outline-none">
                              <option>10:00 PM</option>
                              <option>11:00 PM</option>
                              <option>12:00 AM</option>
                            </select>
                            <span className="text-gray-500">to</span>
                            <select className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1.5 text-gray-300 text-sm focus:ring-1 focus:ring-blue-500/40 focus:outline-none">
                              <option>6:00 AM</option>
                              <option>7:00 AM</option>
                              <option>8:00 AM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Appearance Settings
                    </h2>
                    <Monitor size={20} className="text-gray-500" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-300 mb-4">
                        Theme
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          className={`cursor-pointer border ${
                            theme === "dark"
                              ? "border-blue-500"
                              : "border-gray-700/50"
                          } rounded-lg overflow-hidden`}
                          onClick={() => setTheme("dark")}
                        >
                          <div className="h-24 bg-gray-900 relative">
                            <div className="absolute top-3 left-3 right-3 h-3 bg-gray-800 rounded"></div>
                            <div className="absolute top-9 left-3 w-1/2 h-3 bg-gray-800 rounded"></div>
                            <div className="absolute bottom-3 left-3 right-3 h-8 bg-gray-800 rounded"></div>
                            {theme === "dark" && (
                              <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-3 text-center text-sm text-gray-400">
                            Dark
                          </div>
                        </div>

                        <div
                          className={`cursor-pointer border ${
                            theme === "light"
                              ? "border-blue-500"
                              : "border-gray-700/50"
                          } rounded-lg overflow-hidden`}
                          onClick={() => setTheme("light")}
                        >
                          <div className="h-24 bg-gray-200 relative">
                            <div className="absolute top-3 left-3 right-3 h-3 bg-white rounded"></div>
                            <div className="absolute top-9 left-3 w-1/2 h-3 bg-white rounded"></div>
                            <div className="absolute bottom-3 left-3 right-3 h-8 bg-white rounded"></div>
                            {theme === "light" && (
                              <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-3 text-center text-sm text-gray-400">
                            Light
                          </div>
                        </div>

                        <div
                          className={`cursor-pointer border ${
                            theme === "system"
                              ? "border-blue-500"
                              : "border-gray-700/50"
                          } rounded-lg overflow-hidden`}
                          onClick={() => setTheme("system")}
                        >
                          <div className="h-24 bg-gradient-to-br from-gray-900 to-gray-200 relative">
                            <div className="absolute top-3 left-3 right-3 h-3 bg-gray-700/50 rounded"></div>
                            <div className="absolute top-9 left-3 w-1/2 h-3 bg-gray-700/50 rounded"></div>
                            <div className="absolute bottom-3 left-3 right-3 h-8 bg-gray-700/50 rounded"></div>
                            {theme === "system" && (
                              <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-3 text-center text-sm text-gray-400">
                            System
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Setting;
