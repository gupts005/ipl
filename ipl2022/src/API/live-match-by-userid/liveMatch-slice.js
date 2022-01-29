import { createSlice } from "@reduxjs/toolkit";

const liveMatch = createSlice({
  name: "liveMatch",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceliveMatch(state, action) {
      state.items = action.payload.items;
    }
  },
});

export const liveMatchActions = liveMatch.actions;

export default liveMatch;
