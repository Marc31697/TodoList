"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteList: () => void;
  title: string;
}

const ConfirmationModal = ({
  isOpen,
  handleClose,
  handleDeleteList,
  title,
}: ConfirmationModalProps) => (
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
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black opacity-70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="border-[1px] border-gray-900 rounded-md p-8 bg-black shadow-lg">
            <Dialog.Title className="flex justify-center">
              <h1 className="text-3xl">Are you sure?</h1>
            </Dialog.Title>
            <Dialog.Description className="flex justify-center">
              Do you really want to delete your
              <div className="px-1 text-red-700 underline">{title}</div>
              list?
            </Dialog.Description>
            <div className="flex flex-row justify-around mt-5">
              <button
                className="flex rounded-md py-2 px-4 bg-red-700 text-black font-semibold hover:bg-red-500"
                onClick={handleDeleteList}
              >
                Delete
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

export default ConfirmationModal;
