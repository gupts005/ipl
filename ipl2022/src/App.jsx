import React from 'react';
import './App.scss';
import AuthContext from './UI/store/auth-context';
import Login from './UI/login/login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './UI/home/home';
import MatchList from './UI/match-list/MatchList';
import Chat from './UI/chat/chat';
import HeaderLayout from './UI/header/HeaderLayout';
import LeaderBoard from './UI/leader-board/LeaderBoard';
import MyMatches from './UI/my-matches/MyMatches';

function App() {

  const authCtx = React.useContext(AuthContext);

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && (
        <HeaderLayout>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />

            <Route path='/home' element={<Home />} />
            
            <Route path='/match-list' element={<MatchList />} />

            <Route path='/chat' element={<Chat />} />
            
            <Route path='/leader-board' element={<LeaderBoard />} />
            
            <Route path='/my-matches' element={<MyMatches />} />
            
            <Route path='/profile' element={<MyMatches />} />
          </Routes>
        </HeaderLayout>
      )}

      {!authCtx.isLoggedIn && (
        <Routes>
          <Route path="/" element={<Navigate to='/login' />} />
          
          <Route path="/login" element={<Login />} />
        </Routes>

      )}
    </React.Fragment>
  );
}

export default App;
