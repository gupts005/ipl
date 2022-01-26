import { createSlice } from "@reduxjs/toolkit";

const allUsersFutureBetsSlice = createSlice({
  name: "allUsersFutureBets",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceallUsersFutureBets(state, action) {
      state.items = action.payload.items;
      state.changed = action.payload.changed;
    }
  },
});

export const allUsersFutureBetsActions = allUsersFutureBetsSlice.actions;

export default allUsersFutureBetsSlice;
