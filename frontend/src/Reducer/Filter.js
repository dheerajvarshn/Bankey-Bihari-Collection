const initstate = {
    filterResult:[],
    loading: false,
    error: null,
  };
  
  const filterReducer = (state = initstate, action) => {
    console.log(action.payload)
    switch (action.type) {
      case "FILTER_PRODUCT_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case "FILTER_PRODUCT_SUCCESS":
        return {
          ...state,
          filterResult:action.payload,
          loading: false,
          error: null,
        };
  
      case "FILTER_PRODUCT_ERROR":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default: {
        return state;
      }
    }
  };
  
  export default filterReducer;