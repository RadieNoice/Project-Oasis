import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dock from "./Dock";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  BookOpen,
  Brain,
  Inbox,
  Trophy,
  Users,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [position, setPosition] = useState("bottom"); // "bottom", "left", "right"

  // Load user preferences from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("sidebar-position");
    
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("sidebar-position", position);
  }, [position]);

  const items = [
    { icon: <Home className="text-blue-400" />, label: "Dashboard", path: "/" },
    {
      icon: <Calendar className="text-purple-400" />,
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: <BookOpen className="text-cyan-400" />,
      label: "Book Shelf",
      path: "/bookshelf",
    },
    {
      icon: <Brain className="text-pink-400" />,
      label: "AI Assistant",
      path: "/ai-tools",
    },
    {
      icon: <Inbox className="text-lime-400" />,
      label: "Inbox",
      path: "/inbox",
    },
    {
      icon: <Trophy className="text-yellow-400" />,
      label: "Achievements",
      path: "/achievements",
    },
    {
      icon: <Users className="text-orange-400" />,
      label: "Leaderboard",
      path: "/leaderboard",
    },
    {
      icon: <MessageSquare className="text-violet-400" />,
      label: "Chat",
      path: "/chat",
    },
    {
      icon: <User className="text-emerald-400" />,
      label: "Profile",
      path: "/profile",
    },
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + 1-9 to navigate to corresponding item
      if (e.altKey && e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key) - 1;
        if (index < items.length) {
          navigate(items[index].path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, navigate]);

  // Position-specific styles
  const containerStyles = {
    bottom: "fixed bottom-6 left-1/2 -translate-x-1/2 z-20",
    left: "fixed left-6 top-1/2 -translate-y-1/2 z-20",
    right: "fixed right-6 top-1/2 -translate-y-1/2 z-20",
  };

  const dockStyles = {
    bottom:
      "py-4 px-2 bg-gray-900/40 border border-gray-700/30 rounded-2xl shadow-2xl",
    left: "py-2 px-4 bg-gray-900/40 border border-gray-700/30 rounded-2xl shadow-2xl flex flex-col",
    right:
      "py-2 px-4 bg-gray-900/40 border border-gray-700/30 rounded-2xl shadow-2xl flex flex-col",
  };

  // Configure dock based on position
  const dockConfig = {
    bottom: {
      orientation: "horizontal",
      panelHeight: 72,
      baseItemSize: 52,
      magnification: 72,
    },
    left: {
      orientation: "vertical",
      panelHeight: 72,
      baseItemSize: 52,
      magnification: 72,
    },
    right: {
      orientation: "vertical",
      panelHeight: 72,
      baseItemSize: 52,
      magnification: 72,
    },
  };

  return (
    <div className={containerStyles[position]}>
      {/* Floating label for hovered item */}
      <AnimatePresence>
        {hoveredItem !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute bg-gray-900/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-700/40
              ${
                position === "bottom"
                  ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                  : ""
              }
              ${
                position === "left"
                  ? "left-full top-1/2 transform -translate-y-1/2 ml-2"
                  : ""
              }
              ${
                position === "right"
                  ? "right-full top-1/2 transform -translate-y-1/2 mr-2"
                  : ""
              }
            `}
            style={{
              boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.3)",
              willChange: "transform, opacity",
            }}
          >
            {hoveredItem}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient light effect */}
      <div className="absolute -inset-4 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent rounded-3xl -z-10"></div>

      <div className="flex flex-col items-center">
        <Dock
          items={items.map((item) => ({
            ...item,
            active: location.pathname === item.path,
            onMouseEnter: () => setHoveredItem(item.label),
            onMouseLeave: () => setHoveredItem(null),
            onClick: () => {
              navigate(item.path);
              if ("vibrate" in navigator) {
                navigator.vibrate(10);
              }
            },
            render: (item) => (
              <div className="relative flex items-center justify-center h-full w-full">
                <div
                  className={`
                  absolute inset-0 rounded-xl transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "bg-gray-800/70 shadow-lg"
                      : "bg-gray-800/30 hover:bg-gray-800/50"
                  }
                  ${
                    location.pathname === item.path
                      ? "border border-gray-700/50"
                      : ""
                  }
                `}
                ></div>

                <div className="relative z-10">{item.icon}</div>

                {location.pathname === item.path && (
                  <motion.div
                    layoutId="active-indicator"
                    className={`
                      absolute bg-white rounded-full
                      ${position === "bottom" ? "bottom-1 h-1 w-1" : ""}
                      ${position === "left" ? "left-1 h-1 w-1" : ""}
                      ${position === "right" ? "right-1 h-1 w-1" : ""}
                    `}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ),
          }))}
          {...dockConfig[position]}
          orientation={position === "bottom" ? "horizontal" : "vertical"}
          spring={{ mass: 0.2, stiffness: 150, damping: 12 }}
          className={dockStyles[position]}
        />

      

        {/* Keyboard shortcuts tooltip */}
        <div className={`
          text-[10px] text-gray-500 whitespace-nowrap absolute
          ${position === "bottom" ? "-bottom-7 left-1/2 transform -translate-x-1/2" : ""}
          ${position === "left" ? "left-0 -bottom-7" : ""}
          ${position === "right" ? "right-0 -bottom-7" : ""}
        `}>
          Alt+1-9 for navigation
        </div>
      </div>
    </div>
  );
};

export default Sidebar;