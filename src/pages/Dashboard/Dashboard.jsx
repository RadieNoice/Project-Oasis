import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Play, Plus, Trash2 } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";
import StudyTimeToday from "./StudyTimeToday.jsx";
import TasksCompleted from "./TasksCompleted.jsx";
import CurrentStreak from "./CurrentStreak.jsx";
import Pomodoro from "./Pomodoro.jsx"

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
        setTimeLeft((prevTime) => prevTime - 1);
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

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <StudyTimeToday todos={todos} workTime={workTime} />
        <TasksCompleted todos={todos} />
        <CurrentStreak />
        <Pomodoro />
      </div>

      {/* Additional sections like Task Manager can be added below */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                          className={`px-2 py-1 text-xs rounded-full ${
                            todo.priority === "high"
                              ? "bg-red-500/20 text-red-400"
                              : todo.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {todo.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {todo.dueDate
                              ? new Date(todo.dueDate).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
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
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

export default Dashboard;
