import { configureStore } from "@reduxjs/toolkit";
import matchSlice from "./matches/matches-slice";
import oldMatchSlice from './old-matches/oldMatches-slice';
import teamSlice from "./team/team-slice";
import tournamentSlice from "./tournament/tournament-slice";
import userSlice from './users/user-slice';
import venueSlice from "./venue/venue-slice";

const store = configureStore({
  reducer: {
    matches: matchSlice.reducer,
    tournament: tournamentSlice.reducer,
    venue: venueSlice.reducer,
    team: teamSlice.reducer,
    users: userSlice.reducer,
    oldMatches: oldMatchSlice.reducer
  },
});

export default store;
