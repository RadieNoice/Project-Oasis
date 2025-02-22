import React from "react";
import { Trophy, Star, Clock, Book, Target, Zap } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Study Streak Master",
      description: "Maintained a 7-day study streak",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: "Focus Champion",
      description: "Completed 10 focus sessions without interruption",
      icon: <Target className="h-8 w-8 text-red-500" />,
      progress: 80,
      completed: false,
    },
    {
      id: 3,
      title: "Knowledge Seeker",
      description: "Added 50 study materials to your bookshelf",
      icon: <Book className="h-8 w-8 text-blue-500" />,
      progress: 60,
      completed: false,
    },
    {
      id: 4,
      title: "Time Master",
      description: "Accumulated 100 hours of study time",
      icon: <Clock className="h-8 w-8 text-green-500" />,
      progress: 45,
      completed: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Achievements</h1>
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-semibold">240 Points</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`border rounded-lg p-6 ${
                achievement.completed ? "bg-green-50 border-green-200" : ""
              }`}
            >
              <div className="flex items-center mb-4">
                {achievement.icon}
                <div className="ml-3">
                  <h3 className="font-semibold flex items-center">
                    {achievement.title}
                    {achievement.completed && (
                      <Star className="h-4 w-4 text-yellow-500 ml-2 fill-current" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {achievement.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                  <div
                    style={{ width: `${achievement.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
