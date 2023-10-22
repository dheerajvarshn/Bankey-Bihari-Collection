const express=require('express');
// const { PORT } = require('./config/key');
const {connection}=require('./db');
const allroutes= require('./Routes/index');
const cors=require('cors');
const mailSender = require('./utils/mailSender');


const app=express();

// middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',allroutes)
const PORT = process.env.PORT

app.listen(PORT||5000,async()=>{
    try{
        await connection
        console.log('database connection success')
    }
    catch{
        console.log('database connection failed !')
    }
    console.log(`happy connection on Port ${(PORT)?PORT : 5000}`)
})