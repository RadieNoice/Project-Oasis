import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Calendar, Star, TrendingUp, Award } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const CurrentStreak = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Here, the streak is hardcoded. You can later modify this logic if needed.
  const currentStreak = 7; // days
  const longestStreak = 14; // days
  const totalStudyDays = 32; // all-time study days
  
  // Milestones for streak achievements
  const milestones = [1, 3, 7, 14, 30, 60, 90];
  const nextMilestone = milestones.find(m => m > currentStreak) || milestones[milestones.length - 1];
  const progressToNextMilestone = (currentStreak / nextMilestone) * 100;
  
  // Determine if current streak is impressive
  const isImpressiveStreak = currentStreak >= 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-amber-900/20 to-amber-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(245, 158, 11, 0.15)"
      >
        <div 
          className="flex flex-col z-10"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-700/10 border border-amber-800/30 shadow-inner">
              <Trophy className="h-8 w-8 text-amber-400" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium text-gray-400">Current Streak</h3>
              <div className="flex items-end gap-2">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentStreak}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-white mt-1"
                  >
                    {currentStreak} days
                  </motion.p>
                </AnimatePresence>
                
                {isImpressiveStreak && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, 0, -15, 0] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-1"
                  >
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
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
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Next milestone
                  </span>
                  <span className="text-xs font-medium text-gray-300">{nextMilestone} days</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-1.5 mb-3">
                  <motion.div 
                    className="h-1.5 rounded-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextMilestone}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-3">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-400" />
                    <span>Longest streak: <span className="text-white">{longestStreak} days</span></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-amber-400" />
                    <span>Total study days: <span className="text-white">{totalStudyDays}</span></span>
                  </div>
                </div>
                
                {currentStreak >= 3 && (
                  <div className="mt-3 text-xs text-center font-medium text-amber-400/90">
                    {currentStreak >= 30 ? "Incredible dedication! You're unstoppable!" :
                     currentStreak >= 14 ? "Amazing consistency! Keep it up!" :
                     currentStreak >= 7 ? "Great work! You're building a solid habit!" :
                     "Good momentum! Keep the streak alive!"}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default CurrentStreak;