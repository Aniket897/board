import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Task } from "../../types";
import axios from "../../utils/axios";
import { format } from "date-fns";

const initialState: Task[] = [];

const slice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    setTasks: (_, action: PayloadAction<Task[]>) => {
      console.log(action.payload);
      return action.payload;
    },
    update: (state, action: PayloadAction<Task>) => {
      const task = state.find((item) => item.id == action.payload.id);

      if (task) {
        task.history = action.payload.history;
        task.laneId = action.payload.laneId;
      }
    },
  },
});

export default slice.reducer;
export const { addTask, setTasks, update } = slice.actions;

export function getAllTasks() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("/tasks");
      console.log(response.data);
      dispatch(setTasks(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function createTask(name: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/tasks", {
        name,
        laneId: "lane1",
        id: v4(),
        timestamps: {
          created: Date.now(),
          progress: null,
          done: null,
        },
        history: [`created at ${format(Date.now(), "dd MMM  HH:mm")}`],
      });

      dispatch(addTask(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTask(id: string, laneId: string, history: string[]) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(`/tasks/${id}`, {
        laneId,
        history,
      });

      dispatch(update(response.data));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}
