import React, { createContext } from 'react';

//initiale/create a context
const AppContext = createContext();

//create a context provider component
const AppProvider = ({ children }) => {
   return <AppContext.Provider value='hello'>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
