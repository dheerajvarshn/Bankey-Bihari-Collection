import React from "react";
import { Routes, Route} from "react-router-dom";
import Category from "../Category/Category";
import SubCategory from "../Category/SubCategory";
import AddProduct from "../components/AddProduct";
import AddToCart from "../components/AddToCart/AddToCart";
// import GoogleAuth from "../components/GoogleAuth";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
// import Protected from "../components/Protected";
import Signup from "../components/Signup";
import ProductDetail from "../components/ProductDetail";
import Payment from "../Contact/Payment";
import AddressForm from "../DeliveryInformation/AddressForm";
import DeliveryAddress from "../DeliveryInformation/DeliveryAddress";
import OrderSummary from "../components/OrderSummary";
import ChangePassword from "../components/forgetPassword/ChangePassword";
import SearchProductPage from "../components/SearchBox/searchProductPage"
import Error from "../components/Error";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/protected" element={<Protected />} /> */}
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/category/:category" element={<Category />} />
        <Route
          path="/product/category/:category/:subcategory"
          element={<SubCategory />}
        />
        <Route
          path="/product/category/subcategory/:_id"
          element={<ProductDetail />}
        />
        <Route
          path="/search_product_page/:searchitem"
          element={<SearchProductPage />}
        />
        <Route path="/add_to_cart" exact element={<AddToCart />} />
        <Route path="/delivary_address" exact element={<AddressForm />} />
        <Route path="/user/address/add" exact element={<DeliveryAddress />} />
        <Route path="/user/address/update/:id" exact  element={<DeliveryAddress />} />
        <Route path="/user/order_summary" exact  element={<OrderSummary />} />

        {/* Payment page */}
        <Route path="/user/payment_method" exact element={<Payment />}/>

        {/* change user password */}
        <Route path="/user/change_password/:id" exact index element={<ChangePassword />}/>

        <Route path = "*" element = {<Error />}/>

      </Routes>
    </div>
  );
};

export default Routers;
