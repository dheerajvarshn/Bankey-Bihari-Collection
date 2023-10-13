const { Router } = require("express");
const ProductModel = require("../../models/Product");

const categoryRoutes = Router();
// mens collection
categoryRoutes.get("/men", async (req, res) => {
  const mensProduct = await ProductModel.find({ category: "Men" || "men" });
  return res.status(200).send(mensProduct);
});

// women collection
categoryRoutes.get("/women", async (req, res) => {
  const womensProduct = await ProductModel.find({
    category: "Women" || "women",
  });
  return res.status(200).send(womensProduct);
});

// girls collection
categoryRoutes.get("/girls", async (req, res) => {
  const girlsProduct = await ProductModel.find({
    category: "Girls" || "girls",
  });
  return res.status(200).send(girlsProduct);
});

// boys collectio
categoryRoutes.get("/boys", async (req, res) => {
  const boysProduct = await ProductModel.find({ category: "Boys" || "boys" });
  return res.status(200).send(boysProduct);
});

// kids collection
categoryRoutes.get("/kids", async (req, res) => {
  const boysProduct = await ProductModel.find({ category: "Kids" || "kids" });
  return res.status(200).send(boysProduct);
});

categoryRoutes.get("/:category/:subcategory", async (req, res) => {
  try {
    const category = req.params.category;
    const subcategory = req.params.subcategory;
    const result = await ProductModel.find({
      category: category,
      subcategory: subcategory,
    });
    res.status(200).send(result);
  } catch (err) {
    return res.status(400).send("You cannot be processed,please try again");
  }
});


// product by id
  categoryRoutes.post('/subcategory/:id',async(req,res)=>{

    try{
      console.log(req.params.id)
      const id=req.params.id;
      const result=await ProductModel.findById({_id:id})
      if(result){
        return res.status(200).send(result)
      }else{
        return res.status(401).send({message:'product is not avilable'})
      }
    }catch(error){
      res.status(400).send('Something Error !')
    }
  })

module.exports = categoryRoutes;
