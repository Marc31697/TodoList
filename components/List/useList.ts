import { Task } from "@/utils";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

interface useListProps {
  title: string;
  taskList: Task[];
  updateTasks: (title: string, newTaskList?: Task[] | undefined) => void;
}

const useList = ({ taskList, updateTasks, title }: useListProps) => {
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

  return {
    state: {
      newTaskDesc,
      setNewTaskDesc,
      showDeleteTasks,
      setShowDeleteTasks,
      completedTasks,
      uncompletedTasks,
    },
    actions: {
      handleAddTask,
      handleCompleteTask,
      handleDeleteTask,
    },
  };
};

export default useList;
