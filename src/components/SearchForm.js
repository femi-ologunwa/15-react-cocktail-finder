import React, { useContext } from 'react';
import { AppContext } from '../context';

const SearchForm = () => {
   const { setSearchTerm } = useContext(AppContext);

   return (
      <div>
         <h2>search form component</h2>
      </div>
   );
};

export default SearchForm;
