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


const forgetPasswordRouter = require('./apis/user');
const searchRouter = require('./apis/Search');


// auth route
allroutes.use('/auth',authrouter)

// send email route
allroutes.use('/user',forgetPasswordRouter)

// searchbox route
allroutes.use('/search',searchRouter)

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





module.exports=allroutes

