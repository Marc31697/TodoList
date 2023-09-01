"use client";

import { List, SelectList, useTaskContext } from "@/components";

export default function Home() {
  const { tasks, updateTasks, activeTitle } = useTaskContext();

  return (
    <main className="flex h-full">
      <div className="flex flex-col relative w-screen">
        {tasks && activeTitle ? (
          <List
            key={activeTitle}
            title={activeTitle}
            taskList={tasks[activeTitle]}
            updateTasks={updateTasks}
          />
        ) : (
          <SelectList />
        )}
      </div>
    </main>
  );
}
