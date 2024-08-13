import { RefObject, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Task } from "../types";
import { format } from "date-fns";

const Block = ({ id, name, history, timestamps, laneId }: Task) => {
  const [showHistory, setShowHistory] = useState(false);
  const historyRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [, ref] = useDrag({
    type: "BLOCK",
    item: { id, laneId, history },
  });

  return (
    <>
      <div
        onClick={() => setShowHistory(true)}
        ref={ref}
        className="p-2 bg-white rounded cursor-grab border border-blue-500 border-l-4 mt-3"
      >
        {name}
        <div className="mt-2">
          <p className="text-xs border w-fit text-[10px] p-1 border-blue-500">
            📆{format(timestamps.created!, "dd MMM")}
          </p>
        </div>
      </div>
      {showHistory && (
        <div className="absolute top-0 left-0 bg-[#0000005e] flex items-center justify-center h-screen w-[100vw] m-0">
          <div
            ref={historyRef}
            className="bg-white w-[400px] max-w-[90vw] rounded-md p-4 space-y-4"
          >
            <h1 className="font-bold">Task History</h1>
            <div className="space-y-3">
              {history.map((item, index) => {
                return (
                  <div className="flex items-center gap-3" key={index}>
                    <div className="w-[5px] h-[5px] rounded-full bg-green-500"></div>
                    <p className="text-xs">{item}</p>
                  </div>
                );
              })}
            </div>
            <button
              className="bg-red-500 p-2 px-4 rounded-md text-white hover:bg-red-600 duration-200"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Block;
