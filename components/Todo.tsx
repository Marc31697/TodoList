import React from "react";

interface TodoProps {
  todo: string;
}
const Todo = ({ todo }: TodoProps) => {
  return (
    <div className="flex flex-row justify-between text-xl border-b-[1px] border-gray-900 mb-2">
      <div>{todo}</div>
      <input
        type="checkbox"
        className="border-none focus:ring-0 bg-gray-800 text-gray-800 rounded-sm h-6 w-6"
      />
    </div>
  );
};

export default Todo;
