"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/components";
import { Task } from "@/utils";
import { v4 as uuidV4 } from "uuid";

interface ListProps {
  title: string;
  taskList: Task[];
  updateTasks: (title: string, newTaskList?: Task[] | undefined) => void;
}

const List = ({ title, taskList, updateTasks }: ListProps) => {
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const uncompletedTasks = taskList.filter((task) => {
    if (task.completed !== true) return task;
  });
  const completedTasks = taskList.filter((task) => {
    if (task.completed === true) return task;
  });

  console.log("uncompleted tasks", uncompletedTasks);

  const handleAddTask = () => {
    const task = {
      id: uuidV4(),
      task: newTaskDesc,
      completed: false,
      createdAt: new Date(),
    };

    if (!task || !newTaskDesc) return null;

    const updatedTasks = [...taskList, task];

    updateTasks(title, updatedTasks);
    setNewTaskDesc("");
  };

  const handleCompleteTask = (task: string) => {
    const updatedTasks = taskList.map((oldTask) => {
      if (oldTask.task === task) oldTask.completed = true;
      return oldTask;
    });

    updateTasks(title, updatedTasks);
  };

  useEffect(() => {
    setNewTaskDesc("");
  }, [taskList]);

  return (
    <div className="flex flex-col mb-10 ml-8 pl-3">
      <div id="uncompleted tasks" className="border-l-[1px] border-red-500">
        <div className="pl-2">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="border-b-2 border-gray-900 mb-2 pl-2" />
        </div>
        {uncompletedTasks &&
          uncompletedTasks.map((task) => (
            <div key={task.task} className="pl-2">
              <Todo
                todo={task.task}
                handleCompleteTask={() => handleCompleteTask(task.task)}
                completed={task.completed}
              />
              <div className="border-b-2 border-gray-900 mb-2" />
            </div>
          ))}
        <div className="pl-2">
          <div className="flex flex-row">
            <input
              id="New task input"
              type="text"
              className="bg-inherit border-0 w-min px-0 focus:ring-0 h-full text-2xl"
              placeholder="Enter task here"
              value={newTaskDesc}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleAddTask();
                }
              }}
              onChange={(event) => setNewTaskDesc(event.target.value)}
            />
            <button
              onClick={handleAddTask}
              className="text-white flex items-center justify-start"
            >
              ✔️
            </button>
            <label htmlFor="New task input" />
          </div>
          <div className="border-b-2 border-gray-900 mb-2" />
        </div>
      </div>
      <div
        id="completed tasks"
        className="text-gray-500 border-l-[1px] border-red-500 mt-10"
      >
        <div className="pl-2">
          <h1 className="text-4xl font-semibold">Completed</h1>
          <div className="border-b-2 border-gray-900 mb-2" />
        </div>
        {completedTasks &&
          completedTasks.map((task) => (
            <div key={task.task} className="pl-2">
              <Todo
                todo={task.task}
                handleCompleteTask={() => handleCompleteTask(task.task)}
                completed={task.completed}
              />
              <div className="border-b-2 border-gray-900 mb-2" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
