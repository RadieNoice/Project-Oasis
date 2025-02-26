import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Play, Plus, Trash2, Filter, Clock, CheckSquare, AlertTriangle } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const TaskManager = ({ 
  todos, 
  setTodos, 
  currentTask, 
  setCurrentTask, 
  isActive, 
  setIsActive, 
  workTime,
  newTodo,
  setNewTodo,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addTodo,
  getProgress
}) => {
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  
  // Sort todos by priority and due date
  const sortedTodos = [...todos].sort((a, b) => {
    // Priority first (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by due date (if available)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    
    // Items with due dates come before those without
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return 0;
  });
  
  // Filter todos based on current filter
  const filteredTodos = sortedTodos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active") return todo.completedSessions < 4;
    if (filter === "completed") return todo.completedSessions >= 4;
    return true;
  });
  
  // Stats for the task list
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completedSessions >= 4).length;
  const activeTasks = totalTasks - completedTasks;
  
  // Due today count
  const today = new Date().toISOString().split('T')[0];
  const dueTodayCount = todos.filter(t => 
    t.dueDate === today && t.completedSessions < 4
  ).length;

  // Enhanced form submission that provides visual feedback
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    // Generate a unique ID for the new task
    const newId = crypto.randomUUID();
    
    // Create the new todo object
    const todo = {
      id: newId,
      title: newTodo,
      dueDate: dueDate || null,
      priority,
      completedSessions: 0,
      estimatedSessions: 4,
      createdAt: new Date().toISOString(),
    };
    
    // Update the todos list
    setTodos(prevTodos => [...prevTodos, todo]);
    
    // Clear the form
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
    
    // Set this as the just added task for highlighting
    setJustAdded(newId);
    
    // Clear the highlight after 2 seconds
    setTimeout(() => {
      setJustAdded(null);
    }, 2000);
    
    // If using the parent component's addTodo function
    // Don't pass the event to avoid conflicts with parent component
    if (typeof addTodo === 'function') {
      // Create a new synthetic event to avoid issues with event pooling
      const syntheticEvent = { preventDefault: () => {} };
      addTodo(syntheticEvent);
    }
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { 
              ...todo, 
              completedSessions: todo.completedSessions >= 4 ? 0 : 4 
            }
          : todo
      )
    );
  };

  // Handle starting a task
  const handleStartTask = (todoId) => {
    // Find the task to make sure it exists and isn't completed
    const taskToStart = todos.find(t => t.id === todoId);
    if (!taskToStart || taskToStart.completedSessions >= 4) {
      return; // Don't proceed if task doesn't exist or is completed
    }
    
    // If a task is already active and it's not this task, confirm before switching
    if (isActive && currentTask !== todoId) {
      if (window.confirm("Stop current task and start this one?")) {
        setCurrentTask(todoId);
        setIsActive(true);
      }
    } else {
      setCurrentTask(todoId);
      setIsActive(true);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (todoId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((t) => t.id !== todoId));
      if (currentTask === todoId) {
        setCurrentTask(null);
        setIsActive(false);
      }
    }
  };

  // Effect to clear justAdded state after component unmounts
  useEffect(() => {
    return () => {
      if (justAdded) clearTimeout(justAdded);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SpotlightCard
        className="bg-gradient-to-br from-gray-900/70 to-gray-900/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
        spotlightColor="rgba(255, 255, 255, 0.10)"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Task Manager</h2>
          
          {totalTasks > 0 && (
            <div className="flex gap-2 text-xs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filter === "all" 
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                    : "bg-gray-800/40 text-gray-400 border border-gray-700/30"
                }`}
              >
                All ({totalTasks})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("active")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filter === "active" 
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                    : "bg-gray-800/40 text-gray-400 border border-gray-700/30"
                }`}
              >
                Active ({activeTasks})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("completed")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filter === "completed" 
                    ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                    : "bg-gray-800/40 text-gray-400 border border-gray-700/30"
                }`}
              >
                Completed ({completedTasks})
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Task Input Form */}
        <motion.form
          onSubmit={handleAddTodo}
          className={`mb-6 p-4 rounded-xl border transition-colors duration-200 ${
            isFormFocused 
              ? "bg-gray-800/60 border-gray-600/50 shadow-lg" 
              : "bg-gray-800/30 border-gray-700/20"
          }`}
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
          layout
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-2.5 pl-4 bg-gray-900/60 rounded-lg border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
              />
              {!newTodo && (
                <div className="absolute top-3 right-4 text-gray-500">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-800 rounded border border-gray-700">Enter</kbd>
                </div>
              )}
            </div>
            
            <div>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2.5 pl-10 bg-gray-900/60 rounded-lg border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 bg-gray-900/60 rounded-lg border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!newTodo.trim()}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-lg transition-all shadow-sm ${
                newTodo.trim()
                  ? "bg-gradient-to-r from-green-600/80 to-green-500/80 hover:from-green-500/80 hover:to-green-400/80 text-white" 
                  : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Plus className={`h-5 w-5 ${newTodo.trim() ? "text-white" : "text-gray-400"}`} />
              Add Task
            </motion.button>
          </div>
        </motion.form>

        {/* Tasks List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-gray-700/50 bg-gray-800/20 p-12 text-center"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-full bg-gray-800/60">
                  <CheckSquare className="h-10 w-10 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-1">No tasks yet</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Add your first task using the form above to start tracking your progress.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : filteredTodos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-gray-700/50 bg-gray-800/20 p-8 text-center"
            >
              <p className="text-gray-400">No {filter} tasks found.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTodos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: justAdded === todo.id ? [1, 1.02, 1] : 1,
                    borderColor: justAdded === todo.id ? ['#4ADE80', '#4ADE80', 'rgba(75, 85, 99, 0.3)'] : undefined
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: justAdded === todo.id ? 0.8 : 0.3
                  }}
                  layout
                >
                  <SpotlightCard
                    className={`p-4 rounded-xl border ${
                      justAdded === todo.id 
                        ? "border-green-500/50 bg-green-900/10" 
                        : todo.completedSessions >= 4
                        ? "border-green-800/30 bg-gradient-to-br from-green-900/10 to-gray-800/30"
                        : todo.priority === "high"
                        ? "border-red-800/30 bg-gradient-to-br from-red-900/10 to-gray-800/30"
                        : "border-gray-700/30 bg-gray-800/40"
                    } hover:shadow-md transition-all duration-300`}
                    spotlightColor={
                      justAdded === todo.id
                        ? "rgba(74, 222, 128, 0.08)"
                        : todo.completedSessions >= 4
                        ? "rgba(74, 222, 128, 0.05)"
                        : todo.priority === "high"
                        ? "rgba(248, 113, 113, 0.05)"
                        : "rgba(255, 255, 255, 0.03)"
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={todo.completedSessions >= 4}
                          onChange={() => toggleTaskCompletion(todo.id)}
                          className="h-5 w-5 rounded border-gray-600 text-green-600 focus:ring-0 cursor-pointer"
                        />
                        {todo.priority === "high" && todo.completedSessions < 4 && (
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.8, 1]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5
                            }}
                            className="absolute -right-1 -top-1"
                          >
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`${
                              todo.completedSessions >= 4
                                ? "line-through text-gray-500"
                                : "text-gray-100"
                            } font-medium`}
                          >
                            {todo.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              todo.priority === "high"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : todo.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                          >
                            {todo.priority}
                          </span>
                          
                          {todo.dueDate && new Date(todo.dueDate).toISOString().split('T')[0] === today && todo.completedSessions < 4 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Today
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                            <span className={todo.dueDate && new Date(todo.dueDate) < new Date() && todo.completedSessions < 4 ? "text-red-400" : ""}>
                              {todo.dueDate
                                ? new Date(todo.dueDate).toLocaleDateString()
                                : "No due date"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-gray-500" />
                            <span>
                              Sessions: {todo.completedSessions}/{todo.estimatedSessions}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-700/50 rounded-full h-1.5">
                              <motion.div 
                                className="rounded-full h-1.5" 
                                initial={{ width: 0 }}
                                animate={{ width: `${getProgress(todo.completedSessions)}%` }}
                                style={{ 
                                  backgroundColor: todo.completedSessions >= 4 
                                    ? "#4ADE80" 
                                    : "#A855F7"
                                }}
                              />
                            </div>
                            <span className="text-xs">
                              {Math.round(getProgress(todo.completedSessions))}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStartTask(todo.id)}
                          disabled={todo.completedSessions >= 4}
                          className={`p-2 rounded-lg transition-all ${
                            todo.completedSessions >= 4
                              ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                              : currentTask === todo.id
                              ? "bg-purple-500/40 hover:bg-purple-500/50 text-purple-300 shadow-sm"
                              : "bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 hover:text-white"
                          }`}
                          title={
                            todo.completedSessions >= 4 
                              ? "Completed tasks cannot be started" 
                              : "Start this task"
                          }
                        >
                          <Play className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteTask(todo.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {/* Task summary footer */}
          {todos.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-between items-center text-sm text-gray-500"
            >
              <div>
                {completedTasks}/{totalTasks} tasks completed
              </div>
              
              {dueTodayCount > 0 && (
                <div className="flex items-center gap-1 text-blue-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{dueTodayCount} due today</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default TaskManager;