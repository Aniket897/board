import Swimlane from "./component/Swimlane";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllLanes } from "./store/slices/laneSlice";
import { AppDispatch, RootState } from "./store/store";
import { getAllTasks } from "./store/slices/taskSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const lanes = useSelector((state: RootState) => state.lane);
  console.log(lanes);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllLanes()).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-3 min-h-screen">
      <Header />
      <div className="md:w-[80vw] mx-auto grid grid-cols-3 gap-4 p-4">
        {lanes.map((lane) => {
          return (
            <Swimlane
              key={lane.id}
              id={lane.id}
              label={lane.label}
              name={lane.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
