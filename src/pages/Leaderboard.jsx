import React, { useState } from "react";
import { Trophy, Medal, TrendingUp, Users, Clock } from "lucide-react";

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
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <div className="flex items-center space-x-4">
            <select
              value={timeFilter}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Users className="h-5 w-5" />
              <span>Find Study Partners</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {getFilteredData().map((user) => (
            <div
              key={user.rank}
              className="flex items-center p-4 rounded-lg border hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-12">
                {getRankIcon(user.rank)}
              </div>
              <div className="flex items-center flex-1">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user.avatar}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{user.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {user.studyHours} hours {getTimeLabel()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Study Streak</div>
                  <div className="font-semibold flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    {user.streak} days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Total Points</div>
                  <div className="font-semibold">{user.studyHours * 10}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
