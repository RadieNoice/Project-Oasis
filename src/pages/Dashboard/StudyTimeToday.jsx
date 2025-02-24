import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const StudyTimeToday = ({ todos, workTime, isActive, timeLeft }) => {
  // Force a re-render every second
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate elapsed seconds for the current active session (if any)
  // Assuming one work session is workTime minutes (converted to seconds)
  const activeSessionElapsed = isActive ? workTime * 60 - timeLeft : 0;

  // Total seconds from completed sessions plus any active session time
  const totalSecondsFromTodos = todos.reduce(
    (acc, t) => acc + t.completedSessions * workTime * 60,
    0
  );
  const totalSeconds = totalSecondsFromTodos + activeSessionElapsed;

  const studyHours = Math.floor(totalSeconds / 3600);
  const studyMinutes = Math.floor((totalSeconds % 3600) / 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center z-10">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-gray-800/30">
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-400">
              Study Time Today
            </h3>
            <p className="text-2xl font-bold text-white mt-1">
              {studyHours}h {studyMinutes}m
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default StudyTimeToday;
