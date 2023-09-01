"use client";

import { Todo } from "@/components";
import { Task } from "@/utils";
import useList from "./useList";

interface ListProps {
  title: string;
  taskList: Task[];
  updateTasks: (title: string, newTaskList?: Task[] | undefined) => void;
}

const List = ({ title, taskList, updateTasks }: ListProps) => {
  const { state, actions } = useList({ taskList, updateTasks, title });

  return (
    <div className="flex flex-col mb-10 ml-5 pl-3 w-4/6 lg:w-3/4 flex-grow mt-5">
      <div id="uncompleted tasks" className="border-l-[1px] border-red-500">
        <div className="pl-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-4xl font-semibold w-3/4">{title}</h1>
            <button
              className="border-[1px] px-2 rounded-md h-8 bg-red-700 hover:bg-red-500 text-black"
              onClick={() => state.setShowDeleteTasks(!state.showDeleteTasks)}
            >
              Delete Todos
            </button>
          </div>
          <div className="border-b-2 border-gray-900 mb-2 pl-2" />
        </div>
        {state.uncompletedTasks &&
          state.uncompletedTasks.map((task) => (
            <div key={task.task} className="pl-2">
              <Todo
                todo={task.task}
                handleCompleteTask={() => actions.handleCompleteTask(task.task)}
                completed={task.completed}
                showDeleteTasks={state.showDeleteTasks}
                handleDeleteTask={() => actions.handleDeleteTask(task.task)}
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
              value={state.newTaskDesc}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  actions.handleAddTask();
                }
              }}
              onChange={(event) => state.setNewTaskDesc(event.target.value)}
            />
            <button
              onClick={actions.handleAddTask}
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
        {state.completedTasks &&
          state.completedTasks.map((task) => (
            <div key={task.task} className="pl-2">
              <Todo
                todo={task.task}
                handleCompleteTask={() => actions.handleCompleteTask(task.task)}
                completed={task.completed}
                showDeleteTasks={state.showDeleteTasks}
                handleDeleteTask={() => actions.handleDeleteTask(task.task)}
              />
              <div className="border-b-2 border-gray-900 mb-2" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
