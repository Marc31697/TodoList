import React from "react";
import { Todo } from "@/components";

type TodoList = {
  title: string;
  todos: string[];
};

interface ListProps {
  todoList: string[];
}

const List = ({ todoList }: ListProps) => {
  return (
    <div className="flex flex-col">
      {todoList.map((todo) => (
        <Todo key={todo} todo={todo} />
      ))}
    </div>
  );
};

export default List;
