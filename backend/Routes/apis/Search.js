const { Router } = require("express");
const Product = require("../../models/Product");

const searchRouter = Router();

searchRouter.get("/product", async(req, res) => {
  const query = req.query.q
  try {
  //  const {product}=req.params
  const products = await Product.find({
    $or: [
      { slug: new RegExp(query, 'i') },      // Case-insensitive search for name
      { category: new RegExp(query, 'i') },  // Case-insensitive search for category
      { brand: new RegExp(query, 'i') }      // Case-insensitive search for brand
    ]
  });
  res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = searchRouter;
