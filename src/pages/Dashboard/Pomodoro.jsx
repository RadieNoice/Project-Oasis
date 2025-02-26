import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "../../components/reactbits/SpotlightCard";
import {
  Pause,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Plus,
  Minus,
} from "lucide-react";

const Pomodoro = ({
  workTime = 25,
  breakTime = 5,
  timeLeft,
  isActive,
  isBreak,
  currentTask,
  todos = [],
  toggleTimer,
  resetTimer,
  formatTimeLeft,
}) => {
  // If props aren't provided, use local state (for standalone use)
  const [localWorkTime, setLocalWorkTime] = React.useState(workTime);
  const [localBreakTime, setLocalBreakTime] = React.useState(breakTime);
  const [localTimeLeft, setLocalTimeLeft] = React.useState(localWorkTime * 60);
  const [localIsActive, setLocalIsActive] = React.useState(false);
  const [localIsBreak, setLocalIsBreak] = React.useState(false);
  const [localCurrentTask, setLocalCurrentTask] = React.useState(null);
  const [sessionCount, setSessionCount] = React.useState(0);

  // Use props if available, otherwise use local state
  const effectiveWorkTime =
    typeof workTime !== "undefined" ? workTime : localWorkTime;
  const effectiveBreakTime =
    typeof breakTime !== "undefined" ? breakTime : localBreakTime;
  const effectiveTimeLeft = timeLeft !== undefined ? timeLeft : localTimeLeft;
  const effectiveIsActive =
    typeof isActive !== "undefined" ? isActive : localIsActive;
  const effectiveIsBreak =
    typeof isBreak !== "undefined" ? isBreak : localIsBreak;
  const effectiveCurrentTask = currentTask || localCurrentTask;
  const [debugLastClicked, setDebugLastClicked] = React.useState("");

  const formatTime = (seconds) => {
    if (formatTimeLeft) return formatTimeLeft();

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown logic using useEffect - only use if props aren't provided
  React.useEffect(() => {
    if (toggleTimer) return; // Skip if using props

    let interval = null;
    if (localIsActive && localTimeLeft > 0) {
      interval = setInterval(() => {
        setLocalTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (localIsActive && localTimeLeft === 0) {
      // Play sound
      new Audio("/notification.mp3")
        .play()
        .catch((err) => console.log("Audio playback prevented:", err));

      // Switch sessions
      if (!localIsBreak) {
        // Work session ended; start break session.
        setLocalIsBreak(true);
        setLocalTimeLeft(localBreakTime * 60);
        setSessionCount((prev) => prev + 1);
      } else {
        // Break session ended; start work session.
        setLocalIsBreak(false);
        setLocalTimeLeft(localWorkTime * 60);
      }
      setLocalIsActive(false); // Pause timer after switching sessions
    }
    return () => clearInterval(interval);
  }, [
    localIsActive,
    localTimeLeft,
    localIsBreak,
    localBreakTime,
    localWorkTime,
    toggleTimer,
  ]);

  // Handle local timer toggle
  const handleToggleTimer = () => {
    if (toggleTimer) {
      toggleTimer();
    } else {
      setLocalIsActive(!localIsActive);
    }
  };

  // Handle local reset
  const handleReset = () => {
    if (resetTimer) {
      resetTimer();
    } else {
      setLocalTimeLeft(localWorkTime * 60);
      setLocalIsActive(false);
      setLocalIsBreak(false);
      setLocalCurrentTask(null);
    }
  };

  // FIXED: Time adjustment handlers with more direct implementation
  const handleWorkTimeDecrease = () => {
    if (effectiveIsActive) return;

    if (typeof workTime === "undefined") {
      // We're managing our own state
      const newValue = Math.max(1, localWorkTime - 1);
      setLocalWorkTime(newValue);

      // Update timer display if in work mode
      if (!localIsActive && !localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleWorkTimeIncrease = () => {
    if (effectiveIsActive) return;

    if (typeof workTime === "undefined") {
      // We're managing our own state
      const newValue = Math.min(99, localWorkTime + 1);
      setLocalWorkTime(newValue);

      // Update timer display if in work mode
      if (!localIsActive && !localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleBreakTimeDecrease = () => {
    if (effectiveIsActive) return;

    if (typeof breakTime === "undefined") {
      // We're managing our own state
      const newValue = Math.max(1, localBreakTime - 1);
      setLocalBreakTime(newValue);

      // Update timer display if in break mode
      if (!localIsActive && localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleBreakTimeIncrease = () => {
    if (effectiveIsActive) return;

    if (typeof breakTime === "undefined") {
      // We're managing our own state
      const newValue = Math.min(99, localBreakTime + 1);
      setLocalBreakTime(newValue);

      // Update timer display if in break mode
      if (!localIsActive && localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  // Add these debug handlers right after your other handlers
  const debugWorkTimeDecrease = () => {
    etDebugLastClicked(
      "Work time decrease at " + new Date().toLocaleTimeString()
    );
    console.log("CLICKED: Work time decrease");
    console.log("Current workTime:", localWorkTime);
    console.log("effectiveIsActive:", effectiveIsActive);

    if (effectiveIsActive) {
      console.log("Can't adjust - timer is active");
      return;
    }

    // Force update with direct setValue call
    const newValue = Math.max(1, localWorkTime - 1);
    console.log("Setting new work time:", newValue);
    setLocalWorkTime(newValue);

    // Update timer display if in work mode
    if (!localIsActive && !localIsBreak) {
      console.log("Updating timeLeft to:", newValue * 60);
      setLocalTimeLeft(newValue * 60);
    }
  };

  const debugWorkTimeIncrease = () => {
    console.log("CLICKED: Work time increase");
    console.log("Current workTime:", localWorkTime);
    console.log("effectiveIsActive:", effectiveIsActive);

    if (effectiveIsActive) {
      console.log("Can't adjust - timer is active");
      return;
    }

    // Force update with direct setValue call
    const newValue = Math.min(99, localWorkTime + 1);
    console.log("Setting new work time:", newValue);
    setLocalWorkTime(newValue);

    // Update timer display if in work mode
    if (!localIsActive && !localIsBreak) {
      console.log("Updating timeLeft to:", newValue * 60);
      setLocalTimeLeft(newValue * 60);
    }
  };

  const debugBreakTimeDecrease = () => {
    console.log("CLICKED: Break time decrease");
    console.log("Current breakTime:", localBreakTime);
    console.log("effectiveIsActive:", effectiveIsActive);

    if (effectiveIsActive) {
      console.log("Can't adjust - timer is active");
      return;
    }

    // Force update with direct setValue call
    const newValue = Math.max(1, localBreakTime - 1);
    console.log("Setting new break time:", newValue);
    setLocalBreakTime(newValue);

    // Update timer display if in break mode
    if (!localIsActive && localIsBreak) {
      console.log("Updating timeLeft to:", newValue * 60);
      setLocalTimeLeft(newValue * 60);
    }
  };

  const debugBreakTimeIncrease = () => {
    console.log("CLICKED: Break time increase");
    console.log("Current breakTime:", localBreakTime);
    console.log("effectiveIsActive:", effectiveIsActive);

    if (effectiveIsActive) {
      console.log("Can't adjust - timer is active");
      return;
    }

    // Force update with direct setValue call
    const newValue = Math.min(99, localBreakTime + 1);
    console.log("Setting new break time:", newValue);
    setLocalBreakTime(newValue);

    // Update timer display if in break mode
    if (!localIsActive && localIsBreak) {
      console.log("Updating timeLeft to:", newValue * 60);
      setLocalTimeLeft(newValue * 60);
    }
  };
  // Calculate progress percentage
  const maxTime =
    (effectiveIsBreak ? effectiveBreakTime : effectiveWorkTime) * 60;
  const progressPercentage = (effectiveTimeLeft / maxTime) * 100;

  // Get current task name if available
  const currentTaskName =
    effectiveCurrentTask && todos.length > 0
      ? todos.find((t) => t.id === effectiveCurrentTask)?.title
      : null;

  // Enhanced color scheme
  const colors = {
    work: {
      primary: "rgba(168, 85, 247, 0.8)", // Purple
      secondary: "rgba(139, 92, 246, 0.8)", // Violet
      bg: "from-purple-900/20 via-violet-900/15 to-purple-900/5",
      glow: "rgba(168, 85, 247, 0.15)",
      progress: "bg-gradient-to-r from-purple-500 to-violet-500",
      buttonActive: "bg-gradient-to-br from-purple-500 to-violet-600",
      buttonInactive: "bg-gradient-to-br from-green-500 to-emerald-600",
      ring: "ring-purple-500/30",
      border: "border-purple-500/30",
      hover: "hover:border-purple-500/50",
    },
    break: {
      primary: "rgba(59, 130, 246, 0.8)", // Blue
      secondary: "rgba(14, 165, 233, 0.8)", // Sky
      bg: "from-blue-900/20 via-sky-900/15 to-blue-900/5",
      glow: "rgba(59, 130, 246, 0.15)",
      progress: "bg-gradient-to-r from-blue-500 to-sky-500",
      buttonActive: "bg-gradient-to-br from-red-500 to-rose-600",
      buttonInactive: "bg-gradient-to-br from-green-500 to-emerald-600",
      ring: "ring-blue-500/30",
      border: "border-blue-500/30",
      hover: "hover:border-blue-500/50",
    },
  };

  const currentColors = effectiveIsBreak ? colors.break : colors.work;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      {/* Glow effect outside the card */}
      <div
        className={`absolute inset-0 rounded-2xl blur-2xl opacity-20 -z-10 ${
          effectiveIsBreak ? "bg-blue-500" : "bg-purple-500"
        }`}
        style={{ transform: "scale(0.9) translateY(10px)" }}
      />

      <SpotlightCard
        className={`bg-gradient-to-br ${currentColors.bg} rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl transition-all duration-300`}
        spotlightColor={currentColors.glow}
        spotlightSize={500}
      >
        <div className="flex flex-col gap-5">
          {/* Header with title and time */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                {effectiveIsBreak ? (
                  <>
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300/90">Break Time</span>
                  </>
                ) : effectiveCurrentTask ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-300/90">Working On Task</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-300/90">Pomodoro</span>
                  </>
                )}
              </h3>
              {currentTaskName && !effectiveIsBreak && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-white/90 mt-1.5 font-medium truncate max-w-[140px]"
                >
                  {currentTaskName}
                </motion.p>
              )}
            </div>

            {/* Time display with enhanced animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveTimeLeft}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-4xl font-bold text-white tabular-nums tracking-tight"
                style={{
                  textShadow: `0 0 15px ${
                    effectiveIsBreak
                      ? "rgba(59, 130, 246, 0.5)"
                      : "rgba(168, 85, 247, 0.5)"
                  }`,
                }}
              >
                {formatTime(effectiveTimeLeft)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced progress bar */}
          <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden p-0.5">
            <motion.div
              className={`h-full rounded-full ${currentColors.progress}`}
              initial={{ width: "100%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "tween" }}
              style={{
                boxShadow: `0 0 10px ${
                  effectiveIsBreak
                    ? "rgba(59, 130, 246, 0.5)"
                    : "rgba(168, 85, 247, 0.5)"
                }`,
              }}
            />
          </div>

          {/* Beautifully styled time control units */}
          <div className="grid grid-cols-2 gap-4">
            {/* Work time controller */}
            <div className="relative">
              <label className="text-xs text-gray-400 mb-1.5 block font-medium flex items-center justify-between">
                <span>Work Duration</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-xs ${
                    effectiveIsBreak
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-purple-500/20 text-purple-200"
                  }`}
                >
                  min
                </span>
              </label>

              <div
                className={`
                flex items-center justify-between rounded-xl p-1
                ${
                  !effectiveIsActive
                    ? "bg-gray-800/30 backdrop-blur-sm"
                    : "bg-gray-800/20"
                }
                ${effectiveIsBreak ? colors.break.border : colors.work.border} 
                border
                ${effectiveIsBreak ? colors.break.hover : colors.work.hover}
                ${effectiveIsActive ? "opacity-70" : ""}
                transition-all duration-300
              `}
              >
                // Work time buttons
                <button
                  type="button"
                  onClick={debugWorkTimeDecrease}
                  disabled={effectiveIsActive}
                  className={`
    w-9 h-9 flex items-center justify-center rounded-lg 
    ${
      !effectiveIsActive
        ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
        : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
    }
    transition-colors
  `}
                >
                  <Minus size={16} />
                </button>
                <div className="text-center w-10 text-xl font-medium text-white tabular-nums">
                  {toggleTimer ? effectiveWorkTime : localWorkTime}
                </div>
                <button
                  type="button"
                  onClick={debugWorkTimeIncrease}
                  disabled={effectiveIsActive}
                  className={`
    w-9 h-9 flex items-center justify-center rounded-lg
    ${
      !effectiveIsActive
        ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
        : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
    }
    transition-colors
  `}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Break time controller */}
            <div className="relative">
              <label className="text-xs text-gray-400 mb-1.5 block font-medium flex items-center justify-between">
                <span>Break Duration</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-xs ${
                    effectiveIsBreak
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-purple-500/20 text-purple-200"
                  }`}
                >
                  min
                </span>
              </label>

              <div
                className={`
                flex items-center justify-between rounded-xl p-1
                ${
                  !effectiveIsActive
                    ? "bg-gray-800/30 backdrop-blur-sm"
                    : "bg-gray-800/20"
                }
                ${effectiveIsBreak ? colors.break.border : colors.work.border} 
                border
                ${effectiveIsBreak ? colors.break.hover : colors.work.hover}
                ${effectiveIsActive ? "opacity-70" : ""}
                transition-all duration-300
              `}
              >
                {/* FIXED: Direct event handlers */}
                <button
                  type="button"
                  onClick={debugBreakTimeDecrease}
                  disabled={effectiveIsActive}
                  className={`
    w-9 h-9 flex items-center justify-center rounded-lg 
    ${
      !effectiveIsActive
        ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
        : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
    }
    transition-colors
  `}
                >
                  <Minus size={16} />
                </button>

                <div className="text-center w-10 text-xl font-medium text-white tabular-nums">
                  {toggleTimer ? effectiveBreakTime : localBreakTime}
                </div>

                <button
                  type="button"
                  onClick={debugBreakTimeIncrease}
                  disabled={effectiveIsActive}
                  className={`
    w-9 h-9 flex items-center justify-center rounded-lg
    ${
      !effectiveIsActive
        ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
        : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
    }
    transition-colors
  `}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced buttons */}
          <div className="flex gap-4 justify-center mt-2">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${
                  effectiveIsActive
                    ? "rgba(239, 68, 68, 0.5)"
                    : "rgba(34, 197, 94, 0.5)"
                }`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleTimer}
              className={`flex items-center justify-center w-16 h-16 rounded-full 
                ${
                  effectiveIsActive
                    ? "bg-gradient-to-br from-red-500 to-rose-600 text-white"
                    : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                } transition-all duration-200 shadow-xl`}
              style={{
                boxShadow: `0 10px 15px -3px ${
                  effectiveIsActive
                    ? "rgba(239, 68, 68, 0.3)"
                    : "rgba(34, 197, 94, 0.3)"
                }, 0 4px 6px -4px ${
                  effectiveIsActive
                    ? "rgba(239, 68, 68, 0.4)"
                    : "rgba(34, 197, 94, 0.4)"
                }`,
              }}
            >
              {effectiveIsActive ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(156, 163, 175, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/80 hover:bg-gray-700 text-white transition-all duration-200 shadow-xl"
              style={{
                boxShadow:
                  "0 10px 15px -3px rgba(75, 85, 99, 0.2), 0 4px 6px -4px rgba(75, 85, 99, 0.3)",
              }}
            >
              <RotateCcw className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Session counter with enhanced styling */}
          {sessionCount > 0 && !toggleTimer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-medium mt-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800/40 text-xs text-gray-300 border border-gray-700/30">
                <span
                  className={`h-2 w-2 rounded-full ${
                    effectiveIsBreak ? "bg-blue-400" : "bg-purple-400"
                  } animate-pulse`}
                ></span>
                {sessionCount} {sessionCount === 1 ? "session" : "sessions"}{" "}
                completed
              </span>
            </motion.div>
          )}
        </div>
        {debugLastClicked && (
          <div className="absolute top-0 right-0 bg-red-500 text-white p-2 text-xs">
            Last clicked: {debugLastClicked}
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  );
};

export default Pomodoro;
