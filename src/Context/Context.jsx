import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const storeProvider = createContext();

const Context = (props) => {
  // useEffect(() => {
  //   const retrieveSignUpData = ;
  //   const retrieveLogInData = ;
    
  //   setUserSignUpData(retrieveSignUpData);
  //   setUserLogInData(retrieveLogInData);
  // }, []);

  const [userSignUpData, setUserSignUpData] = useState(JSON.parse(localStorage.getItem("signUp")));
  const [userLogInData, setUserLogInData] = useState(JSON.parse(localStorage.getItem("logIn")));

  const contextValue = {
    userSignUpData,
    setUserSignUpData,
    userLogInData,
    setUserLogInData,
  };

  return (
    <storeProvider.Provider value={contextValue}>
      {props.children}
    </storeProvider.Provider>
  );
};

export default Context;
