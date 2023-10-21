const { Router } = require("express");
const Product = require("../../models/Product");

const filterRouter = Router();

filterRouter.get("/product", async(req, res) => {
   try{
      const {category,brands,price} = req.query
      // console.log(category,brands,price)
  
      
      const filter = {} 
      if(category){
         filter.category = new RegExp(category,'i')
      }
      
      if (brands) {
         let newArray = brands.map(str => str.split(' ')[0]);
         console.log('hello')
         console.log(newArray)
         const brandCaseInsensitve = newArray.map((brand) => {
            console.log('hi')  
            return new RegExp(brand , "i");
         });
         console.log(brandCaseInsensitve)
         filter.brand = {$in:brandCaseInsensitve}
      }

      if(price){
         if (price.min !== "" && price.max !== "") {
     filter.price = {
       $gte: price.min,
       $lte: price.max,
     }
      }
    }
    console.log(filter)
      const filterProduct =await Product.find(filter)
      // console.log(filterProduct)
      if(filterProduct == []){
         res.status(404).json('no data found')
      }else{
         console.log(filterProduct)
         res.status(200).send(filterProduct)
      }

   }catch(error){
      return res.status(500).send(`Error: ${error}`)
   }
});

module.exports = filterRouter;
