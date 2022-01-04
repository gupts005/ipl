import React, { useState, useEffect, useCallback } from "react";

// let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (data) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedState = localStorage.getItem("loginState");
  return JSON.parse(storedState);
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.username;
    console.log(initialToken,' lllllllllllllllllll');
  }

  const [state, setState] = useState({
    userId: null,
    username: null,
    status: null,
    role: null,
    token: null
  });

  const [LoggedIn, setLoggedIn] = useState(initialToken);

  const userIsLoggedIn = !!LoggedIn;

  const logoutHandler = useCallback(() => {
    setState(null);
    setLoggedIn(null);
    localStorage.removeItem("loginState");
  }, []);

  const loginHandler = (data) => {
    setLoggedIn(data);
    setState({
      userId: data.userId,
      username: data.username,
      status: data.status,
      role: data.role,
      token: data.token
    });
    localStorage.setItem("loginState", JSON.stringify(data));
  };

  const contextValue = {
    userData: state,
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
