const { Router } = require("express");
const ProductModel = require("../../models/Product");
const productRouter = Router();

//add product data 

productRouter.post("/add", async (req, res) => {
  console.log(req.body)
  try {
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const rating = req.body.rating;
    const reviews = req.body.reviews;
    const category = req.body.category;
    const brand = req.body.brand;
    const image = req.body.image;


    if (!description || !name) {
      return res
        .status(400)
        .json({ error: "You must enter description & name." });
    }
    if (!rating || !reviews) {
      return res
        .status(400)
        .send({ error: "You must enter rating & reviews." });
    }

    if (!quantity) {
      return res.status(400).json({ error: "You must enter a quantity." });
    }

    if (!price) {
      return res.status(400).json({ error: "You must enter a price." });
    }

    const product = new ProductModel({
      name,
      description,
      quantity,
      price,
      rating,
      image,
      reviews,
      category,
      brand
    });

    const savedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: `Product has been added successfully!`,
      product: savedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Fetch Product Data

productRouter.get('/',async(req,res)=>{
    try{
        let product=await ProductModel.find({})
        res.status(200).send(product)
    }catch(error){
        res.status(400).send('Your request cannot be processes.Please Try again')
    }
})

module.exports = productRouter;
