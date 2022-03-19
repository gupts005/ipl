import { createSlice } from "@reduxjs/toolkit";

const userWLP = createSlice({
  name: "usersWLP",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUserWLP(state, action) {
      state.changed = action.payload.changed;
      state.items = action.payload.items;
    },
    updateUserWLP(state, action) {
      const newItem = action.payload;
      state.changed = true;
      state.items = newItem;
    },
  },
});

export const userWLPActions = userWLP.actions;

export default userWLP;
