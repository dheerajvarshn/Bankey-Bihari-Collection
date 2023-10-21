import { combineReducers } from "redux";
import authReducer from "./Auth";
import cartReducer from "./Cart";
import productReducer from "./product";
import changeNumber from "./UpDown";
import searchReducer from "./SearchProduct";
import suggestionBoxReducer from "./SuggestionBox";
import filterReducer from "./Filter";

const rootReducer = combineReducers({
  changeNumber,
  cartReducer,
  authReducer,
  productReducer,
  searchReducer,
  suggestionBoxReducer,
  filterReducer

});

export default rootReducer;
