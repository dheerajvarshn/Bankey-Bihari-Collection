const mongoose=require('mongoose')

// cartItemSchema

const CartItemSchema=mongoose.Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number
    },
    purchasePrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    priceWithTax:{
        type:Number,
        default:0
    },
    totalTax:{
        type:Number,
        default:0
    },
    stautus:{

    }
})

export const CartItemModel=mongoose.model('CartItem',CartItemSchema)

// cartSchema

const CartSchema=mongoose.Schema({
    product:[CartItemSchema],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    updated:{
        type:Date
    },
    created:{
        type:Date.now
    }
})


export const CartModel=mongoose.model('Cart',CartSchema)
