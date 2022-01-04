import React from 'react';
import './App.scss';
import AuthContext from './UI/store/auth-context';
import Login from './UI/login/login';
import Layout from './UI/layout/layout';

function App() {

  const authCtx = React.useContext(AuthContext);
  console.log(authCtx);

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && (
        <Layout />
      )}

      {!authCtx.isLoggedIn && (
        <Login />
      )}
    </React.Fragment>
  );
}

export default App;
