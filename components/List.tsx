"use client";

import React, { useState } from "react";
import { Todo } from "@/components";
import { Task } from "@/utils";

interface ListProps {
  taskList?: Task[];
  handleAddTask: (newTask: string) => void;
}

const List = ({ taskList, handleAddTask }: ListProps) => {
  const [newTask, setNewTask] = useState("");

  const handleTest = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTask) {
      handleAddTask(newTask);
    }
  };

  return (
    <div className="flex flex-col">
      {taskList &&
        taskList.map((task) => <Todo key={task.task} todo={task.task} />)}
      <div className="border-b-[1px] border-gray-900">
        <input
          id="New task input"
          type="text"
          className="bg-inherit border-0 w-full px-0 focus:ring-0 h-full"
          placeholder="Enter task here"
          value={newTask}
          onKeyUp={(event) => handleTest(event)}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <label htmlFor="New task input" />
      </div>
    </div>
  );
};

export default List;
