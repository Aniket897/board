import { configureStore } from "@reduxjs/toolkit";
import laneSlice from "./slices/laneSlice";
import taskSlice from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    lane: laneSlice,
    task: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
