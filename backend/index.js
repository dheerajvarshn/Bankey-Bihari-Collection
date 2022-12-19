const express=require('express');
const { PORT } = require('./config/key');
const {connection}=require('./db');
const allroutes= require('./Routes/apis/index');


const app=express();

// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user',allroutes)

app.get('/',(req,res)=>{
    res.send('welcome to server')
})




app.listen(PORT||5000,async()=>{
    try{
        await connection
        console.log('database connection success')
    }
    catch{
        console.log('database connection failed !')
    }
    console.log('happy connection')
})