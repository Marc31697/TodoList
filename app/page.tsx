"use client";

import { useState, useEffect } from "react";
import { List, ListChooser } from "@/components";
import { Task, Tasks, loadTasks, saveTasks } from "@/utils";
import { v4 as uuidV4 } from "uuid";

export default function Home() {
  const [tasks, setTasks] = useState<Tasks>(loadTasks());
  const [titleList, setTitleList] = useState(Object.keys(tasks));
  const [activeTitle, setActiveTitle] = useState(Object.keys(tasks)[0] || "");
  const [activeTasks, setActiveTasks] = useState<Task[]>(
    tasks[activeTitle] || []
  );

  const createNewList = (title: string) => {
    setActiveTitle(title);
    setTasks((prevTasks) => ({ ...prevTasks, [title]: [] }));
  };

  const handleAddTask = (newTask: string) => {
    const task = {
      id: uuidV4(),
      task: newTask,
      completed: false,
      createdAt: new Date(),
    };

    if (!task) return null;

    const updatedTasks = [...activeTasks, task];
    setActiveTasks(updatedTasks);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [activeTitle]: updatedTasks,
    }));
  };

  const clearTasks = () => {
    localStorage.clear();
    setTasks(loadTasks());
    setActiveTitle("");
  };

  useEffect(() => {
    setTitleList(Object.keys(tasks));
    setActiveTasks(tasks[activeTitle] || []);
    saveTasks(tasks);
  }, [activeTitle, tasks]);

  return (
    <main className="flex justify-center h-[75vh] items-center">
      <div className="flex flex-col relative w-96">
        <button
          onClick={clearTasks}
          className="absolute top-56 p-4 text-xl text-red-600 border-2 rounded-md bg-black"
        >
          Clear WIP
        </button>
        <ListChooser
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
          titleList={titleList}
          createNewList={createNewList}
        />
        {activeTitle && (
          <List taskList={activeTasks} handleAddTask={handleAddTask} />
        )}
      </div>
    </main>
  );
}
