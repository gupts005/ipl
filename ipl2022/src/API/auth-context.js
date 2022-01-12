import React, { useState, useCallback } from "react";

// let logoutTimer;

const AuthContext = React.createContext({
  userData: '',
  isLoggedIn: false,
  login: (data) => {},
  logout: () => {},
  screenSize: null
});

const retrieveStoredToken = () => {
  const storedState = localStorage.getItem("loginState");
  return JSON.parse(storedState);
};

export const AuthContextProvider = (props) => {
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  }

  React.useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize]);

  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.username;
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
    screenSize: screenSize
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
