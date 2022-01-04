import React, { useState, useEffect, useCallback } from 'react';

// let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedState = localStorage.getItem('loginState');
  return storedState;  
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState({...initialToken});

  const userIsLoggedIn = !!token.username;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('loginState');
  }, []);

  const loginHandler = (token) => {
    setToken({token});
    localStorage.setItem('token', token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
