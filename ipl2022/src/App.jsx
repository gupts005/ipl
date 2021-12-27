import React from 'react';
import Home from './UI/home/home';
import './App.scss';
import { AuthContextProvider } from './UI/store/auth-context';
import HeaderLayout from './UI/header/HeaderLayout';
import { Routes, Route } from 'react-router-dom';
import MatchList from './UI/match-list/MatchList';
import Chat from './UI/chat/chat';

function App() {
  return (
    <HeaderLayout className='header'>
      <Routes>

        <Route exact path='/' element={<Home />} />
          
        <Route exact path='/match-list' element={<MatchList />} />
        
        <Route exact path='/chat' element={<Chat />} />

      </Routes>
    </HeaderLayout>
  );
}

export default App;
