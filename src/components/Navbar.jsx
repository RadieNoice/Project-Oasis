import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Settings,
  Plus,
  X,
  Search,
  Moon,
  Sun,
  LogOut,
  User,
  ChevronDown,
  Shield,
  BookOpen,
  MousePointer,
  Clock,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLightTheme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New achievement unlocked", read: false, time: "10m ago" },
    { id: 2, title: "Task completed", read: true, time: "1h ago" },
    { id: 3, title: "New feature available", read: false, time: "1d ago" },
  ]);

  const profileMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);

  // Mapping of route paths to display labels and icons
  const pathLabels = {
    "/dashboard": { label: "Dashboard", icon: "grid" },
    "/pomodoro": { label: "Pomodoro", icon: "clock" },
    "/calendar": { label: "Calendar", icon: "calendar" },
    "/bookshelf": { label: "Book Shelf", icon: "book" },
    "/ai-tools": { label: "AI Assistant", icon: "bot" },
    "/inbox": { label: "Inbox", icon: "inbox" },
    "/achievements": { label: "Achievements", icon: "award" },
    "/leaderboard": { label: "Leaderboard", icon: "bar-chart" },
    "/chat": { label: "Chat", icon: "message-circle" },
    "/profile": { label: "Profile", icon: "user" },
  };

  // State to track opened "tabs" as objects { path, label, icon }
  const [tabs, setTabs] = useState([]);

  // Handle clicks outside of dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When the location changes, add the new route as a tab if not already added
  useEffect(() => {
    const currentPath = location.pathname;
    const pathInfo = pathLabels[currentPath] || {
      label: "Unknown",
      icon: "file",
    };

    setTabs((prevTabs) => {
      if (prevTabs.some((tab) => tab.path === currentPath)) {
        return prevTabs;
      }
      return [
        ...prevTabs,
        {
          path: currentPath,
          label: pathInfo.label,
          icon: pathInfo.icon,
        },
      ];
    });
  }, [location]);

  // State to control dropdown visibility when clicking the Plus button
  const [showPageMenu, setShowPageMenu] = useState(false);

  // Current time state and effect (updates every second)
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time in 12-hour format
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes} ${ampm}`;
  };

  // Format date for displaying
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // When a page is selected from the dropdown, navigate to it and close the menu
  const handleSelectPage = (path) => {
    navigate(path);
    setShowPageMenu(false);
  };

  // Plus button toggles the dropdown of available pages
  const handleAddTab = () => {
    setShowPageMenu((prev) => !prev);
  };

  // Function to close a tab; if the closed tab is active, navigate to a fallback
  const handleCloseTab = (index, e) => {
    e.stopPropagation();
    setTabs((prevTabs) => {
      const tabToClose = prevTabs[index];
      const newTabs = prevTabs.filter((_, i) => i !== index);

      if (tabToClose.path === location.pathname) {
        if (newTabs.length > 0) {
          const newActiveTab = newTabs[index - 1] || newTabs[0];
          navigate(newActiveTab.path);
        } else {
          navigate("/");
        }
      }
      return newTabs;
    });
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    console.log('Theme toggle button clicked');
    toggleTheme();
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/profile");
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get unread notification count
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative ${isLightTheme ? 'bg-gray-100/80 border-b border-gray-300/30' : 'bg-gray-900/80 border-b border-gray-800/30'} backdrop-blur-lg z-50`}
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo, search and tabs */}
          <div className="flex items-center space-x-4">
            {/* Logo/App Name */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 relative group"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Oasis
              <span className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></span>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>

            {/* Tabs Section */}
            <div
              className="relative flex items-center space-x-2"
              onMouseLeave={() => setShowPageMenu(false)}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-xl ${isLightTheme ? 'bg-gray-200/50 hover:bg-gray-300 text-gray-700' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'} transition-colors`}
                onClick={handleAddTab}
              >
                <Plus className="h-5 w-5" />
              </motion.button>

              {/* Dropdown Menu for Pages */}
              <AnimatePresence>
                {showPageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute left-0 top-full mt-2 ${isLightTheme ? 'bg-gray-100/95 border border-gray-300/50' : 'bg-gray-900/95 border border-gray-700/50'} rounded-lg shadow-lg z-50 backdrop-blur-sm overflow-hidden`}
                  >
                    {Object.entries(pathLabels).map(([path, { label }]) => (
                      <div
                        key={path}
                        className={`px-4 py-2.5 ${isLightTheme ? 'text-gray-700 hover:bg-gray-200/70' : 'text-gray-300 hover:bg-gray-800/70'} cursor-pointer transition-colors flex items-center gap-2`}
                        onClick={() => handleSelectPage(path)}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500/70"></div>
                        {label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tabs List */}
              <div className="flex items-center space-x-2 ml-2">
                <AnimatePresence mode="popLayout">
                  {tabs.map((tab, index) => (
                    <motion.div
                      key={tab.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10, scale: 0.9 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md 
                        ${
                          tab.path === location.pathname
                            ? isLightTheme 
                              ? "bg-gray-200 text-blue-600 border border-blue-500/30"
                              : "bg-gray-800 text-blue-400 border border-blue-500/30"
                            : isLightTheme
                              ? "bg-gray-200/50 text-gray-600 border border-transparent hover:border-gray-300/50"
                              : "bg-gray-800/50 text-gray-400 border border-transparent hover:border-gray-700/50"
                        } 
                        transition-all duration-200 cursor-pointer`}
                      onClick={() => navigate(tab.path)}
                    >
                      <span className="text-sm font-medium">{tab.label}</span>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleCloseTab(index, e)}
                        className="p-0.5 rounded-full hover:bg-gray-700/70"
                      >
                        <X className={`h-3 w-3 ${isLightTheme ? 'text-gray-500 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300'}`} />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Section: Date, Icons, and User Profile */}
          <div className="flex items-center gap-4">
            {/* Date and Time Display */}
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs text-gray-500">
                {formatDate(currentTime)}
              </span>
              <span className={`text-sm font-medium ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                {formatTime(currentTime)}
              </span>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl ${isLightTheme ? 'bg-gray-200/50 hover:bg-gray-300 text-gray-700' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'} transition-colors`}
              onClick={handleThemeToggle}
            >
              {!isLightTheme ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notificationMenuRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-xl ${isLightTheme ? 'bg-gray-200/50 hover:bg-gray-300 text-gray-700' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'} transition-colors`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                    {unreadNotificationsCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 top-full mt-2 w-72 ${isLightTheme ? 'bg-gray-100/95 border border-gray-300/60' : 'bg-gray-900/95 border border-gray-800/60'} rounded-lg shadow-xl z-50 backdrop-blur-sm overflow-hidden`}
                  >
                    <div className={`p-3 ${isLightTheme ? 'border-b border-gray-300/60' : 'border-b border-gray-800/60'} flex justify-between items-center`}>
                      <h3 className={`text-sm font-medium ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                        Notifications
                      </h3>
                      <button
                        className="text-xs text-blue-400 hover:text-blue-300"
                        onClick={markAllAsRead}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-800/30 hover:bg-gray-800/50 cursor-pointer ${
                              !notification.read ? "bg-blue-900/10" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {!notification.read && (
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                              )}
                              <div className={!notification.read ? "" : "ml-5"}>
                                <div className="text-sm text-gray-300">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-800/60 text-center">
                      <button
                        className="text-xs text-blue-400 hover:text-blue-300 py-1"
                        onClick={() => navigate("/inbox")}
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl ${isLightTheme ? 'bg-gray-200/50 hover:bg-gray-300 text-gray-700' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'} transition-colors`}
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4.5 w-4.5" />
            </motion.button>

            {/* User Profile */}
            <div className="relative" ref={profileMenuRef}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 group cursor-pointer pl-2 pr-1 py-1 rounded-lg ${isLightTheme ? 'hover:bg-gray-200/70' : 'hover:bg-gray-800/70'} transition-colors`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className={`text-sm font-medium ${isLightTheme ? 'text-gray-700' : 'text-gray-300'} hidden md:block`}>
                  {user?.username || "Guest"}
                </span>
                <div className="relative">
                  <div
                    className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                    flex items-center justify-center text-white font-medium shadow-lg
                    group-hover:ring-2 group-hover:ring-blue-400/50 transition-all duration-300"
                  >
                    {user?.username?.[0]?.toUpperCase() || "G"}
                  </div>
                  <div
                    className="absolute inset-0 rounded-full animate-pulse ring-2 ring-blue-400/30 
                    group-hover:animate-none"
                  />
                </div>
                <ChevronDown
                  className={`h-4 w-4 ${isLightTheme ? 'text-gray-500' : 'text-gray-500'} transition-transform duration-300`}
                  style={{
                    transform: showProfileMenu
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </motion.div>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 top-full mt-2 w-56 ${isLightTheme ? 'bg-gray-100/95 border border-gray-300/60' : 'bg-gray-900/95 border border-gray-800/60'} rounded-lg shadow-xl z-50 backdrop-blur-sm overflow-hidden`}
                  >
                    {/* User Info Card */}
                    <div className={`p-4 ${isLightTheme ? 'border-b border-gray-300/60' : 'border-b border-gray-800/60'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                          flex items-center justify-center text-white text-lg font-medium shadow-lg"
                        >
                          {user?.username?.[0]?.toUpperCase() || "G"}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                            {user?.username || "Guest"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user?.email || "guest@example.com"}
                          </div>
                        </div>
                      </div>

                      <div className={`${isLightTheme ? 'bg-gray-200/50' : 'bg-gray-800/50'} rounded-md p-2 text-center`}>
                        <div className="text-xs text-gray-500">Membership</div>
                        <div className="text-sm text-blue-400 font-medium">
                          Premium
                        </div>
                      </div>
                    </div>

                    {/* Menu Options */}
                    <div className="py-1">
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${isLightTheme ? 'hover:bg-gray-200/70 text-gray-700' : 'hover:bg-gray-800/70 text-gray-300'} cursor-pointer text-sm`}
                        onClick={handleProfileClick}
                      >
                        <User className={`h-4 w-4 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
                        Profile
                      </div>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${isLightTheme ? 'hover:bg-gray-200/70 text-gray-700' : 'hover:bg-gray-800/70 text-gray-300'} cursor-pointer text-sm`}
                        onClick={() => navigate("/settings")}
                      >
                        <Settings className={`h-4 w-4 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
                        Settings
                      </div>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${isLightTheme ? 'hover:bg-gray-200/70 text-gray-700' : 'hover:bg-gray-800/70 text-gray-300'} cursor-pointer text-sm`}
                        onClick={() => navigate("/bookshelf")}
                      >
                        <BookOpen className={`h-4 w-4 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
                        My Resources
                      </div>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${isLightTheme ? 'hover:bg-gray-200/70 text-gray-700' : 'hover:bg-gray-800/70 text-gray-300'} cursor-pointer text-sm`}
                        onClick={() => navigate("/privacy")}
                      >
                        <Shield className={`h-4 w-4 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
                        Privacy
                      </div>
                    </div>

                    {/* Logout */}
                    <div className={`${isLightTheme ? 'border-t border-gray-300/60' : 'border-t border-gray-800/60'} py-2`}>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${isLightTheme ? 'hover:bg-gray-200/70' : 'hover:bg-gray-800/70'} cursor-pointer text-sm text-red-400`}
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className={`absolute bottom-0 left-0 w-full h-px ${isLightTheme ? 'bg-gradient-to-r from-transparent via-blue-400/10 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400/20 to-transparent'}`} />
      <div className={`absolute top-0 left-1/4 w-1/2 h-px ${isLightTheme ? 'bg-gradient-to-r from-transparent via-purple-400/5 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-400/10 to-transparent'}`} />
    </motion.nav>
  );
};

export default Navbar;
