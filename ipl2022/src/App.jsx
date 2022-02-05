import React, { useContext } from 'react';
import AuthContext from './API/auth-context';
import './App.scss';
import FetchingApi from './UI/common/components/FetchingApi';
import Router from './UI/router/router';

function App() {
  
  return (
    <React.Fragment>
      <Router />      
    </React.Fragment>
  );
}

export default App;
