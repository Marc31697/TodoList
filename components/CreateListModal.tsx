"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

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
  const [listTitle, setListTItle] = useState("");

  const handleListCreation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClose();
      createNewList(listTitle);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black opacity-70" aria-hidden="true" />
      <div className="fixed inset-5 mb-72 flex items-center justify-center">
        <Dialog.Panel className="border-2 rounded-md p-4 bg-black">
          <Dialog.Title>
            <h1 className="text-4xl">Create Todo List</h1>
          </Dialog.Title>
          <div className="border-b-[1px] border-gray-900">
            <input
              id="New List Input"
              type="text"
              className="bg-inherit border-0 w-full px-0 focus:ring-0 h-full"
              placeholder="Enter the name of your list here!"
              value={listTitle}
              onKeyUp={(event) => handleListCreation(event)}
              onChange={(event) => setListTItle(event.target.value)}
            />
            <label htmlFor="New List Input" />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateListModal;
