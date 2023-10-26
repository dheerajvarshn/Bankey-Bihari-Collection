import axios from "axios";

export const filterProduct = (filter) => {
  const { category, brand, price={min:100,max:1000} } = filter;
  const query = {};

  if(Object.keys(category).length !==0 || brand.length !== 0 || (price.min !== "" || price.max !== "" )){
    query.category=category
    query.brands = brand;
    query.price = { min: price.min, max: price.max }
  }
  console.log(query)

  return (dispatch) => {
    // action to set a loading state if needed
    dispatch({
      type: "FILTER_PRODUCT_REQUEST",
    });

    if(Object.keys(query).length !== 0){
      axios
      .get("https://mern-zvtq.onrender.com/filter/product", { params: query })
      .then((res) => {
        console.log(res.data)
        const result = res.data
        dispatch({
          type: "FILTER_PRODUCT_SUCCESS",
          payload: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FILTER_PRODUCT_ERROR",
          'Error':error
        });
      });
    }

  };
};
