import React from "react";
import { motion } from "framer-motion";
import PomodoroTimer from "../components/PomodoroTimer";
import { useTheme } from "../contexts/ThemeContext";

const PomodoroPage = () => {
  const { isLightTheme } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-950'}`}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl font-bold mb-6 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
            Pomodoro Technique
          </h1>
          
          <div className={`mb-8 p-6 rounded-xl ${isLightTheme ? 'bg-white shadow-sm border border-gray-200' : 'bg-gray-900/70 border border-gray-800/50'}`}>
            <h2 className={`text-xl font-semibold mb-3 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
              How It Works
            </h2>
            <p className={`mb-4 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
              The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
            </p>
            <ol className={`list-decimal list-inside space-y-2 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
              <li>Set your timer for 25 minutes and focus on a single task until the timer rings.</li>
              <li>When the timer rings, take a 5-minute break.</li>
              <li>After four pomodoros, take a longer break (15-30 minutes).</li>
              <li>Repeat the process.</li>
            </ol>
          </div>
          
          <PomodoroTimer />
          
          <div className={`mt-8 p-6 rounded-xl ${isLightTheme ? 'bg-white shadow-sm border border-gray-200' : 'bg-gray-900/70 border border-gray-800/50'}`}>
            <h2 className={`text-xl font-semibold mb-3 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
              Benefits
            </h2>
            <ul className={`list-disc list-inside space-y-2 ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
              <li>Improves focus and concentration</li>
              <li>Reduces mental fatigue</li>
              <li>Increases productivity and efficiency</li>
              <li>Helps manage distractions and interruptions</li>
              <li>Creates a better work-life balance</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PomodoroPage; 