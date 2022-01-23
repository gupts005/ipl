import { createSlice } from "@reduxjs/toolkit";

const upcomingMatchSlice = createSlice({
  name: "upcomingMatches",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUpcomingMatches(state, action) {
      state.items = action.payload.items;
    }
  },
});

export const upcomingMatchActions = upcomingMatchSlice.actions;

export default upcomingMatchSlice;
