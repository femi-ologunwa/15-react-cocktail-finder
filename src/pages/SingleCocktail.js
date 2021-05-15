import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
   //getting the id of a cocktail that was clicked from the list of cocktails
   const { id } = useParams();
   const [loading, setLoading] = useState(false);
   const [cocktail, setCocktail] = useState(null);

   //setup useEffect such that everytime the component renders, it fetches info about the specific cocktail from the api
   useEffect(() => {
      setLoading(true);
      async function getCocktail() {
         try {
            const response = await fetch(`${url}${id}`);
            console.log(`${url}${id}`);
            const data = await response.json();
            console.log(data);
            if (data.drinks) {
               const {
                  strDrink: name,
                  strDrinkThumb: image,
                  strAlcoholic: info,
                  strCategory: category,
                  strGlass: glass,
                  strInstructions: instructions,
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
               } = data.drinks[0];

               const ingredients = [
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
               ];

               const newCocktail = {
                  name,
                  image,
                  info,
                  category,
                  glass,
                  instructions,
                  ingredients,
               };

               setCocktail(newCocktail);
            } else {
               setCocktail(null);
            }
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      }
      getCocktail();
   }, [id]);

   return (
      <div>
         <h2>{id}</h2>
      </div>
   );
};

export default SingleCocktail;
