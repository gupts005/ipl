import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceTeam(state, action) {
      state.items = action.payload.items;
    },
    addTeam(state, action) {
      const newItem = action.payload;
      console.log(newItem, " newItem");
      const existingItem = state.items.find(
        (item) => item.teamId === newItem.teamId
      );
      console.log(existingItem, " existing item");
      // state.changed = true;
      if (!existingItem) {
        state.changed = true;
        state.items.push({
          name: newItem.name,
          shortName: newItem.shortName,
          teamLogo: newItem.teamLogo
        });
      }
    },
    updateTeam(state, action) {
      const newItem = action.payload;
      console.log(newItem, " updateItem");
      const existingItem = state.items.find(
        (item) => item.teamId === newItem.teamId
      );
      console.log(existingItem, " existing item");
      if (existingItem) {
        state.changed = true;
        let a = state.items.map((item) =>
          item.teamId === newItem.teamId
            ? {
                ...item,
                name: newItem.name,
                shortName: newItem.shortName,
                teamLogo: newItem.teamLogo
              }
            : item
        );
        state.items = a;
      }
    },
    deleteUser(state, action) {
      const id = action.payload;
      console.log(id);
      const existingItem = state.items.find((item) => item.teamId === id);
      console.log(existingItem, " deleting existing team");
      if (existingItem) {
        state.changed = true;
        state.items = state.items.filter((item) => item.teamId !== id);
      }
    }
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
