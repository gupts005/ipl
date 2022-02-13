import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from '../../API/auth-context';
import Matches from '../Admin/matches/matches';
import Teams from '../Admin/teams/teams';
import Users from '../Admin/users/users';
import Winner from '../Admin/winning-team/update-winner';
import BettingPage from '../betting-page/betting-page';
import Chat from '../chat/chat';
import FetchingApi from '../common/components/FetchingApi';
import Error from '../error/error';
import ForgotPassword from '../forgot-password/ForgotPassword';
import HeaderLayout from '../header/HeaderLayout';
import Home from '../home/home';
import LeaderBoard from '../leader-board/LeaderBoard';
import LiveMatch from '../live-match/LiveMatches';
import Login from '../login/login';
import MatchList from '../match-list/MatchList';
import MatchResult from '../match-result/MatchResult';
import MyMatches from '../my-matches/MyMatches';
import SignUp from '../registration/SignUp';
import UserProfile from '../user-profile/UserProfile';
import ViewOtherUser from '../view-other-user-profile/ViewOtherUser';

const Router = (props) => {
  
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem('loginState'));
  const role = userData?.role;

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
            
            <Route path='/other-user/:userId' element={<ViewOtherUser />} />
            
            <Route path='/live-match/:matchId' element={<LiveMatch />} />
            
            <Route path='/match-result/:matchId' element={<MatchResult />} />

            <Route path='/manage-matches' element={role === 'Admin' ? <Matches /> : <Error />} />
            <Route path='/manage-users' element={role === 'Admin' ? <Users /> : <Error />} />
            <Route path='/manage-winner' element={role === 'Admin' ? <Winner /> : <Error />} />
            <Route path='/manage-teams' element={role === 'Admin' ? <Teams /> : <Error />} />
          </Routes>
          <FetchingApi />
        </HeaderLayout>
      )}

      {!authCtx.isLoggedIn && (
        <Routes>
          <Route path="/" element={<Navigate to='/login' />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registration" element={<SignUp />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

      )}
    </React.Fragment>
  );
};

export default Router;