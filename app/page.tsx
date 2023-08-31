"use client";

import { List, useTaskContext } from "@/components";
import { saveTasks } from "@/utils";
import { useEffect } from "react";

export default function Home() {
  const { tasks, updateTasks, deleteTasks, activeTitle } = useTaskContext();

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <main className="flex h-full">
      <div className="flex flex-col relative px-4 w-full">
        {tasks && activeTitle ? (
          <List
            key={activeTitle}
            title={activeTitle}
            taskList={tasks[activeTitle]}
            updateTasks={updateTasks}
          />
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}
