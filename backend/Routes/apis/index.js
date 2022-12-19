const {Router} =require('express')
const router=Router();

// const addressRoutes=require('./apis/Address');
const authrouter = require('./Auth');
// const brandRoutes=require('./Brand')
// const cartRoutes=require('./Cart')
// const categoryRoutes=require('./Category')
// const contactRoutes=require('./Contact')
// const merchantRoutes=require('./Merchant')
// const orderRoutes=require('./Order')
// const productRoutes=require('./Product')
// const reviewsRoutes=require('./Reviews')
// const userRoutes=require('./User')
// const wishlistRoutes=require('./WishList')

// auth route
router.get('/auth',authrouter)

// // address route
// router.get('/address',addressRoutes)

// // brand route
// router.get('/brand',brandRoutes)

// // cart route
// router.get('/cart',cartRoutes)

// // category route
// router.get('/category',categoryRoutes)

// // contact route
// router.get('/contact',contactRoutes)

// // merchant route
// router.get('/merchant',merchantRoutes)

// // order route
// router.get('/order',orderRoutes)

// // product route
// router.get('/product',productRoutes)

// // reviews route
// router.get('/review',reviewsRoutes)

// // user route
// router.get('/user',userRoutes)

// // wishlist routes
// router.get('/wishlist',wishlistRoutes)

module.exports=router

