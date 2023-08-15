import React from "react";

interface TodoProps {
  todo: string;
}
const Todo = ({ todo }: TodoProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div>{todo}</div>
      <input
        type="checkbox"
        className="border-none focus:ring-0 bg-gray-800 text-gray-800 rounded-sm"
      />
    </div>
  );
};

export default Todo;
