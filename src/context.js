import React, { createContext, useState, useEffect } from 'react';

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
   const fetchDrinks = async () => {
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
   };

   //always fetch drinks from api when the search term changes
   useEffect(() => {
      fetchDrinks();
   }, [searchTerm]);

   return (
      <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
         {children}
      </AppContext.Provider>
   );
};

export { AppContext, AppProvider };
