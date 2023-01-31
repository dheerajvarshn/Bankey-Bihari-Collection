const { Router } = require("express");
const Product = require("../../models/Product");

const searchRouter = Router();

searchRouter.post("/", async(req, res) => {
  try {
    res.send(req.body)
    const data=rq.body
  //  const {product}=req.params
   Product.find({ "slug":{$regex:data,$options:'m'}}).exec((err,data)=>{
    if(err){
        return res.status(400).send({message:err})
    }
    if(data){
        return res.send(data)
    }
   })
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = searchRouter;
