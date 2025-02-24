import React from "react";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const TasksCompleted = ({ todos }) => {
  const tasksCompleted = todos.filter((t) => t.completedSessions >= 4).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center z-10">
          <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-gray-800/30">
            <CheckSquare className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-400">Tasks Completed</h3>
            <p className="text-2xl font-bold text-white mt-1">
              {tasksCompleted}/{todos.length}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default TasksCompleted;
