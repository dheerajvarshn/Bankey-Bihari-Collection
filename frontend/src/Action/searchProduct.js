import axios from "axios";
 
export const searchProducts = (searchTerm) => {
  console.log (searchTerm)
  return((dispatch)=>{

    // action to set a loading state if needed
    dispatch({
      type : 'SEARCH_PRODUCT_REQUEST'
    });

      axios.get(
        `https://mern-zvtq.onrender.com/search/product/?q=${searchTerm}`
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
