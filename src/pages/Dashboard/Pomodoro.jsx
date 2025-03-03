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
  // Local state if external control is not provided
  const [localWorkTime, setLocalWorkTime] = React.useState(workTime);
  const [localBreakTime, setLocalBreakTime] = React.useState(breakTime);
  const [localTimeLeft, setLocalTimeLeft] = React.useState(localWorkTime * 60);
  const [localIsActive, setLocalIsActive] = React.useState(false);
  const [localIsBreak, setLocalIsBreak] = React.useState(false);
  const [localCurrentTask, setLocalCurrentTask] = React.useState(null);
  const [sessionCount, setSessionCount] = React.useState(0);

  // Auto-start the next session when one ends
  const autoStartNextSession = true;

  // Decide whether to use external (controlled) values or local state
  const effectiveWorkTime = toggleTimer ? workTime : localWorkTime;
  const effectiveBreakTime = toggleTimer ? breakTime : localBreakTime;
  const effectiveTimeLeft =
    toggleTimer && timeLeft !== undefined ? timeLeft : localTimeLeft;
  const effectiveIsActive = toggleTimer ? isActive : localIsActive;
  const effectiveIsBreak = toggleTimer ? isBreak : localIsBreak;
  const effectiveCurrentTask = currentTask || localCurrentTask;

  const formatTime = (seconds) => {
    if (formatTimeLeft) return formatTimeLeft();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Update timeLeft when work/break durations change and timer is stopped
  React.useEffect(() => {
    if (!effectiveIsActive && !effectiveIsBreak) {
      setLocalTimeLeft(localWorkTime * 60);
    }
  }, [localWorkTime, effectiveIsActive, effectiveIsBreak]);

  React.useEffect(() => {
    if (!effectiveIsActive && effectiveIsBreak) {
      setLocalTimeLeft(localBreakTime * 60);
    }
  }, [localBreakTime, effectiveIsActive, effectiveIsBreak]);

  // Countdown logic – only use if external control isn’t provided
  React.useEffect(() => {
    if (toggleTimer) return;

    let interval = null;
    if (localIsActive && localTimeLeft > 0) {
      interval = setInterval(() => {
        setLocalTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (localIsActive && localTimeLeft === 0) {
      // Play sound notification
      new Audio("/notification.mp3")
        .play()
        .catch((err) => console.log("Audio playback prevented:", err));

      // Switch sessions when time runs out
      if (!localIsBreak) {
        // Work session ended; switch to break session.
        setLocalIsBreak(true);
        setLocalTimeLeft(localBreakTime * 60);
        setSessionCount((prev) => prev + 1);
      } else {
        // Break session ended; switch back to work.
        setLocalIsBreak(false);
        setLocalTimeLeft(localWorkTime * 60);
      }
      // Auto-start the next session if enabled, otherwise pause.
      setLocalIsActive(autoStartNextSession);
    }
    return () => clearInterval(interval);
  }, [
    localIsActive,
    localTimeLeft,
    localIsBreak,
    localBreakTime,
    localWorkTime,
    toggleTimer,
    autoStartNextSession,
  ]);

  // Timer control handlers
  const handleToggleTimer = () => {
    if (toggleTimer) {
      toggleTimer();
    } else {
      setLocalIsActive((prev) => !prev);
    }
  };

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

  // Time adjustment handlers (standalone mode only)
  const handleWorkTimeDecrease = () => {
    if (effectiveIsActive) return;
    if (!toggleTimer) {
      const newValue = Math.max(1, localWorkTime - 1);
      setLocalWorkTime(newValue);
      if (!localIsActive && !localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleWorkTimeIncrease = () => {
    if (effectiveIsActive) return;
    if (!toggleTimer) {
      const newValue = Math.min(99, localWorkTime + 1);
      setLocalWorkTime(newValue);
      if (!localIsActive && !localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleBreakTimeDecrease = () => {
    if (effectiveIsActive) return;
    if (!toggleTimer) {
      const newValue = Math.max(1, localBreakTime - 1);
      setLocalBreakTime(newValue);
      if (!localIsActive && localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  const handleBreakTimeIncrease = () => {
    if (effectiveIsActive) return;
    if (!toggleTimer) {
      const newValue = Math.min(99, localBreakTime + 1);
      setLocalBreakTime(newValue);
      if (!localIsActive && localIsBreak) {
        setLocalTimeLeft(newValue * 60);
      }
    }
  };

  // Calculate progress percentage for the animated progress bar
  const maxTime =
    (effectiveIsBreak ? effectiveBreakTime : effectiveWorkTime) * 60;
  const progressPercentage = (effectiveTimeLeft / maxTime) * 100;

  // Retrieve current task name if available
  const currentTaskName =
    effectiveCurrentTask && todos.length > 0
      ? todos.find((t) => t.id === effectiveCurrentTask)?.title
      : null;

  // Define color schemes for work and break sessions
  const colors = {
    work: {
      bg: "from-purple-900/20 via-violet-900/15 to-purple-900/5",
      glow: "rgba(168, 85, 247, 0.15)",
      progress: "bg-gradient-to-r from-purple-500 to-violet-500",
      border: "border-purple-500/30",
      hover: "hover:border-purple-500/50",
    },
    break: {
      bg: "from-blue-900/20 via-sky-900/15 to-blue-900/5",
      glow: "rgba(59, 130, 246, 0.15)",
      progress: "bg-gradient-to-r from-blue-500 to-sky-500",
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

            {/* Animated time display */}
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

          {/* Progress Bar */}
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

          {/* Time Control Units */}
          <div className="grid grid-cols-2 gap-4">
            {/* Work Time Controller */}
            <div className="relative">
              <label className="text-xs text-gray-400 mb-1.5 block font-medium flex items-center justify-between">
                <span>Work Duration</span>
                <span className="px-1.5 py-0.5 rounded text-xs bg-purple-500/20 text-purple-200">
                  min
                </span>
              </label>

              <div
                className={`flex items-center justify-between rounded-xl p-1 ${
                  !effectiveIsActive
                    ? "bg-gray-800/30 backdrop-blur-sm"
                    : "bg-gray-800/20"
                } ${currentColors.border} border ${currentColors.hover} ${
                  effectiveIsActive ? "opacity-70" : ""
                } transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={handleWorkTimeDecrease}
                  disabled={effectiveIsActive}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                    !effectiveIsActive
                      ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
                      : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
                  }`}
                >
                  <Minus size={16} />
                </button>
                <div className="text-center w-10 text-xl font-medium text-white tabular-nums">
                  {toggleTimer ? effectiveWorkTime : localWorkTime}
                </div>
                <button
                  type="button"
                  onClick={handleWorkTimeIncrease}
                  disabled={effectiveIsActive}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                    !effectiveIsActive
                      ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
                      : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Break Time Controller */}
            <div className="relative">
              <label className="text-xs text-gray-400 mb-1.5 block font-medium flex items-center justify-between">
                <span>Break Duration</span>
                <span className="px-1.5 py-0.5 rounded text-xs bg-blue-500/20 text-blue-200">
                  min
                </span>
              </label>

              <div
                className={`flex items-center justify-between rounded-xl p-1 ${
                  !effectiveIsActive
                    ? "bg-gray-800/30 backdrop-blur-sm"
                    : "bg-gray-800/20"
                } ${currentColors.border} border ${currentColors.hover} ${
                  effectiveIsActive ? "opacity-70" : ""
                } transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={handleBreakTimeDecrease}
                  disabled={effectiveIsActive}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                    !effectiveIsActive
                      ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
                      : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
                  }`}
                >
                  <Minus size={16} />
                </button>
                <div className="text-center w-10 text-xl font-medium text-white tabular-nums">
                  {toggleTimer ? effectiveBreakTime : localBreakTime}
                </div>
                <button
                  type="button"
                  onClick={handleBreakTimeIncrease}
                  disabled={effectiveIsActive}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                    !effectiveIsActive
                      ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
                      : "text-gray-500 bg-gray-800/30 cursor-not-allowed"
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
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
              className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 shadow-xl ${
                effectiveIsActive
                  ? "bg-gradient-to-br from-red-500 to-rose-600 text-white"
                  : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
              }`}
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

          {/* Session Counter */}
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
                {sessionCount} {sessionCount === 1 ? "session" : "sessions"} completed
              </span>
            </motion.div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default Pomodoro;
