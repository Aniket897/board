import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Lane } from "../../types";
import axios from "../../utils/axios";

const initialState: Lane[] = [];

const slice = createSlice({
  name: "laneSlice",
  initialState,
  reducers: {
    setLanes: (
      _,
      action: PayloadAction<
        {
          id: string;
          label: string;
          name: string;
        }[]
      >
    ) => {
      console.log(action.payload);
      return action.payload;
    },
    addLane: (
      state,
      action: PayloadAction<{
        id: string;
        label: string;
        name: string;
      }>
    ) => {
      const newState = [...state, { ...action.payload }];
      state = newState;
    },
  },
});

export default slice.reducer;
export const { addLane, setLanes } = slice.actions;

export function GetAllLanes() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("/lanes");
      dispatch(setLanes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
