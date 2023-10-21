const express = require("express");
const ReviewModel = require("../../models/Reviews");
const UserModel = require("../../Models/userModel");
const reviewRouter = express.Router();

reviewRouter.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await ReviewModel.find({ productId });

    if (!reviews) {
      res.status(204).send({
        status: 204,
        message: "No Data Found",
      });
    }
    res.status(200).send({
      status: 200,
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

reviewRouter.post("/product/add", async(req, res) => {
  const { productId, userId, rating , reviewText } = req.body;
  const user = await UserModel.find({_id : userId})

  if(!user){
    res.status(401).send("User are nor registered")
  }

//   const reviewExit = await ReviewModel.findOne({userId , productId})
//   if(reviewExit){
//     return res.status('400').send("Review of registed user already exit")
//   }
  const newReview = new ReviewModel({
    productId,
    userId,
    userName : user[0].userName ,
    rating,
    reviewText,
  });

  newReview.save((err, data) => {
    if (err) {
      res.status(403).send({
        "Interal Error": err,
      });
    }
    res.status(200).send({
      message: "Review Added",
      data: data,
    });
  });
});

module.exports = reviewRouter;
