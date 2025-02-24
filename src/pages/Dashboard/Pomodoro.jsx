import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../../components/reactbits/SpotlightCard";
import { Pause, Play, RotateCcw } from "lucide-react";

const Pomodoro = () => {
  const [workTime, setWorkTime] = React.useState(25);
  const [breakTime, setBreakTime] = React.useState(5);
  const [timeLeft, setTimeLeft] = React.useState(workTime * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown logic using useEffect
  React.useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Switch sessions
      if (!isBreak) {
        // Work session ended; start break session.
        setIsBreak(true);
        setTimeLeft(breakTime * 60);
      } else {
        // Break session ended; start work session.
        setIsBreak(false);
        setTimeLeft(workTime * 60);
      }
      setIsActive(false); // Pause timer after switching sessions
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, breakTime, workTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">
              {isBreak
                ? "Break Time"
                : currentTask
                ? "Working On"
                : "Focus Timer"}
            </h3>
            <div className="text-3xl font-bold text-white">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Work (min)
              </label>
              <input
                type="number"
                value={workTime}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setWorkTime(value);
                  if (!isActive && !isBreak) setTimeLeft(value * 60);
                }}
                className="w-full p-2 bg-gray-800/50 rounded-lg border border-gray-700/30 text-white"
                min="1"
                disabled={isActive}
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Break (min)
              </label>
              <input
                type="number"
                value={breakTime}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setBreakTime(value);
                  if (!isActive && isBreak) setTimeLeft(value * 60);
                }}
                className="w-full p-2 bg-gray-800/50 rounded-lg border border-gray-700/30 text-white"
                min="1"
                disabled={isActive}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              {isActive ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => {
                setTimeLeft(workTime * 60);
                setIsActive(false);
                setIsBreak(false);
                setCurrentTask(null);
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default Pomodoro;
