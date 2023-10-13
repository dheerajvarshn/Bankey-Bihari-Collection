import axios from "axios";
 
export const searchProducts = (searchTerm) => {
  return((dispatch)=>{

    // action to set a loading state if needed
    dispatch({
      type : 'SEARCH_PRODUCT_REQUEST'
    });

      axios.get(
        `http://localhost:5000/search/product/?q=${searchTerm}`
      ).then((res)=>{
        const searchResults = res.data
        dispatch({
          type: 'SEARCH_PRODUCT_SUCCESS',
          payload: searchResults,
        })
      }).catch((error)=>{
        dispatch({
          type: 'SEARCH_PRODUCT_ERROR',
          error,
        });
      })

  
  })
}


// export const HandleSearch =(searchItem) => {
//   return((dispatch)=>{
//     // action to set a loading state if needed
//     dispatch({ type: 'SEARCH_PRODUCT_REQUEST' });

//     if(searchItem ==="nosearch" ){
//       dispatch({ type: 'NO_PRODUCT_SEARCH' });
//     }else{
//       axios.get(
//         `http://localhost:5000/search/product/?q=${searchItem}`
//       ).then((res)=>{
//         const searchResults = res.data
//         dispatch({
//           type: 'SEARCH_PRODUCT_SUCCESS',
//           payload: searchResults,
//         })
//       }).catch((error)=>{
//         dispatch({
//           type: 'SEARCH_PRODUCT_ERROR',
//           error,
//         });
//       })
  
//     }
    

//   } )
// };
