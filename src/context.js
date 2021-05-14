import React, { createContext, useState } from 'react';

//initiale/create a context
const AppContext = createContext();

//create a context provider component
const AppProvider = ({ children }) => {
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('a'); //displays cocktails with name starting with 'a' when the component mounts
   const [cocktails, setCocktails] = useState([]);

   return (
      <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
         {children}
      </AppContext.Provider>
   );
};

export { AppContext, AppProvider };
