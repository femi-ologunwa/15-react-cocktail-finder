import React, { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context';

const SearchForm = () => {
   const { setSearchTerm } = useContext(AppContext);
   const searchValue = useRef('');

   //function to set focus on search input when component mounts & rerenders
   useEffect(() => {
      searchValue.current.focus();
   }, []);

   //function to prevent page refresh when the user press <enter> to submit the form
   const handleSubmit = (e) => {
      e.preventDefault();
   };

   //function to fetch and renders cocktails that suits the search criteria
   const searchCocktail = () => {
      setSearchTerm(searchValue.current.value);
   };

   return (
      <section className='section search'>
         <form className='search-form' onSubmit={handleSubmit}>
            <div className='form-control'>
               <label htmlFor='name'>search for favourite cocktail</label>
               <input
                  type='text'
                  id='name'
                  ref={searchValue}
                  onChange={searchCocktail}
               />
            </div>
         </form>
      </section>
   );
};

export default SearchForm;

/*
we make use of useRef here such that anytime the user type something in the input field, we invoke setSearchTerm which changes the value of searchTerm which triggers the fetchDrinks() function in the useEffect in context file.

*/
