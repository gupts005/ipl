import React from 'react';
import './App.scss';
import AuthContext from './UI/store/auth-context';
import Login from './UI/login/login';
import { Routes, Route } from 'react-router-dom';
import Home from './UI/home/home';
import MatchList from './UI/match-list/MatchList';
import Chat from './UI/chat/chat';
import HeaderLayout from './UI/header/HeaderLayout';

function App() {

  const authCtx = React.useContext(AuthContext);
  console.log(authCtx);

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && (
        <HeaderLayout>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/match-list' element={<MatchList />} />

            <Route path='/chat' element={<Chat />} />
          </Routes>
        </HeaderLayout>
      )}

      {!authCtx.isLoggedIn && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>

      )}
    </React.Fragment>
  );
}

export default App;
