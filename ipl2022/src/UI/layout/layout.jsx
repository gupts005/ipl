import React from 'react'
import Chat from '../chat/chat';
import HeaderLayout from '../header/HeaderLayout';
import Home from '../home/home';
import MatchList from '../match-list/MatchList';
import { Routes, Route } from 'react-router-dom';

const Layout = (props) => {
  return (
    <React.Fragment>
      <HeaderLayout className='header'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/match-list' element={<MatchList />} />

          <Route path='/chat' element={<Chat />} />
        </Routes>
      </HeaderLayout>
    </React.Fragment>
  )
}

export default Layout;
