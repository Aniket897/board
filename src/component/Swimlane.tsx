import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Block from "./Block";
import { Lane, Task } from "../types";
import { updateTask } from "../store/slices/taskSlice";
import { format } from "date-fns";
import { useState } from "react";
import Loader from "./Loader";

const Swimlane = ({ id, name, label }: Lane) => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) =>
    state.task.filter((task) => task.laneId == id)
  );

  const [, ref] = useDrop({
    accept: "BLOCK",
    drop: (item: Task) => {
      if (name == "Todo") return;
      if (item.laneId == "lane1" && id == "lane3") return;
      if (item.laneId == "lane3" && id == "lane2") return;
      setLoading(true);
      dispatch(
        updateTask(item.id, id, [
          ...item.history,
          `Mark as ${name} at ${format(Date.now(), "dd MMM  HH:mm")}`,
        ])
      ).finally(() => {
        setLoading(false);
      });
    },
  });

  return (
    <div ref={ref} className="p-4 rounded bg-gray-100 min-h-[800px]">
      <div className="border-b pb-2 border-b-gray-300">
        <h2
          className={`p-1 text-xs w-fit rounded-2xl px-4 ${
            name == "Todo"
              ? "text-red-900 bg-red-300"
              : name == "Progress"
              ? "text-yellow-900 bg-yellow-300"
              : "text-green-900 bg-green-300"
          }`}
        >
          {label}
        </h2>
      </div>
      <div className="mt-4">
        {tasks.map((task) => (
          <Block key={task.id} {...task} />
        ))}
      </div>
      <div>
        {loading && (
          <div className="p-2 bg-white rounded cursor-grab border border-blue-500 border-l-4 mt-3 flex items-center gap-2 justify-center text-xs h-[50px]">
            <Loader />
            <p>Processing..</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swimlane;
