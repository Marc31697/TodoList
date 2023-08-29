"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/components";
import { Task } from "@/utils";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";

interface ListProps {
  title: string;
  taskList: Task[];
  updateTasks: (title: string, newTaskList?: Task[] | undefined) => void;
  deleteTasks: (title: string) => void;
}

const List = ({ title, taskList, updateTasks, deleteTasks }: ListProps) => {
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = () => {
    const task = {
      id: uuidV4(),
      task: newTaskDesc,
      completed: false,
      createdAt: new Date(),
    };

    if (!task) return null;

    const updatedTasks = [...taskList, task];

    updateTasks(title, updatedTasks);
    setNewTaskDesc("");
  };

  const handleDeleteTaskList = () => {
    deleteTasks(title);
  };

  useEffect(() => {
    setNewTaskDesc("");
  }, [taskList]);

  return (
    <div className="flex flex-col mb-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div>
          <button
            className="text-[10px] h-full hover:bg-gray-900 px-1"
            onClick={handleDeleteTaskList}
          >
            <Image
              alt="trash icon"
              src="/trash.svg"
              width={12}
              height={12}
              className="invert"
            />
          </button>
          {showAddTask ? (
            <button
              className="text-xl hover:bg-gray-900 px-1"
              onClick={() => setShowAddTask(false)}
            >
              -
            </button>
          ) : (
            <button
              className="text-xl hover:bg-gray-900 px-1"
              onClick={() => setShowAddTask(true)}
            >
              +
            </button>
          )}
        </div>
      </div>
      <div className="border-b-2 border-gray-900 mb-2" />
      {taskList &&
        taskList.map((task) => (
          <div key={task.task}>
            <Todo todo={task.task} />
            <div className="border-b-2 border-gray-900 mb-2" />
          </div>
        ))}
      {showAddTask && (
        <div className="border-b-[1px] border-gray-900 flex flex-row">
          <input
            id="New task input"
            type="text"
            className="bg-inherit border-0 w-full px-0 focus:ring-0 h-full"
            placeholder="Enter task here"
            value={newTaskDesc}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleAddTask();
              }
            }}
            onChange={(event) => setNewTaskDesc(event.target.value)}
          />
          <button onClick={handleAddTask} className="text-white">
            ✔️
          </button>
          <label htmlFor="New task input" />
        </div>
      )}
    </div>
  );
};

export default List;
