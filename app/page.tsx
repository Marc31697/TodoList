"use client";

import { useState, useEffect } from "react";
import { List, ListChooser } from "@/components";
import { Tasks, loadTasks, saveTasks } from "@/utils";

export default function Home() {
  // const tasks: Tasks = loadTasks();
  const [tasks, setTasks] = useState<Tasks>(loadTasks());
  const [titleList, setTitleList] = useState(Object.keys(tasks));
  const [activeTitle, setActiveTitle] = useState(Object.keys(tasks)[0] || "");
  // const [activeTasks, setActiveTasks] = useState<string[]>([]);
  // const addItemToList = (newTask: string) => {
  //   const addTask = activeTasks;
  //   addTask.push(newTask);
  // };

  const createNewList = (title: string) => {
    setActiveTitle(title);
    setTasks((prevTasks) => ({ ...prevTasks, [title]: [] }));
  };

  useEffect(() => {
    setTitleList(Object.keys(tasks));
    saveTasks(tasks);
  }, [tasks]);

  const clearTasks = () => {
    localStorage.clear();
    setTasks(loadTasks());
  };

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
        {/* {activeTitle && (
          <List todoList={activeTodoList} addItemToList={addItemToList} />
        )} */}
      </div>
    </main>
  );
}
