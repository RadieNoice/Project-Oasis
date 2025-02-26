import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../../components/reactbits/SpotlightCard";
import StudyTimeToday from "./StudyTimeToday.jsx";
import TasksCompleted from "./TasksCompleted.jsx";
import CurrentStreak from "./CurrentStreak.jsx";
import Pomodoro from "./Pomodoro.jsx";
import { toast } from "react-hot-toast";
import TaskManager from "./TaskManager.jsx";

const Dashboard = () => {
  // Load saved data from localStorage
  const [workTime, setWorkTime] = useState(() => {
    return parseInt(localStorage.getItem("workTime")) || 25;
  });
  const [breakTime, setBreakTime] = useState(() => {
    return parseInt(localStorage.getItem("breakTime")) || 5;
  });
  const [timeLeft, setTimeLeft] = useState(() => workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
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
  const [totalStudyTime, setTotalStudyTime] = useState(() => {
    return parseInt(localStorage.getItem("totalStudyTime")) || 0;
  });

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

  // Timer countdown logic
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        
        // Track study time if not in break mode
        if (!isBreak) {
          setTotalStudyTime(prev => prev + 1/60);
        }
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleSessionEnd();
      // Play notification sound and show toast
      new Audio("/notification.mp3").play().catch(err => console.log("Audio playback prevented:", err));
      toast.success(`${isBreak ? "Break time" : "Work session"} completed!`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

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
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
    toast.success("Task added successfully");
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((isBreak ? breakTime : workTime) * 60);
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getProgress = (sessions) => (sessions / 4) * 100;

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <StudyTimeToday todos={todos} workTime={workTime} totalStudyTime={totalStudyTime} />
        <TasksCompleted todos={todos} />
        <CurrentStreak />
        
        {/* Replace the inline timer with the Pomodoro component */}
        <Pomodoro 
          workTime={workTime}
          breakTime={breakTime}
          isActive={isActive}
          isBreak={isBreak}
          timeLeft={timeLeft}
          currentTask={currentTask}
          todos={todos}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          formatTimeLeft={formatTimeLeft}
        />
      </div>

      {/* Task Manager is now a separate component */}
      <TaskManager 
        todos={todos}
        setTodos={setTodos}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        isActive={isActive}
        setIsActive={setIsActive}
        workTime={workTime}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addTodo={addTodo}
        getProgress={getProgress}
      />
    </div>
  );
};

export default Dashboard;