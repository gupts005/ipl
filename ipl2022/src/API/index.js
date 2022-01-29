import { configureStore } from "@reduxjs/toolkit";
import botSlice from './bot/bot-slice';
import matchSlice from "./matches/matches-slice";
import oldMatchSlice from './old-matches/oldMatches-slice';
import teamSlice from "./team/team-slice";
import tournamentSlice from "./tournament/tournament-slice";
import upcomingMatchSlice from './upcoming-matches/upcomingMatches-slice';
import userSlice from './users/user-slice';
import venueSlice from "./venue/venue-slice";
import userByIdSlice from "./user-by-id/userById-slice";
import allUserStatsSlice from './all-users-stats/allUserStats-slice';
import allUsersFutureBetsSlice from './all-users-future-bets/allUsersFutureBets-slice';
import upcomingMatchesByUserId from './upcoming-matches-by-userid/upcomingMatchesByUserId-slice';
import allMatchResult from './all-matches-result/allMatchResult-slice';
import liveMatch from './live-match-by-userid/liveMatch-slice';

const store = configureStore({
  reducer: {
    matches: matchSlice.reducer,
    tournament: tournamentSlice.reducer,
    venue: venueSlice.reducer,
    team: teamSlice.reducer,
    users: userSlice.reducer,
    oldMatches: oldMatchSlice.reducer,
    upcomingMatches: upcomingMatchSlice.reducer,
    bot: botSlice.reducer,
    userById: userByIdSlice.reducer,
    allUserStats: allUserStatsSlice.reducer,
    allUsersFutureBets: allUsersFutureBetsSlice.reducer,
    upcomingMatchesByUserId: upcomingMatchesByUserId.reducer,
    allMatchResult: allMatchResult.reducer,
    liveMatch: liveMatch.reducer,
  },
});

export default store;
