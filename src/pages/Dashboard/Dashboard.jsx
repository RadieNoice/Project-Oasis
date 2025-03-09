import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Check, X, Play, Pause, RotateCcw } from "lucide-react";
import StudyTimeToday from "./StudyTimeToday.jsx";
import TasksCompleted from "./TasksCompleted.jsx";
import CurrentStreak from "./CurrentStreak.jsx";
import { toast } from "react-hot-toast";
import TaskManager from "./TaskManager.jsx";
import PomodoroBox from "./PomodoroBox.jsx";
import MusicBox from "./MusicBox.jsx";

const Dashboard = () => {
  // Load saved data from localStorage
  const [workTime, setWorkTime] = useState(
    () => parseInt(localStorage.getItem("workTime")) || 25
  );
  const [breakTime, setBreakTime] = useState(
    () => parseInt(localStorage.getItem("breakTime")) || 5
  );

  // Replace single timer with task-specific timers
  const [taskTimers, setTaskTimers] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  const [isBreakTimers, setIsBreakTimers] = useState({});

  const [totalStudyTime, setTotalStudyTime] = useState(
    () => parseInt(localStorage.getItem("totalStudyTime")) || 0
  );

  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
      console.error("Error loading todos from localStorage", e);
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save timer settings when changed
  useEffect(() => {
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("breakTime", breakTime);
  }, [workTime, breakTime]);

  // Save total study time
  useEffect(() => {
    localStorage.setItem("totalStudyTime", totalStudyTime);
  }, [totalStudyTime]);

  // Initialize timers for new tasks
  useEffect(() => {
    const newTaskTimers = { ...taskTimers };
    const newIsBreakTimers = { ...isBreakTimers };

    todos.forEach((todo) => {
      if (!(todo.id in taskTimers)) {
        newTaskTimers[todo.id] = workTime * 60;
        newIsBreakTimers[todo.id] = false;
      }
    });

    // Remove timers for deleted tasks
    Object.keys(taskTimers).forEach((id) => {
      if (!todos.find((todo) => todo.id === id)) {
        delete newTaskTimers[id];
        delete newIsBreakTimers[id];
      }
    });

    setTaskTimers(newTaskTimers);
    setIsBreakTimers(newIsBreakTimers);
  }, [todos, workTime]);

  // Timer countdown logic for all active timers
  useEffect(() => {
    let intervals = {};

    Object.entries(activeTimers).forEach(([todoId, isActive]) => {
      if (isActive && taskTimers[todoId] > 0) {
        intervals[todoId] = setInterval(() => {
          setTaskTimers((prev) => ({
            ...prev,
            [todoId]: prev[todoId] - 1,
          }));

          // Track study time if not in break mode
          if (!isBreakTimers[todoId]) {
            setTotalStudyTime((prev) => prev + 1 / 60);
          }
        }, 1000);
      } else if (isActive && taskTimers[todoId] === 0) {
        handleSessionEnd(todoId);
        // Play notification sound and show toast
        new Audio("/notification.mp3")
          .play()
          .catch((err) => console.log("Audio playback prevented:", err));
        toast.success(
          `${
            isBreakTimers[todoId] ? "Break time" : "Work session"
          } completed for task!`
        );
      }
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [activeTimers, taskTimers, isBreakTimers]);

  const handleSessionEnd = (todoId) => {
    setActiveTimers((prev) => ({
      ...prev,
      [todoId]: false,
    }));

    if (!isBreakTimers[todoId]) {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId
            ? { ...todo, completedSessions: todo.completedSessions + 1 }
            : todo
        )
      );
    }

    setIsBreakTimers((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));

    setTaskTimers((prev) => ({
      ...prev,
      [todoId]: (isBreakTimers[todoId] ? workTime : breakTime) * 60,
    }));
  };

  const toggleTimer = (todoId) => {
    setActiveTimers((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  const resetTimer = (todoId) => {
    setActiveTimers((prev) => ({
      ...prev,
      [todoId]: false,
    }));

    setTaskTimers((prev) => ({
      ...prev,
      [todoId]: (isBreakTimers[todoId] ? breakTime : workTime) * 60,
    }));
  };

  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
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
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
    toast.success("Task added successfully");
  };

  const getProgress = (sessions) => (sessions / 4) * 100;

  return (
    <div className="min-h-screen flex flex-col p-4 space-y-6 relative overflow-auto">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top row: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudyTimeToday
          todos={todos}
          workTime={workTime}
          totalStudyTime={totalStudyTime}
        />
        <TasksCompleted todos={todos} />
        <CurrentStreak />
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <PomodoroBox />
        </div>
        <div className="w-1/2">
          <MusicBox className="w-full" />
        </div>
      </div>

      {/* Main Content: TaskManager and MusicBox */}
      <div className="flex flex-col">
        <TaskManager
          todos={todos}
          setTodos={setTodos}
          taskTimers={taskTimers}
          activeTimers={activeTimers}
          isBreakTimers={isBreakTimers}
          workTime={workTime}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addTodo={addTodo}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          formatTimeLeft={formatTimeLeft}
          getProgress={getProgress}
        />
      </div>
    </div>
  );
};

export default Dashboard;
