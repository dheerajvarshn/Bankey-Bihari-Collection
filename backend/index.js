const express=require('express');
// const { PORT } = require('./config/key');
const {connection}=require('./db');
const allroutes= require('./Routes/index');
const cors=require('cors');
const mailSender = require('./utils/mailSender');
const path = require('path')

const app=express();

// middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',allroutes)
const PORT = process.env.PORT
 
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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