const express=require('express')
const Contact=require('../../models/Contact')


const ContactRoute=express.Router()


ContactRoute.post('/add',async(req,res)=>{
    try{
        const number=req.body.number
        const email=req.body.email
        const message=req.body.message

        if(!number){
            return res.status(400).send({message:"You must enter an mobile number"})
        }
        if(!email){
            return res.status(400).send({message:"You must enter an Email address"})
        }
        if(!message){
            return res.status(400).send({message:"You must enter message"})
        }

        const exitingcontact=await Contact.findOne({email})

        if(exitingcontact){
            return res.status(400).send({message:"contact exit of same email address"})
        }

        const contact=new Contact({
            number,email,message
        })

        const contactDoc=await contact.save()

        return res.status(200).send({
            success:true,
            message:`we recived your message,we will reach on your email address: ${email}`,
            contact:contactDoc
        })
    }catch(error){
        return res.status(400).send("You have not proceed ,Please Try again")
    }
})

module.exports=ContactRoute
