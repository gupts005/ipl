import { createSlice } from "@reduxjs/toolkit";

const upcomingMatchesByUserId = createSlice({
  name: "upcomingMatchesByUserId",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceupcomingMatchesByUserId(state, action) {
      state.items = action.payload.items;
    }
  },
});

export const upcomingMatchesByUserIdActions = upcomingMatchesByUserId.actions;

export default upcomingMatchesByUserId;
