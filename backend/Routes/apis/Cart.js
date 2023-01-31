const { Router } = require("express");
const Cart = require("../../models/Cart");

const addtocart = Router();

addtocart.post("/addtocart", (req, res) => {
  Cart.findOne({ userId: req.user.id }).exec((error, cart) => {
    if (error) {
      return res.status(400).send(error);
    }
    if (cart) {
      Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { cartItems: req.body.cartItems } }
      ).exec((err, cart) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send({cart:cart});
        }
      });
    } else {
      const cart = new Cart({
        userId: req.user.id,
        cartItems: req.body.cartItems,
      });

      cart.save((err, cart) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).send({ cart: cart });
      });
    }
  
  });
});

addtocart.get('/addtocart',async(req,res)=>{
  try{
    let cart=await Cart.find({"userId":req.user.id})
    res.status(200).send(cart[0].cartItems)
}catch(error){
    res.status(400).send('noUser Cart')
}
})


module.exports = addtocart;
