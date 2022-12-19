const dotenv = require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    database:process.env.MONGO_URL,

    app:{
        name:"MERN_ECOMMERCE",
        serverURL: process.env.BASE_SERVER_URL,
        clientURL: process.env.BASE_CLIENT_URL
    }

}