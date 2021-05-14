import React, { useContext } from 'react';
import { AppContext } from '../context';
import Loading from './Loading';

const CocktailList = () => {
   const { cocktails, loading } = useContext(AppContext);

   if (loading) {
      return <Loading />;
   }

   if (cocktails.length < 1) {
      return (
         <h2 className='section-title'>
            no cocktails matched your search criteria
         </h2>
      );
   }

   return (
      <div>
         <h2>cocktail list component</h2>
      </div>
   );
};

export default CocktailList;
