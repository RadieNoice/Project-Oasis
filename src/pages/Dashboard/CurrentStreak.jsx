import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const CurrentStreak = () => {
  // Here, the streak is hardcoded. You can later modify this logic if needed.
  const currentStreak = "7 days";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-amber-900/20 to-amber-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        spotlightColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center z-10">
          <div className="p-3 rounded-lg bg-gradient-to-br from-amber-900/20 to-amber-900/5 border border-gray-800/30">
            <Trophy className="h-8 w-8 text-amber-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-400">Current Streak</h3>
            <p className="text-2xl font-bold text-white mt-1">{currentStreak}</p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default CurrentStreak;
