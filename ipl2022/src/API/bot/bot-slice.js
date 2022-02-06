import { createSlice } from "@reduxjs/toolkit";

const botSlice = createSlice({
  name: "bot",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceBot(state, action) {
      state.items = action.payload.items;
    },
    addBet(state, action) {
      const newItem = action.payload;
      // console.log(newItem, " newItem");
      const existingItem = state.items.find(
        (item) => item.contestId === newItem.contestId
      );
      // console.log(existingItem, " existing item");
      // state.changed = true;
      if (!existingItem) {
        state.changed = true;
        state.items.push({
          contestPoints: newItem.contestPoints,
          firstName: newItem.firstName,
          lastName: newItem.lastName,
          profilePicture: newItem.profilePicture,
          teamShortName: newItem.teamShortName,
          username: newItem.username,
          winningPoints: 0
        });
      }
    },
    updateBet(state, action) {
      const newItem = action.payload;
      // console.log(newItem, " updateItem");
      const existingItem = state.items.find(
        (item) => item.contestId === newItem.contestId
      );
      // console.log(existingItem, " existing item");
      if (existingItem) {
        state.changed = true;
        let a = state.items.map((item) =>
          item.contestId === newItem.contestId
            ? {
                ...item,
                contestId: newItem.contestId,
                teamShortName:newItem.teamShortName,
                firstName:newItem.firstName,
                lastName:newItem.lastName,
                username:newItem.username,
                profilePicture:newItem.profilePicture,         
                contestPoints:newItem.contestPoints,
                winningPoints: 0
              }
            : item
        );
        state.items = a;
      }
    },
  },
});

export const botActions = botSlice.actions;

export default botSlice;
