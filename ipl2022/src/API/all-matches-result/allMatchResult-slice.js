import { createSlice } from "@reduxjs/toolkit";

const allMatchResult = createSlice({
  name: "allMatchResult",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceallMatchResult(state, action) {
      state.items = action.payload.items;
    }
  },
});

export const allMatchResultActions = allMatchResult.actions;

export default allMatchResult;
