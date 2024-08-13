import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../store/slices/taskSlice";
import { AppDispatch } from "../store/store";

interface AddTaskProps {
  onClose: () => void;
}

const AddTask = ({ onClose }: AddTaskProps) => {
  const [name, setName] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    if (!name) return;
    dispatch(createTask(name));
    onClose();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="absolute top-0 left-0 bg-[#0000005e] flex items-center justify-center min-h-screen w-[100vw]">
      <div
        ref={modalRef}
        className="bg-white w-[400px] max-w-[90vw] rounded-md shadow-md p-4 space-y-5"
      >
        <h1 className="font-bold text-2xl">Add Task</h1>
        <div className="space-y-3">
          <p className="text-xs">* Name/Title</p>
          <input
            ref={inputRef}
            type="text"
            placeholder="enter name here"
            className="border border-gray-500 rounded-md p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="bg-red-500 p-2 px-4 rounded-md text-white hover:bg-red-600 duration-200"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 p-2 px-4 rounded-md text-white hover:bg-blue-600 duration-200"
            onClick={handleCreate}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="md:w-[80vw] mx-auto p-4 flex items-center justify-between">
      <h2 className="font-bold text-2xl">Board</h2>
      <button
        onClick={() => setShowCreate(true)}
        className="bg-blue-600 p-2 text-white hover:bg-blue-700 duration-200 px-5"
      >
        Add Task
      </button>
      {showCreate && <AddTask onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default Header;
