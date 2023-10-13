const express = require('express');
const ReviewModel = require('../../models/Reviews');

const reviewRouter = express.Router() ;

reviewRouter.get('/',(req,res)=>{
    ReviewModel.find().then((data)=>{
        if(!data){
            res.status(404).send({
                status : 404 ,
                message : 'No Data Found'
            })

            res.status(200).send({
                status : 200 ,
                data : data
            })
        }
    }).catch(err => res.status(400).send({
        status : 400 ,
        error : err 
    }))

})

reviewRouter.post('/add',(req,res)=>{
    // res.send('this is post section')
    const {productId, userId, title, rating, desc, reviews  } = req.body

    const newReview = new ReviewModel({productId,userId,title,rating,desc,reviews})

    newReview.save((err,data)=>{
        if(err){
            res.status(403).send({
                message : err
            })

        }
        res.status(200).send({
            message : "Review Added",
            data : data 
         })
    })
})


module.exports = reviewRouter