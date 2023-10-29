const express = require('express')
const OrderModel = require('../../models/Order')

const orderRouter  = express.Router()

orderRouter.get('/user/:userId',async(req,res)=>{
    try {
        const {userID}=req.params
        if(!userID){
            res.status(400).send("No such user Exit")
        }

        const orders = await OrderModel.find({userId:userID});
    
        if (!orders) {
          res.status(204).send({
            status: 204,
            message: "No Orders Found",
          });
        }
        res.status(200).send({
          status: 200,
          data: orders,
        });
      } catch (error) {
        res.status(400).json({ error: error });
      }
})

module.exports = orderRouter 