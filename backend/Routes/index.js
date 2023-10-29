const express =require('express')

const allroutes=express();


const {authrouter} = require('./apis/Auth');
const categoryRoutes = require('./apis/Category');
const productRouter = require('./apis/Product');
const addtocart=require('./apis/Cart');
const { requireSignin } = require('../Common_middleware');
const addressRoute=require('./apis/Address');
const ContactRoute = require('./apis/Contact');
const paymentRoute = require('./apis/Payment');


const forgetPasswordRouter = require('./apis/ForgetPassword');
const searchRouter = require('./apis/Search');
const reviewRouter = require('./apis/Reviews');
const filterRouter = require('./apis/FilterProduct')
const ForgetPassword = require('./apis/ForgetPassword');
const orderRouter = require('./apis/Order');

// auth route
allroutes.use('/auth',authrouter)

// searchbox route
allroutes.use('/search',searchRouter)

// filter product
allroutes.use('/filter',filterRouter)

// product route
allroutes.use('/product',productRouter)

// category route
allroutes.use('/product/category',categoryRoutes)

// cart route
allroutes.use('/user/cart',requireSignin,addtocart)

// address route
allroutes.use('/user/address',requireSignin,addressRoute)


// contact route
allroutes.use('/user/contact',ContactRoute)

// payment route
allroutes.use('/payment',paymentRoute)

// reviews router
allroutes.use('/reviews', reviewRouter)

allroutes.use('/orders',orderRouter)

// change password
allroutes.use('/user',ForgetPassword )










module.exports=allroutes

