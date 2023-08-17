export type Task = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type Tasks = {
  [category: string]: Task[];
};

export const loadTasks = () => {
  if (typeof localStorage === "undefined") return {};

  const tasksJSON = localStorage.getItem("TASKS");
  if (tasksJSON == null) return {};
  return JSON.parse(tasksJSON);
};

export const saveTasks = (tasks: Tasks) => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};
