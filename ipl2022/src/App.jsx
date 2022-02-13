import React, { useContext } from 'react';
import './App.scss';
import Router from './UI/router/router';
import { useSelector } from 'react-redux';
import Notification from './UI/notification/notification'

function App() {
  
  const notification = useSelector((state) => state.notification.notification);

  return (
    <React.Fragment>
      <Router /> 
      {notification &&
        <Notification />
      }     
    </React.Fragment>
  );
}

export default App;
