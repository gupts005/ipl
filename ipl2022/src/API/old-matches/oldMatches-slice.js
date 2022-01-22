import { createSlice } from "@reduxjs/toolkit";

const oldMatchSlice = createSlice({
  name: "oldMatches",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceMatches(state, action) {
      state.items = action.payload.items;
    },
    updateMatchResult(state, action) {
      const matchId = action.payload;
      console.log(matchId);
      const existingItem = state.items.find((item) => item.matchId === matchId);
      console.log(existingItem, " updating match result");
      if (existingItem) {
        state.changed = true;
        state.items = state.items.filter((item) => item.matchId !== matchId);
      }
    },
  },
});

export const oldMatchActions = oldMatchSlice.actions;

export default oldMatchSlice;