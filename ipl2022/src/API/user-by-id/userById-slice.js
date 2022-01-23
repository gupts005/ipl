import { createSlice } from "@reduxjs/toolkit";

const userByIdSlice = createSlice({
  name: "userById",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUserById(state, action) {
      state.items = action.payload.items;
    }
  },
});

export const userByIdActions = userByIdSlice.actions;

export default userByIdSlice;
