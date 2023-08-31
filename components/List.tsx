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
  const [showDeleteTasks, setShowDeleteTasks] = useState(false);

  const tasksByCompletion = taskList.reduce(
    (result, task) => {
      if (task.completed) {
        result.completedTasks.push(task);
      } else {
        result.uncompletedTasks.push(task);
      }
      return result;
    },
    { completedTasks: [], uncompletedTasks: [] } as {
      completedTasks: Task[];
      uncompletedTasks: Task[];
    }
  );

  const completedTasks = tasksByCompletion.completedTasks;
  const uncompletedTasks = tasksByCompletion.uncompletedTasks;

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

  const handleDeleteTask = (task: string) => {
    const updatedTasks = taskList.filter((oldTask) => oldTask.task !== task);

    updateTasks(title, updatedTasks);
  };

  useEffect(() => {
    setNewTaskDesc("");
  }, [taskList]);

  return (
    <div className="flex flex-col mb-10 ml-8 pl-3">
      <div id="uncompleted tasks" className="border-l-[1px] border-red-500">
        <div className="pl-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <button
              className="border-[1px] px-2 rounded-md bg-slate-600 h-8 hover:bg-red-700 text-black"
              onClick={() => setShowDeleteTasks(!showDeleteTasks)}
            >
              Delete Todos
            </button>
          </div>
          <div className="border-b-2 border-gray-900 mb-2 pl-2" />
        </div>
        {uncompletedTasks &&
          uncompletedTasks.map((task) => (
            <div key={task.task} className="pl-2">
              <Todo
                todo={task.task}
                handleCompleteTask={() => handleCompleteTask(task.task)}
                completed={task.completed}
                showDeleteTasks={showDeleteTasks}
                handleDeleteTask={() => handleDeleteTask(task.task)}
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
                showDeleteTasks={showDeleteTasks}
                handleDeleteTask={() => handleDeleteTask(task.task)}
              />
              <div className="border-b-2 border-gray-900 mb-2" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
