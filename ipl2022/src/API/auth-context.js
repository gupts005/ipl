import React, { useState, useCallback } from "react";

// let logoutTimer;

const AuthContext = React.createContext({
  userData: "",
  isLoggedIn: false,
  login: (data) => {},
  logout: () => {},
  screenSize: null,
});

export const AuthContextProvider = (props) => {

  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const tokenData = JSON.parse(localStorage.getItem("loginState"));

  let initialToken;
  if (tokenData) {
    initialToken = tokenData;
  }

  const [LoggedIn, setLoggedIn] = useState(initialToken);

  const userIsLoggedIn = !!LoggedIn;

  const logoutHandler = useCallback(() => {
    setLoggedIn(null);
    localStorage.removeItem("loginState");
  }, []);

  const loginHandler = (data) => {
    setLoggedIn(data);
    localStorage.setItem("loginState", JSON.stringify(data));
  };

  const HeaderToken = {
    headers: { Authorization: `Bearer ${tokenData?.token}` }
  };

  const contextValue = {
    userData: LoggedIn,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    screenSize: screenSize,
    Header: HeaderToken
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
