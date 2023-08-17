"use client";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import { CreateListModal } from "@/components";
import { useState } from "react";

interface ListChooserProps {
  titleList: string[];
  activeTitle?: string;
  setActiveTitle: (title: string) => void;
  createNewList: (title: string) => void;
}

const ListChooser = ({
  titleList,
  activeTitle,
  setActiveTitle,
  createNewList,
}: ListChooserProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log("titleList length", titleList.length);
  return (
    <div className="relative mb-2">
      {titleList.length ? (
        <Listbox value={activeTitle} onChange={setActiveTitle}>
          <Listbox.Button className="text-5xl px-4 py-1 flex justify-between w-full bg-[#060712] rounded-lg bg-opacity-30">
            <h1>{activeTitle ? activeTitle : "Choose a list"}</h1>
            <Image
              src="/chevron-up-down.svg"
              alt="up down arrow"
              width={20}
              height={20}
              className="ml-4"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute bg-black w-full rounded-lg">
            {titleList.map((title) => (
              <Listbox.Option
                key={title}
                value={title}
                className={({ active }) =>
                  `cursor-pointer py-2 pl-10 pr-4 relative z-10 rounded-lg ${
                    active ? "bg-blue-800" : ""
                  }`
                }
              >
                {title}
              </Listbox.Option>
            ))}
            <Listbox.Button
              key="Create New List"
              value="Create New List"
              className="cursor-pointer py-2 pl-10 pr-4 relative z-10 rounded-lg hover:bg-blue-800 w-full justify-start flex"
              onClick={() => setModalOpen(true)}
            >
              Create New List
            </Listbox.Button>
          </Listbox.Options>
        </Listbox>
      ) : (
        <div className="flex justify-center">
          <button onClick={() => setModalOpen(true)} className="text-4xl ">
            Click here to create a new todo list!
          </button>
        </div>
      )}
      <CreateListModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        createNewList={createNewList}
      />
    </div>
  );
};

export default ListChooser;
