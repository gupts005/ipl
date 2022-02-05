import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "authentication",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceAuth(state, action) {
      state.items = action.payload.items;
      state.changed = action.payload.changed;
    },
    removeAuthData(state, action) {
      state.items = !state.items;
      state.changed = false;
    }
  },
});

export const authenticationActions = authentication.actions;

export default authentication;
