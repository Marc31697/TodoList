// components/TaskContext.js
"use client";

import { Task, Tasks, loadTasks } from "@/utils";
import React, { createContext, useContext, useState } from "react";

type TaskContextType = {
  tasks: Tasks;
  updateTasks: (title: string, newTaskList?: Task[]) => void;
  deleteTasks: (title: string) => void;
  activeTitle?: string;
  setActiveTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TaskContext = createContext<TaskContextType>({
  tasks: {},
  updateTasks: (title: string, newTaskList?: Task[]) => {},
  deleteTasks: (title: string) => {},
  activeTitle: "",
  setActiveTitle: () => {},
});

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState(loadTasks());
  const [activeTitle, setActiveTitle] = useState<string | undefined>("");

  const updateTasks = (title: string, newTaskList?: Task[]) => {
    setTasks((prevTasks: Tasks) => ({
      ...prevTasks,
      [title]: newTaskList || [],
    }));
  };

  const deleteTasks = (title: string) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[title];
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, updateTasks, deleteTasks, activeTitle, setActiveTitle }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
