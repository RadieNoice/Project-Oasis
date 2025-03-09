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

  // Calculate progress percentage for the circular progress indicator
  const calculateProgress = () => {
    const totalTime = isBreak ? breakTime * 60 : workTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Handle work time change
  const handleWorkTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWorkTime(value);
      if (!isBreak) {
        setTimeLeft(value * 60);
      }
    }
  };

  // Handle break time change
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
    <div className={`${compact ? 'p-3' : 'p-6'} rounded-xl ${isLightTheme ? 'bg-white shadow-md border border-gray-200' : 'bg-gray-900/90 border border-gray-800/50'} transition-colors h-full`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className={`${compact ? 'text-sm' : 'text-xl'} font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
            {isBreak ? "Break" : "Focus"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1 rounded-lg ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
          >
            <SettingsIcon className="h-3 w-3" />
          </motion.button>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="relative">
            {/* Circular progress indicator */}
            <svg className="w-20 h-20" viewBox="0 0 100 100">
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
                stroke={isBreak ? "#10b981" : "#8b5cf6"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * calculateProgress()) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-mono font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}">
                {formatTimeLeft()}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTimer}
              className={`p-2 rounded-full ${
                isActive
                  ? isBreak
                    ? isLightTheme ? "bg-green-100 text-green-700" : "bg-green-900/30 text-green-400"
                    : isLightTheme ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-400"
                  : isLightTheme ? "bg-gray-200 text-gray-700" : "bg-gray-800 text-gray-300"
              }`}
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
              className={`p-2 rounded-full ${isLightTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroBox; 