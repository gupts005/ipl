import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "matches",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceMatches(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addMatches(state, action) {
      const newItem = action.payload;
      console.log(newItem, " newItem");
      const existingItem = state.items.find(
        (item) => item.matchId === newItem.matchId
      );
      console.log(existingItem, " existing item");
      // state.changed = true;
      if (!existingItem) {
        state.changed = true;
        state.items.push({
          matchId: newItem.matchId,
          minimumPoints: newItem.minimumPoints,
          name: newItem.name,
          startDatetime: newItem.startDatetime,
          team1: newItem.team1,
          team2: newItem.team2,
          tournamentId: newItem.tournamentId,
          venueId: newItem.venueId,
        });
      }
    },
    updateMatch(state, action) {
      const newItem = action.payload;
      console.log(newItem, " updateItem");
      const existingItem = state.items.find(
        (item) => item.matchId === newItem.matchId
      );
      console.log(existingItem, " existing item");
      // state.changed = true;
      if (existingItem) {
        state.changed = true;
        let a = state.items.map((item) =>
          item.matchId == newItem.matchId
            ? {
                ...item,
                minimumPoints: newItem.minimumPoints,
                name: newItem.name,
                startDatetime: newItem.startDatetime,
                team1: newItem.team1,
                team2: newItem.team2,
                tournamentId: newItem.tournamentId,
                venueId: newItem.venueId,
              }
            : item
        );
        state.items = a;
      }
    },
    deleteMatch(state, action) {
      const id = action.payload;
      console.log(id);
      const existingItem = state.items.find((item) => item.matchId === id);
      console.log(existingItem,' deleting existing item');
      if (existingItem) {
        state.changed = true;
        state.items = state.items.filter((item) => item.matchId !== id);
      }
    },
  },
});

export const matchActions = matchSlice.actions;

export default matchSlice;
