"use client";

import { useState } from "react";
import { List, ListChooser } from "@/components";

export default function Home() {
  const [activeTitle, setActiveTitle] = useState("");

  const tempTodos = {
    Personal: ["Laundry", "Feed Cats", "Play video games"],
    Work: ["Write Tests", "Grade Papers", "Clean classroom"],
  };

  const titleList = Object.keys(tempTodos);
  const activeTodoList = activeTitle
    ? tempTodos[activeTitle as keyof typeof tempTodos]
    : [];

  return (
    <main className="flex justify-center h-[75vh] items-center">
      <div className="flex flex-col relative w-72">
        <ListChooser
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
          titleList={titleList}
        />
        <List todoList={activeTodoList} />
      </div>
    </main>
  );
}
