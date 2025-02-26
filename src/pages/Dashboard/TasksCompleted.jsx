import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Trophy, ArrowUp } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const TasksCompleted = ({ todos }) => {
  const [showDetails, setShowDetails] = useState(false);
  const tasksCompleted = todos.filter((t) => t.completedSessions >= 4).length;
  
  // Calculate completion percentage
  const completionPercentage = todos.length > 0 
    ? Math.round((tasksCompleted / todos.length) * 100) 
    : 0;
  
  // Get the tasks completed today (assuming createdAt exists on todos)
  const today = new Date().toDateString();
  const completedToday = todos.filter(t => 
    t.completedSessions >= 4 && 
    new Date(t.createdAt).toDateString() === today
  ).length;

  // Motivational messages based on completion rate
  const getMessage = () => {
    if (todos.length === 0) return "Add tasks to get started!";
    if (completionPercentage === 100) return "All tasks completed! Amazing job!";
    if (completionPercentage >= 75) return "Almost there! Keep it up!";
    if (completionPercentage >= 50) return "Halfway there! You're on a roll!";
    if (completionPercentage >= 25) return "Good progress! Keep going!";
    return "Just getting started! You can do this!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(16, 185, 129, 0.15)"
      >
        <div 
          className="flex flex-col z-10"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-900/30 to-emerald-700/10 border border-emerald-800/30 shadow-inner">
              <CheckSquare className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium text-gray-400">Tasks Completed</h3>
              <div className="flex items-end gap-2">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={`${tasksCompleted}-${todos.length}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-white mt-1"
                  >
                    {tasksCompleted}/{todos.length}
                  </motion.p>
                </AnimatePresence>
                {completionPercentage === 100 && todos.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, 0, -15, 0] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-1"
                  >
                    <Trophy className="h-5 w-5 text-yellow-400" />
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
                  <span className="text-xs text-gray-400">Completion</span>
                  <span className="text-xs font-medium text-gray-300">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-1.5 mb-3">
                  <motion.div 
                    className="h-1.5 rounded-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                {completedToday > 0 && (
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <ArrowUp className="h-3 w-3 mr-1 text-emerald-400" />
                    <span>
                      {completedToday} task{completedToday > 1 ? 's' : ''} completed today
                    </span>
                  </div>
                )}
                
                <div className="mt-3 text-xs text-center font-medium text-emerald-400/90">
                  {getMessage()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default TasksCompleted;