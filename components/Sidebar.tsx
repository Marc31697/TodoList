"use client";

import { CreateListModal, useTaskContext } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const { tasks, updateTasks, setActiveTitle, deleteTasks } = useTaskContext();
  const [titleList, setTitleList] = useState(Object.keys(tasks));
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="border-b-2 text-2xl text-center">To Do Lists</div>
        <ul className="text-xl">
          {titleList &&
            titleList.map((title) => (
              <div
                key={title}
                className="flex flex-row items-center hover:bg-blue-900 px-2"
              >
                <button
                  className="w-full"
                  onClick={() => setActiveTitle(title)}
                >
                  <li className="py-2 text-white">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </li>
                </button>
                <button
                  className="text-[10px] h-full px-1"
                  onClick={() => handleDeleteTaskList(title)}
                >
                  <Image
                    alt="trash icon"
                    src="/trash.svg"
                    width={14}
                    height={14}
                    className="invert hover:invert-0"
                  />
                </button>
              </div>
            ))}
          <button onClick={() => setModalOpen(true)} className="w-full">
            <li className="px-4 py-2 text-white hover:bg-blue-900">
              Create New List
            </li>
          </button>
        </ul>
      </nav>
      <CreateListModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        createNewList={createNewList}
      />
    </div>
  );
};

export default Sidebar;
