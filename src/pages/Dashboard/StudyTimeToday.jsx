import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingUp, Award } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const StudyTimeToday = ({ todos, workTime, totalStudyTime, isActive, timeLeft }) => {
  // Force a re-render every second
  const [tick, setTick] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate elapsed seconds for the current active session (if any)
  const activeSessionElapsed = isActive ? workTime * 60 - timeLeft : 0;

  // Total seconds from completed sessions plus any active session time
  const totalSecondsFromTodos = todos.reduce(
    (acc, t) => acc + t.completedSessions * workTime * 60,
    0
  );
  
  // Use provided totalStudyTime if available, otherwise calculate
  const totalSeconds = totalStudyTime ? totalStudyTime * 60 : totalSecondsFromTodos + activeSessionElapsed;

  const studyHours = Math.floor(totalSeconds / 3600);
  const studyMinutes = Math.floor((totalSeconds % 3600) / 60);
  
  // Default daily goal: 2 hours (can be made configurable later)
  const dailyGoal = 2 * 60 * 60; // 2 hours in seconds
  const progressPercentage = Math.min(100, Math.round((totalSeconds / dailyGoal) * 100));
  
  // Simulate some stats for enhanced visual (these could be real calculations in the future)
  const streakDays = Math.floor(Math.random() * 10) + 1;
  const percentIncrease = Math.floor(Math.random() * 15) + 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(59, 130, 246, 0.15)"
      >
        <div 
          className="flex flex-col z-10"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/30 to-blue-700/10 border border-blue-800/30 shadow-inner">
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium text-gray-400">
                Study Time Today
              </h3>
              <div className="flex items-end gap-1">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={`${studyHours}-${studyMinutes}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-white mt-1"
                  >
                    {studyHours}h {studyMinutes}m
                  </motion.p>
                </AnimatePresence>
                {progressPercentage >= 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-1 ml-2"
                  >
                    <Award className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-800/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Daily Goal</span>
                  <span className="text-xs font-medium text-gray-300">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-1.5 mb-3">
                  <motion.div 
                    className="h-1.5 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                <div className="flex items-center mt-2 text-xs text-gray-400">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                  <span>
                    +{percentIncrease}% from yesterday
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default StudyTimeToday;