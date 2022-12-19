const { Router } = require("express");
const Usermodel = require("../../Models/userModel");

const authrouter = Router();

authrouter.post("/signup", async (req, res) => {


  const user = await Usermodel(req.body);

   user.save((err, success) => {
    if (err) {
      res.status(500).send({ message: "error occured" ,err});
    }
    return res.status(200).send({ message: "Signup successfully" });
  });
});

authrouter.post('/login',async(req,res)=>{
    const checkuser=await Usermodel.find(req.body)
    console.log(checkuser)
    if(checkuser.length>=1){
      let  {user_name,_id}=checkuser[0]
      let payload={
        user_name,
        _id,
        token:12345
      }
      res.send(payload)
    }else{
        return res.send({message:'wrong creadential'})
    }
})

module.exports = authrouter;
