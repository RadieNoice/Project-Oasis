import React from "react";
import { motion } from "framer-motion";
import { Bell, Settings, Plus, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Mapping of route paths to display labels
  const pathLabels = {
    "/": "Dashboard",
    "/calendar": "Calendar",
    "/bookshelf": "Book Shelf",
    "/ai-tools": "AI Assistant",
    "/inbox": "Inbox",
    "/achievements": "Achievements",
    "/leaderboard": "Leaderboard",
    "/chat": "Chat",
  };

  // State to track opened "tabs" as objects { path, label }
  const [tabs, setTabs] = React.useState([]);

  // When the location changes, add the new route as a tab if not already added.
  React.useEffect(() => {
    const currentPath = location.pathname;
    const label = pathLabels[currentPath] || "Unknown";
    setTabs((prevTabs) => {
      if (prevTabs.some((tab) => tab.path === currentPath)) {
        return prevTabs;
      }
      return [...prevTabs, { path: currentPath, label }];
    });
  }, [location, pathLabels]);

  // State to control dropdown visibility when clicking the Plus button
  const [showPageMenu, setShowPageMenu] = React.useState(false);

  // When a page is selected from the dropdown, navigate to it and close the menu.
  const handleSelectPage = (path) => {
    navigate(path);
    setShowPageMenu(false);
  };

  // Plus button toggles the dropdown of available pages
  const handleAddTab = () => {
    setShowPageMenu((prev) => !prev);
  };

  // Function to close a tab; if the closed tab is active, navigate to a fallback.
  const handleCloseTab = (index, e) => {
    // Prevent click from triggering the parent onClick (navigation)
    e.stopPropagation();
    setTabs((prevTabs) => {
      const tabToClose = prevTabs[index];
      const newTabs = prevTabs.filter((_, i) => i !== index);
      // If the closed tab is the active one, navigate to an adjacent tab or default route.
      if (tabToClose.path === location.pathname) {
        if (newTabs.length > 0) {
          // Navigate to the previous tab if exists, else first one.
          const newActiveTab = newTabs[index - 1] || newTabs[0];
          navigate(newActiveTab.path);
        } else {
          navigate("/");
        }
      }
      return newTabs;
    });
  };

  // Current time state and effect (updates every second)
  const [currentTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gray-900/80 border-b border-gray-800/30 backdrop-blur-lg"
    >
      <div className="px-6 py-3 z-10">
        <div className="flex items-center justify-between">
          {/* Left Section: Plus button and opened tabs */}
          <div
            className="relative flex items-center space-x-4"
            onMouseLeave={() => setShowPageMenu(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
              onClick={handleAddTab}
            >
              <Plus className="h-5 w-5 text-gray-300" />
            </motion.button>

            {/* Dropdown Menu: List available pages */}
            {showPageMenu && (
              <div className="absolute left-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                {Object.entries(pathLabels).map(([path, label]) => (
                  <div
                    key={path}
                    className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectPage(path)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gray-800/50 text-gray-300 hover:bg-gray-700/60 transition-colors cursor-pointer"
                  onClick={() => navigate(tab.path)}
                >
                  <span>{tab.label}</span>
                  <X
                    onClick={(e) => handleCloseTab(index, e)}
                    className="h-3 w-3 text-gray-400 hover:text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Icons, Current Time, and User Profile */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-gray-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
            >
              <Settings className="h-5 w-5 text-gray-300" />
            </motion.button>

            <span className="text-gray-300 text-sm font-medium">
              {formatTime(currentTime)}
            </span>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-300">
                {user?.username}
              </span>
              <div className="relative">
                <div
                  className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                  flex items-center justify-center text-white font-medium shadow-lg
                  group-hover:ring-2 group-hover:ring-blue-400/50 transition-all duration-300"
                >
                  {user?.username?.[0]?.toUpperCase()}
                </div>
                <div
                  className="absolute inset-0 rounded-full animate-pulse ring-2 ring-blue-400/30 
                  group-hover:animate-none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient Light Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </motion.nav>
  );
};

export default Navbar;
