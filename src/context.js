import React, { createContext, useState, useEffect, useCallback } from 'react';

//url to fetch from
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

//initiale/create a context
const AppContext = createContext();

//create a context provider component
const AppProvider = ({ children }) => {
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('a'); //displays cocktails with name starting with 'a' when the component mounts
   const [cocktails, setCocktails] = useState([]);

   //function to fetch drinks from api
   const fetchDrinks = useCallback(async () => {
      setLoading(true);
      try {
         const response = await fetch(`${url}${searchTerm}`);
         console.log(`${url}${searchTerm}`);
         const data = await response.json();
         //console.log(data);

         const { drinks } = data;

         if (drinks) {
            //drinks matching search term returned
            //console.log(drinks);
            const newCocktails = drinks.map((drink) => {
               const {
                  idDrink,
                  strDrink,
                  strDrinkThumb,
                  strAlcoholic,
                  strGlass,
               } = drink;

               return {
                  id: idDrink,
                  name: strDrink,
                  img: strDrinkThumb,
                  info: strAlcoholic,
                  glass: strGlass,
               };
            });
            setCocktails(newCocktails);
         } else {
            //no drinks matching the search term
            setCocktails([]);
         }
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }, [searchTerm]);

   //always fetch drinks from api when the search term changes
   useEffect(() => {
      fetchDrinks();
   }, [searchTerm, fetchDrinks]);

   return (
      <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
         {children}
      </AppContext.Provider>
   );
};

export { AppContext, AppProvider };

/*
We are supposed to add fetchDrinks as part of the dependency in the useEffect above, but if we do, we will have an infinite loop because of the way the code of the fetchDrinks function is set up. 

A way to solve this problem is by using useCallback hook which in this case will make the fetchDrinks() to be created again from the scratch only if searchTerm changes; if searchTerm does not change, the fetchDrinks() is not created from scratch in which case, we can add it as part of the dependency list in useEffect


*/
