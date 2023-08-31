import Image from "next/image";

interface TodoProps {
  todo: string;
  handleCompleteTask: () => void;
  completed: boolean;
  showDeleteTasks?: boolean;
  handleDeleteTask: () => void;
}
const Todo = ({
  todo,
  handleCompleteTask,
  completed,
  showDeleteTasks = false,
  handleDeleteTask,
}: TodoProps) => {
  return (
    <div className="flex flex-row items-center text-2xl mb-2 justify-between">
      <div className="flex flex-row items-center">
        {!completed && (
          <input
            type="checkbox"
            className="border-none focus:ring-0 bg-gray-800 text-gray-800 rounded-sm h-4 w-4"
            onChange={handleCompleteTask}
          />
        )}
        <div className="pl-2">{todo}</div>
      </div>
      {showDeleteTasks && (
        <button className="text-[10px] h-full px-1" onClick={handleDeleteTask}>
          <Image
            alt="trash icon"
            src="/trash.svg"
            width={14}
            height={14}
            className="invert"
          />
        </button>
      )}
    </div>
  );
};

export default Todo;
