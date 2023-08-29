"use client";

import { CreateListModal, useTaskContext } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { tasks, updateTasks, setActiveTitle } = useTaskContext();
  const [titleList, setTitleList] = useState(Object.keys(tasks));
  const [modalOpen, setModalOpen] = useState(false);

  const createNewList = (title: string) => {
    updateTasks(title);
  };

  useEffect(() => {
    setTitleList(Object.keys(tasks));
  }, [tasks]);

  return (
    <div>
      <nav className="bg-gray-900 h-screen w-48 flex flex-col pt-10 px-4">
        <div className="border-b-2">To Do Lists</div>
        <ul className="">
          {titleList &&
            titleList.map((title) => (
              <button
                key={title}
                className="w-full"
                onClick={() => setActiveTitle(title)}
              >
                <li className="px-4 py-2 text-white hover:bg-blue-900">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </li>
              </button>
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
