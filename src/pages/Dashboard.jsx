import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckSquare,
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import SpotlightCard from "../components/reactbits/SpotlightCard";

const Dashboard = () => {
  const [workTime, setWorkTime] = React.useState(25);
  const [breakTime, setBreakTime] = React.useState(5);
  const [timeLeft, setTimeLeft] = React.useState(workTime * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState(null);
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [priority, setPriority] = React.useState("medium");
  const [dueDate, setDueDate] = React.useState("");

  React.useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSessionEnd = () => {
    setIsActive(false);
    if (!isBreak && currentTask) {
      setTodos(
        todos.map((todo) =>
          todo.id === currentTask
            ? { ...todo, completedSessions: todo.completedSessions + 1 }
            : todo
        )
      );
    }
    setIsBreak(!isBreak);
    setTimeLeft((isBreak ? workTime : breakTime) * 60);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: crypto.randomUUID(),
      title: newTodo,
      dueDate: dueDate || null,
      priority,
      completedSessions: 0,
      estimatedSessions: 4,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
  };

  const getProgress = (sessions) => (sessions / 4) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const stats = [
    {
      icon: Clock,
      color: "text-blue-400",
      title: "Study Time Today",
      value: `${Math.floor(
        (todos.reduce((acc, t) => acc + t.completedSessions, 0) * workTime) / 60
      )}h ${
        (todos.reduce((acc, t) => acc + t.completedSessions, 0) * workTime) % 60
      }m`,
      bg: "from-blue-900/20 to-blue-900/5",
    },
    {
      icon: CheckSquare,
      color: "text-emerald-400",
      title: "Tasks Completed",
      value: `${todos.filter((t) => t.completedSessions >= 4).length}/${
        todos.length
      }`,
      bg: "from-emerald-900/20 to-emerald-900/5",
    },
    {
      icon: Trophy,
      color: "text-amber-400",
      title: "Current Streak",
      value: "7 days",
      bg: "from-amber-900/20 to-amber-900/5",
    },
  ];

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden ">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none"  />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SpotlightCard
              className={`bg-gradient-to-br ${item.bg} rounded-2xl border border-gray-800/50 backdrop-blur-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <div className="flex items-center z-10">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${item.bg} border border-gray-800/30`}
                >
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-400">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-white mt-1">
                    {item.value}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}

        {/* Adjustable Pomodoro Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SpotlightCard
            className=""
            spotlightColor="rgba(255, 255, 255, 0.25)"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">
                  {isBreak
                    ? "Break Time"
                    : currentTask
                    ? "Working On"
                    : "Focus Timer"}
                </h3>
                <div className="text-3xl font-bold text-white">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Work (min)
                  </label>
                  <input
                    type="number"
                    value={workTime}
                    onChange={(e) => {
                      const value = Math.max(1, parseInt(e.target.value) || 1);
                      setWorkTime(value);
                      if (!isActive && !isBreak) setTimeLeft(value * 60);
                    }}
                    className="w-full p-2 bg-gray-800/50 rounded-lg border border-gray-700/30 text-white"
                    min="1"
                    disabled={isActive}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Break (min)
                  </label>
                  <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => {
                      const value = Math.max(1, parseInt(e.target.value) || 1);
                      setBreakTime(value);
                      if (!isActive && isBreak) setTimeLeft(value * 60);
                    }}
                    className="w-full p-2 bg-gray-800/50 rounded-lg border border-gray-700/30 text-white"
                    min="1"
                    disabled={isActive}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  {isActive ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimeLeft(workTime * 60);
                    setIsActive(false);
                    setIsBreak(false);
                    setCurrentTask(null);
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Task Manager Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SpotlightCard
          className="bg-gray-900/50 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
          spotlightColor="rgba(255, 255, 255, 0.15)"
        >
          <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
          <form
            onSubmit={addTodo}
            className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New task..."
              className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/30"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/30"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/30"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 p-2 bg-green-500/30 hover:bg-green-500/40 text-green-400 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Task
            </button>
          </form>

          <div className="space-y-4">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SpotlightCard
                  className="p-4 rounded-lg border border-gray-700/30 bg-gray-800/40"
                  spotlightColor="rgba(255, 255, 255, 0.1)"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={todo.completedSessions >= 4}
                      readOnly
                      className="h-5 w-5 rounded border-gray-300 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`${
                            todo.completedSessions >= 4
                              ? "line-through text-gray-500"
                              : "text-gray-200"
                          }`}
                        >
                          {todo.title}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                            todo.priority
                          )}`}
                        >
                          {todo.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{todo.completedSessions}/4 sessions</span>
                        </div>
                        {todo.dueDate && (
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentTask(todo.id);
                          setIsActive(true);
                        }}
                        disabled={isActive && currentTask !== todo.id}
                        className={`p-2 rounded-lg ${
                          currentTask === todo.id
                            ? "bg-purple-500/30 hover:bg-purple-500/40"
                            : "bg-gray-700/30 hover:bg-gray-600/40"
                        } transition-colors`}
                      >
                        <Play className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          setTodos(todos.filter((t) => t.id !== todo.id))
                        }
                        className="p-2 text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {todo.completedSessions < 4 && (
                    <div className="mt-2 h-2 bg-gray-700/30 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${getProgress(todo.completedSessions)}%`,
                        }}
                      />
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

// Helper function for priority colors
const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500/20 text-red-400";
    case "medium":
      return "bg-yellow-500/20 text-yellow-400";
    case "low":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default Dashboard;