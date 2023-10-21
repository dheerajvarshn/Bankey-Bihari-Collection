const initstate = {
  searchResult: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initstate, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "SEARCH_PRODUCT_SUCCESS":
      return {
        ...state,
        searchResult: [action.payload],
        loading: false,
        error: null,
      };

    case "SEARCH_PRODUCT_ERROR":
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

export default searchReducer;
