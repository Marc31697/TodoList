"use client";

import { CreateListModal, ConfirmationModal } from "@/components";
import { useEffect } from "react";
import Image from "next/image";
import useSidebar from "./useSidebar";

const Sidebar = () => {
  const { state, actions } = useSidebar();

  useEffect(() => {
    state.setTitleList(Object.keys(state.tasks));
  }, [state, state.tasks]);

  return (
    <div>
      <nav className="bg-sky-500 bg-opacity-20 h-screen w-48 flex flex-col pt-10 px-4">
        <div className="border-b-2 text-2xl text-center">Lists</div>
        <ul className="text-xl">
          {state.titleList &&
            state.titleList.map((title) => (
              <li
                key={title}
                className="my-2 h-10 text-white truncate flex flex-row items-center justify-between hover:bg-blue-900 px-2"
              >
                <button
                  className="w-3/4 h-full"
                  onClick={() => state.setActiveTitle(title)}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </button>
                <button
                  className="text-[10px] h-full px-1"
                  onClick={() => state.setConfimrationModalOpen(title)}
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
                  isOpen={state.confimrationModalOpen === title}
                  handleClose={() => state.setConfimrationModalOpen("")}
                  handleDeleteList={() => actions.handleDeleteTaskList(title)}
                  title={title}
                />
              </li>
            ))}
          <li className="px-4 py-2 text-white hover:bg-blue-900">
            <button
              onClick={() => state.setCreateListModalOpen(true)}
              className="w-full"
            >
              Create New List
            </button>
          </li>
        </ul>
      </nav>
      <CreateListModal
        isOpen={state.createListModalOpen}
        handleClose={() => state.setCreateListModalOpen(false)}
        createNewList={actions.createNewList}
      />
    </div>
  );
};

export default Sidebar;
