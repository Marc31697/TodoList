"use client";

import {
  CreateListModal,
  useTaskContext,
  ConfirmationModal,
} from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";

const Sidebar = () => {
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

  useEffect(() => {
    setTitleList(Object.keys(tasks));
  }, [tasks]);

  return (
    <div>
      <nav className="bg-sky-500 bg-opacity-20 h-screen w-48 flex flex-col pt-10 px-4">
        <div className="border-b-2 text-2xl text-center">Lists</div>
        <ul className="text-xl">
          {titleList &&
            titleList.map((title) => (
              <li
                key={title}
                className="py-2 text-white truncate flex flex-row items-center justify-between hover:bg-blue-900 px-2"
              >
                <button className="w-3/4" onClick={() => setActiveTitle(title)}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </button>
                <button
                  className="text-[10px] h-full px-1"
                  onClick={() => setConfimrationModalOpen(title)}
                >
                  <Image
                    alt="trash icon"
                    src="/trash.svg"
                    width={14}
                    height={14}
                    className="invert hover:invert-0"
                  />
                </button>
                <ConfirmationModal
                  isOpen={confimrationModalOpen === title}
                  handleClose={() => setConfimrationModalOpen("")}
                  handleDeleteList={() => handleDeleteTaskList(title)}
                  title={title}
                />
              </li>
            ))}
          <li className="px-4 py-2 text-white hover:bg-blue-900">
            <button
              onClick={() => setCreateListModalOpen(true)}
              className="w-full"
            >
              Create New List
            </button>
          </li>
        </ul>
      </nav>
      <CreateListModal
        isOpen={createListModalOpen}
        handleClose={() => setCreateListModalOpen(false)}
        createNewList={createNewList}
      />
    </div>
  );
};

export default Sidebar;
