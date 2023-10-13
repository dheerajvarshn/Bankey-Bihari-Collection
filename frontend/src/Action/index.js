// AddProduct Action
export const Add = (product) => {
  return {
    type: "ADD_PRODUCT",
    payload: product
  };
};

// deleteProduct Action
export const Delete = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};

export const clearCart=()=>{
  return{
    type:"CLEAR_CART"
  }
}

// decreaseproduct by quantity

export const Decreament = (id) => {
  return { type: "DECREAMENT", payload: id };
};
