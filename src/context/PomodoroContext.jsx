// src/context/PomodoroContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleSessionEnd = () => {
    setIsActive(false);
    if (!isBreak) {
      // Complete a pomodoro session for current todo
      setTodos(todos.map(todo => 
        todo.id === currentTodoId 
          ? { ...todo, completedSessions: todo.completedSessions + 1 }
          : todo
      ));
    }
    setIsBreak(!isBreak);
    setTime(isBreak ? 25 * 60 : 5 * 60);
  };

  const startTimer = (todoId) => {
    setCurrentTodoId(todoId);
    setIsActive(true);
  };

  return (
    <PomodoroContext.Provider
      value={{
        time,
        isActive,
        isBreak,
        currentTodoId,
        todos,
        setTodos,
        startTimer,
        setIsActive,
        setTime,
        setIsBreak
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => useContext(PomodoroContext);