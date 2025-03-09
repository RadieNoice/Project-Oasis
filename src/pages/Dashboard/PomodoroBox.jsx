import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const PomodoroBox = ({ compact = false }) => {
  const { isLightTheme } = useTheme();
  const [workTime, setWorkTime] = useState(() => parseInt(localStorage.getItem("pomodoroWorkTime")) || 25);
  const [breakTime, setBreakTime] = useState(() => parseInt(localStorage.getItem("pomodoroBreakTime")) || 5);
  const [timeLeft, setTimeLeft] = useState(() => workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(() => parseInt(localStorage.getItem("pomodoroCompletedSessions")) || 0);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroWorkTime", workTime);
    localStorage.setItem("pomodoroBreakTime", breakTime);
    localStorage.setItem("pomodoroCompletedSessions", completedSessions);
  }, [workTime, breakTime, completedSessions]);

  // Timer countdown logic
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleSessionEnd();
      new Audio("/notification.mp3")
        .play()
        .catch((err) => console.log("Audio playback prevented:", err));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSessionEnd = () => {
    setIsActive(false);
    if (!isBreak) {
      setCompletedSessions((prev) => prev + 1);
    }
    setIsBreak(!isBreak);
    setTimeLeft((isBreak ? workTime : breakTime) * 60);
  };

  const toggleTimer = () => setIsActive((prev) => !prev);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((isBreak ? breakTime : workTime) * 60);
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const totalTime = isBreak ? breakTime * 60 : workTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleWorkTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWorkTime(value);
      if (!isBreak) setTimeLeft(value * 60);
    }
  };

  const handleBreakTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBreakTime(value);
      if (isBreak) setTimeLeft(value * 60);
    }
  };

  // Define color scheme based on mode (focus/break)
  const modeColors = {
    focus: {
      bg: "from-purple-900/30 to-indigo-900/10",
      ring: "rgba(139, 92, 246, 0.7)", // purple-500
      accent: "#8b5cf6", // purple-500
      light: {
        bg: "from-purple-100 to-indigo-50",
        accent: "#8b5cf6" // purple-500
      }
    },
    break: {
      bg: "from-emerald-900/30 to-teal-900/10",
      ring: "rgba(16, 185, 129, 0.7)", // emerald-500
      accent: "#10b981", // emerald-500
      light: {
        bg: "from-emerald-100 to-teal-50",
        accent: "#10b981" // emerald-500
      }
    }
  };

  const currentMode = isBreak ? modeColors.break : modeColors.focus;

  return (
    <SpotlightCard
      className={`rounded-2xl border ${isLightTheme 
        ? `bg-gradient-to-br ${isBreak ? "from-emerald-50/90 to-teal-50/80" : "from-purple-50/90 to-indigo-50/80"} border-gray-200/50` 
        : `bg-gradient-to-br ${isBreak ? currentMode.bg : currentMode.bg} border-gray-800/50`
      } backdrop-blur-lg p-4 hover:shadow-xl transition-all duration-300`}
      spotlightColor={isLightTheme 
        ? "rgba(255, 255, 255, 0.7)" 
        : isBreak ? "rgba(16, 185, 129, 0.15)" : "rgba(139, 92, 246, 0.15)"
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
            isActive ? (isBreak ? "bg-emerald-500" : "bg-purple-500") : "bg-gray-400"
          }`}></div>
          <h2 className={`${compact ? "text-lg" : "text-xl"} font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
            {isBreak ? "Break" : "Focus"} Timer
          </h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            showSettings 
              ? isBreak ? "bg-emerald-500/20 text-emerald-200" : "bg-purple-500/20 text-purple-200"
              : isLightTheme ? "bg-gray-200 text-gray-600" : "bg-gray-800/70 text-gray-300"
          }`}
        >
          <SettingsIcon className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-4 p-3 rounded-lg backdrop-blur-sm ${
              isLightTheme 
                ? "bg-white/80 border border-gray-200" 
                : "bg-gray-800/30 border border-gray-700/30"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${
                  isLightTheme ? "text-gray-700" : "text-gray-300"
                }`}>
                  Work (min)
                </label>
                <input
                  type="number"
                  min="1"
                  value={workTime}
                  onChange={handleWorkTimeChange}
                  className={`w-full p-2 text-sm rounded-lg border focus:outline-none ${
                    isLightTheme 
                      ? "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:border-purple-500" 
                      : "bg-gray-900/70 border-gray-700 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-600"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${
                  isLightTheme ? "text-gray-700" : "text-gray-300"
                }`}>
                  Break (min)
                </label>
                <input
                  type="number"
                  min="1"
                  value={breakTime}
                  onChange={handleBreakTimeChange}
                  className={`w-full p-2 text-sm rounded-lg border focus:outline-none ${
                    isLightTheme 
                      ? "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500" 
                      : "bg-gray-900/70 border-gray-700 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-600"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Display */}
      <motion.div 
        className="flex flex-col items-center"
        animate={{ 
          y: [0, showSettings ? 0 : 5, 0],
          transition: { 
            y: { repeat: isActive ? Infinity : 0, duration: 3 } 
          }
        }}
      >
        <div className="relative mb-5">
          <svg 
            className={`${compact ? "w-28 h-28" : "w-36 h-36"}`} 
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={isLightTheme ? "#e5e7eb" : "#1f2937"} 
              strokeWidth="8" 
            />
            
            {/* Progress arc with gradient */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop 
                  offset="0%" 
                  stopColor={isBreak 
                    ? isLightTheme ? "#34d399" : "#059669" // emerald shades
                    : isLightTheme ? "#a78bfa" : "#7c3aed"  // purple shades
                  } 
                />
                <stop 
                  offset="100%" 
                  stopColor={isBreak 
                    ? isLightTheme ? "#10b981" : "#047857" // emerald darker
                    : isLightTheme ? "#8b5cf6" : "#6d28d9"  // purple darker
                  } 
                />
              </linearGradient>
            </defs>
            
            {/* Progress circle with animation */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * calculateProgress()) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Timer text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              className={`${compact ? "text-2xl" : "text-3xl"} font-mono font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}
              animate={{ scale: isActive ? [1, 1.03, 1] : 1 }}
              transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
            >
              {formatTimeLeft()}
            </motion.span>
            <span className={`text-xs ${isBreak 
              ? isLightTheme ? "text-emerald-600" : "text-emerald-400" 
              : isLightTheme ? "text-purple-600" : "text-purple-400"
            }`}>
              {isBreak ? "Break Time" : "Focus Mode"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTimer}
            className={`rounded-full transition-colors duration-300 ${compact ? "p-3" : "p-4"} ${
              isBreak 
                ? isActive 
                  ? isLightTheme ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/50" : "bg-emerald-900/40 text-emerald-300 ring-2 ring-emerald-500/30"
                  : isLightTheme ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-gray-800 text-emerald-400 hover:bg-emerald-900/20"
                : isActive 
                  ? isLightTheme ? "bg-purple-100 text-purple-700 ring-2 ring-purple-500/50" : "bg-purple-900/40 text-purple-300 ring-2 ring-purple-500/30"
                  : isLightTheme ? "bg-purple-50 text-purple-600 hover:bg-purple-100" : "bg-gray-800 text-purple-400 hover:bg-purple-900/20"
            } shadow-lg`}
          >
            {isActive ? (
              <Pause className={`${compact ? "h-5 w-5" : "h-6 w-6"}`} />
            ) : (
              <Play className={`${compact ? "h-5 w-5" : "h-6 w-6"}`} />
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className={`rounded-full transition-colors duration-200 ${compact ? "p-3" : "p-4"} ${
              isLightTheme 
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
            } shadow-md`}
          >
            <RotateCcw className={`${compact ? "h-5 w-5" : "h-6 w-6"}`} />
          </motion.button>
        </div>

        {/* Session Counter */}
        <div className={`mt-4 text-center ${isLightTheme ? "text-gray-700" : "text-gray-300"}`}>
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs">Completed Sessions:</span>
            <span className={`text-sm font-semibold ${isBreak 
              ? isLightTheme ? "text-emerald-600" : "text-emerald-400"
              : isLightTheme ? "text-purple-600" : "text-purple-400"
            }`}>
              {completedSessions}
            </span>
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
};

export default PomodoroBox;