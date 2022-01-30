import { createSlice } from "@reduxjs/toolkit";

const userByIdSlice = createSlice({
  name: "userById",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUserById(state, action) {
      state.changed = action.payload.changed;
      state.items = action.payload.items;
    },
    updateUser(state, action) {
      const newItem = action.payload;
      state.changed = true;
      state.items = newItem;
    },
  },
});

export const userByIdActions = userByIdSlice.actions;

export default userByIdSlice;
