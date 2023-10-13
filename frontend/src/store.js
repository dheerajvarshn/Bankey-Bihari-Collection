import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./Reducer/Reducer";
import thunk from "redux-thunk";
import { searchProducts } from "./Action/searchProduct";


const store=configureStore({
    reducer:rootReducer
},applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch(searchProducts)

export default store;