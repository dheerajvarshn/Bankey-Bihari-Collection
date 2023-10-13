/* eslint-disable no-fallthrough */
const initstate = {
  cart: []
};

const cartReducer = (state = initstate, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      )
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1
        return {
          ...state,
          cart: [...state.cart]
        };
      } else {
        action.payload.quantity=1
        return {
          ...state,
          cart:[...state.cart,action.payload]
        };
      }
    }

    case "DECREAMENT": {
        const itemIndex = state.cart.findIndex(
          (item) => item._id === action.payload
        )

        if (state.cart[itemIndex].quantity >=1) {
          state.cart[itemIndex].quantity -= 1
          return {
            ...state,
            cart: [...state.cart]
          };
        } else if (state.cart[itemIndex].quantity === 1) {
          const data = state.cart.filter((el) => el._id !== action.payload);
          return {
            ...state,
            cart: data
          }
        }
      }
      case "DELETE_PRODUCT": {
        const data = state.cart.filter((el) => el._id !== action.payload);
  
        return { ...state, cart: data };
      }

      case "CLEAR_CART":{
        return {
          ...state,cart:[]
        }
      }
      default:
        return state ;
  }
};

export default cartReducer;
