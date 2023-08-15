"use client";
import { Listbox } from "@headlessui/react";
import Image from "next/image";

interface ListChooserProps {
  titleList: string[];
  activeTitle?: string;
  setActiveTitle: (title: string) => void;
}

const ListChooser = ({
  titleList,
  activeTitle,
  setActiveTitle,
}: ListChooserProps) => {
  return (
    <div className="relative mb-2">
      <Listbox value={activeTitle} onChange={setActiveTitle}>
        <Listbox.Button className="text-3xl px-4 py-1 flex justify-center w-full bg-[#060712] rounded-lg bg-opacity-30">
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
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListChooser;
