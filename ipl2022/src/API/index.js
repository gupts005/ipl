import { configureStore } from "@reduxjs/toolkit";
import matchSlice from "./matches/matches-slice";
import teamSlice from "./team/team-slice";
import tournamentSlice from "./tournament/tournament-slice";
import venueSlice from "./venue/venue-slice";

const store = configureStore({
  reducer: {
    matches: matchSlice.reducer,
    tournament: tournamentSlice.reducer,
    venue: venueSlice.reducer,
    team: teamSlice.reducer,
  },
});

export default store;
