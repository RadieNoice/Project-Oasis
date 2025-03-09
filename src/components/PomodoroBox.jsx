import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const PomodoroBox = ({ compact = false }) => {
  const { isLightTheme } = useTheme();
  const [workTime, setWorkTime] = useState(() => {
    return parseInt(localStorage.getItem("pomodoroWorkTime")) || 25;
  });
  const [breakTime, setBreakTime] = useState(() => {
    return parseInt(localStorage.getItem("pomodoroBreakTime")) || 5;
  });
  const [timeLeft, setTimeLeft] = useState(() => workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(() => {
    return parseInt(localStorage.getItem("pomodoroCompletedSessions")) || 0;
  });

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
      // Play notification sound
      new Audio("/notification.mp3").play().catch(err => console.log("Audio playback prevented:", err));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSessionEnd = () => {
    setIsActive(false);
    if (!isBreak) {
      setCompletedSessions(prev => prev + 1);
    }
    setIsBreak(!isBreak);
    setTimeLeft((isBreak ? workTime : breakTime) * 60);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

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
      if (!isBreak) {
        setTimeLeft(value * 60);
      }
    }
  };

  const handleBreakTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBreakTime(value);
      if (isBreak) {
        setTimeLeft(value * 60);
      }
    }
  };

  return (
    <div className={`${compact ? 'p-4' : 'p-6'} rounded-xl ${isLightTheme ? 'bg-white shadow-md border border-gray-200' : 'bg-gray-900/90 border border-gray-800/50'} transition-colors`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
          Focus Timer
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
        >
          <SettingsIcon className="h-4 w-4" />
        </motion.button>
      </div>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`mb-4 p-3 rounded-lg ${isLightTheme ? 'bg-gray-100 border border-gray-200' : 'bg-gray-800/50 border border-gray-700/30'}`}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                Work (min)
              </label>
              <input
                type="number"
                min="1"
                value={workTime}
                onChange={handleWorkTimeChange}
                className={`w-full p-1.5 text-sm rounded-lg ${isLightTheme ? 'bg-white border border-gray-300' : 'bg-gray-900 border border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
                Break (min)
              </label>
              <input
                type="number"
                min="1"
                value={breakTime}
                onChange={handleBreakTimeChange}
                className={`w-full p-1.5 text-sm rounded-lg ${isLightTheme ? 'bg-white border border-gray-300' : 'bg-gray-900 border border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Timer Display */}
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          {/* Circular progress indicator */}
          <svg className={`${compact ? 'w-40 h-40' : 'w-48 h-48'}`} viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isLightTheme ? "#e5e7eb" : "#1f2937"}
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * calculateProgress()) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${compact ? 'text-4xl' : 'text-5xl'} font-mono font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
              {formatTimeLeft()}
            </span>
            <span className={`${compact ? 'text-sm' : 'text-base'} mt-1 text-purple-400`}>
              Focus Mode
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTimer}
            className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isActive
                ? "bg-purple-900/30 text-purple-400 hover:bg-purple-800/40"
                : isLightTheme ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isLightTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <RotateCcw className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Session counter */}
        <div className={`mt-4 text-center ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
          <p className="text-sm">Completed Sessions: {completedSessions}</p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroBox; 