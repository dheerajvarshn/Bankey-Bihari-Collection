import { combineReducers } from "redux";
import authReducer from "./Auth";
import cartReducer from "./Cart";
import productReducer from "./product";
import changeNumber from "./UpDown";

const rootReducer = combineReducers({
  changeNumber: changeNumber,
  cartReducer: cartReducer,
  authReducer:authReducer,
  productReducer:productReducer
});

export default rootReducer;
