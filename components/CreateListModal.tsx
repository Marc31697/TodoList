"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CreateListModalProps {
  isOpen: boolean;
  handleClose: () => void;
  createNewList: (title: string) => void;
}

const CreateListModal = ({
  isOpen,
  handleClose,
  createNewList,
}: CreateListModalProps) => {
  const [listTitle, setListTitle] = useState("");

  const handleListCreation = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (
      (event.type === "keyup" && "key" in event && event.key === "Enter") ||
      event.type === "click"
    ) {
      handleClose();
      createNewList(listTitle);
      setListTitle("");
    }
  };

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-in duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-out duration-400"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog onClose={handleClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opaicty-0"
        >
          <div
            className="fixed inset-0 bg-black opacity-70"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="border-[1px] border-gray-900 rounded-md p-8 bg-black shadow-lg">
              <Dialog.Title>
                <h1 className="text-4xl">Create Todo List</h1>
              </Dialog.Title>
              <div className="border-[1px] border-gray-900 px-2 mt-3 rounded-md">
                <input
                  id="New List Input"
                  type="text"
                  className="bg-inherit border-0 w-full px-0 focus:ring-0 h-full"
                  placeholder="Enter the name of your list here!"
                  value={listTitle}
                  onKeyUp={(event) => handleListCreation(event)}
                  onChange={(event) => setListTitle(event.target.value)}
                />
                <label htmlFor="New List Input" />
              </div>
              <div className="flex flex-row justify-around mt-5">
                <button
                  className="flex rounded-md py-2 px-4 bg-blue-700 text-black font-semibold hover:bg-blue-500"
                  onClick={(event) => handleListCreation(event)}
                >
                  Create
                </button>
                <button
                  className="flex rounded-md py-2 px-4 bg-blue-700 text-black font-semibold hover:bg-blue-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default CreateListModal;
