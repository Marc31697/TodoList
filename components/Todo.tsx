import React from "react";

interface TodoProps {
  todo: string;
}
const Todo = ({ todo }: TodoProps) => {
  return (
    <div className="flex flex-row items-center text-md mb-2">
      <input
        type="checkbox"
        className="border-none focus:ring-0 bg-gray-800 text-gray-800 rounded-sm h-4 w-4"
      />
      <div className="pl-2">{todo}</div>
    </div>
  );
};

export default Todo;
