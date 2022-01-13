import React, { useEffect } from 'react';
import './App.scss';
import AuthContext from './API/auth-context';
import Login from './UI/login/login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './UI/home/home';
import MatchList from './UI/match-list/MatchList';
import Chat from './UI/chat/chat';
import HeaderLayout from './UI/header/HeaderLayout';
import LeaderBoard from './UI/leader-board/LeaderBoard';
import MyMatches from './UI/my-matches/MyMatches';
import UserProfile from './UI/user-profile/UserProfile';
import SignUp from './UI/registration/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchData } from './API/matches/matches-actions';
import BettingPage from './UI/betting-page/betting-page';
import Matches from './UI/Admin/matches/matches';
import Error from './UI/error/error';
import Users from './UI/Admin/users/users';
import Winner from './UI/Admin/winning-team/update-winner';
import Teams from './UI/Admin/teams/teams';
import { fetchTeamData } from './API/team/team-actions';
import { fetchTournamentData } from './API/tournament/tournament-actions';
import { fetchVenueData } from './API/venue/venue-actions';

function App() {

  const authCtx = React.useContext(AuthContext);
  const role = authCtx.userData?.role;

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && (
        <HeaderLayout>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />

            <Route path='/home' element={<Home />} />

            <Route path='/match-list' element={<MatchList />} />

            <Route path='/match-list/:matchId' element={<BettingPage />} />

            <Route path='/chat' element={<Chat />} />

            <Route path='/leader-board' element={<LeaderBoard />} />

            <Route path='/my-matches' element={<MyMatches />} />

            <Route path='/profile' element={<UserProfile />} />

            <Route path='/manage-matches' element={role === 'Admin' ? <Matches /> : <Error />} />
            <Route path='/manage-users' element={role === 'Admin' ? <Users /> : <Error />} />
            <Route path='/manage-winner' element={role === 'Admin' ? <Winner /> : <Error />} />
            <Route path='/manage-teams' element={role === 'Admin' ? <Teams /> : <Error />} />
          </Routes>
        </HeaderLayout>
      )}

      {!authCtx.isLoggedIn && (
        <Routes>
          <Route path="/" element={<Navigate to='/login' />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registration" element={<SignUp />} />
        </Routes>

      )}
    </React.Fragment>
  );
}

export default App;
