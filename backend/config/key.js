const dotenv = require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    clientURL:process.env.BASE_CLIENT_URL,
    database:process.env.MONGO_URL,

    // userId
    user_id : process.env.USER_ID ,
    
    // userPassword
    user_pass : process.env.USER_PASSWORD,

    app:{
        name:"MERN_ECOMMERCE",
        serverURL: process.env.BASE_SERVER_URL,
        clientURL: process.env.BASE_CLIENT_URL
    },
    JWT_PRIVATE_KEY: {
        secret: process.env.JWT_PRIVATE_KEY,
        tokenLife: '7d'
      },
    
    google:{
        client_id:process.env.GOOGLE_CLIENT_ID,
        client_secret:process.env.GOOGLE_CLIENT_SECRET,
        google_callback_url:process.env.GOOGLE_CALLBACK_URL
    },

    payment:{
        key_id:process.env.PAYMENT_KEY_ID,
        key_secret:process.env.PAYMENT_KEY_SECRET

    },
    email:{
        mailgun_apikey:process.env.MAILGUN_API_KEY,
        mailgun_domin:process.env.MAILGUN_DOMIN
    }

}