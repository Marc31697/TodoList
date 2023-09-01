import { useTaskContext } from "@/components";
import { useState } from "react";

const useSidebar = () => {
  const { tasks, updateTasks, setActiveTitle, deleteTasks } = useTaskContext();
  const [titleList, setTitleList] = useState(Object.keys(tasks));
  const [createListModalOpen, setCreateListModalOpen] = useState(false);
  const [confimrationModalOpen, setConfimrationModalOpen] = useState("");

  const createNewList = (title: string) => {
    updateTasks(title);
    setActiveTitle(title);
  };

  const handleDeleteTaskList = (title: string) => {
    deleteTasks(title);
    setActiveTitle("");
  };

  return {
    state: {
      titleList,
      setTitleList,
      createListModalOpen,
      setCreateListModalOpen,
      confimrationModalOpen,
      setConfimrationModalOpen,
      setActiveTitle,
      tasks,
    },
    actions: {
      createNewList,
      handleDeleteTaskList,
    },
  };
};

export default useSidebar;
