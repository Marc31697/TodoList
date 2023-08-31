import React from "react";

interface TodoProps {
  todo: string;
  handleCompleteTask: () => void;
  completed: boolean;
}
const Todo = ({ todo, handleCompleteTask, completed }: TodoProps) => {
  return (
    <div className="flex flex-row items-center text-2xl mb-2">
      {!completed && (
        <input
          type="checkbox"
          className="border-none focus:ring-0 bg-gray-800 text-gray-800 rounded-sm h-4 w-4"
          onChange={handleCompleteTask}
        />
      )}
      <div className="pl-2">{todo}</div>
    </div>
  );
};

export default Todo;
