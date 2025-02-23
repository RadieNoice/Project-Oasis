import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Users, 
  Clock, 
  Zap,
  Flame 
} from "lucide-react";

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const leaderboardData = [
    {
      rank: 1,
      name: "Alex Johnson",
      studyHours: 42,
      streak: 7,
      avatar: "AJ",
    },
    {
      rank: 2,
      name: "Sarah Smith",
      studyHours: 38,
      streak: 5,
      avatar: "SS",
    },
    {
      rank: 3,
      name: "Michael Brown",
      studyHours: 35,
      streak: 4,
      avatar: "MB",
    },
    {
      rank: 4,
      name: "Emily Davis",
      studyHours: 32,
      streak: 3,
      avatar: "ED",
    },
    {
      rank: 5,
      name: "David Wilson",
      studyHours: 30,
      streak: 2,
      avatar: "DW",
    },
  ];

  const getFilteredData = () => {
    try {
      switch (timeFilter) {
        case "week":
          return leaderboardData;
        case "month":
          return leaderboardData.map((user) => ({
            ...user,
            studyHours: user.studyHours * 4,
          }));
        case "all":
          return leaderboardData.map((user) => ({
            ...user,
            studyHours: user.studyHours * 16,
          }));
        default:
          return leaderboardData;
      }
    } catch (error) {
      console.error("Error filtering data:", error);
      return leaderboardData;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-500 shadow-yellow-200";
      case 2:
        return "from-gray-300 to-gray-400 shadow-gray-200";
      case 3:
        return "from-amber-600 to-amber-700 shadow-amber-200";
      default:
        return "bg-white";
    }
  };

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const getTimeLabel = () => {
    switch (timeFilter) {
      case "week":
        return "this week";
      case "month":
        return "this month";
      case "all":
        return "total";
      default:
        return "";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" rounded-2xl  shadow-2xl p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Study Leaderboard
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Top performers {getTimeLabel()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-gray-200"
            >
              <option value="week">📅 This Week</option>
              <option value="month">🗓️ This Month</option>
              <option value="all">🕒 All Time</option>
            </select>

            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Find Study Partners</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {getFilteredData().map((user) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group flex items-center p-4 rounded-xl border border-gray-800 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="w-14 flex justify-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shadow-lg ${
                      user.rank <= 3 ? "bg-gradient-to-br" : ""
                    } ${getRankStyle(user.rank)}`}
                  >
                    {user.rank <= 3 ? (
                      <Trophy className="h-5 w-5 text-white" />
                    ) : (
                      <span className="font-bold text-gray-600">
                        #{user.rank}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center flex-1 gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.avatar}
                    </div>
                    {user.streak >= 3 && (
                      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        {user.streak}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{user.studyHours} hours</span>
                      <div className="h-1 w-1 bg-gray-400 rounded-full" />
                      <span className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        {user.progress}% progress
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 ml-4">
                  <div className="text-center space-y-1">
                    <div className="text-sm text-gray-600">Daily Streak</div>
                    <div className="font-bold text-2xl flex items-center justify-center gap-2 text-orange-600">
                      <Flame className="h-6 w-6" />
                      {user.streak}
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-sm text-gray-600">Total XP</div>
                    <div className="font-bold text-2xl text-purple-600">
                      {(user.studyHours * 100).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <button className="flex items-center gap-2 mx-auto px-6 py-2 text-gray-400 hover:text-blue-400 transition-colors">
            <span>View Full Leaderboard</span>
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
