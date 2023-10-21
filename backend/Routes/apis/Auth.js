const { Router } = require("express");
// const session = require("express-session");
const Usermodel = require("../../Models/userModel");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const { JWT_PRIVATE_KEY, clientURL, google,email } = require("../../config/key");
const { client_id } = google;
const {mailgun_apikey,mailgun_domin}=email
const { secret, tokenLife } = JWT_PRIVATE_KEY;
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(client_id);
const mailgun = require("mailgun-js");

const authrouter = Router();

// express session
authrouter.use(
  cookieSession({
    name: "session",
    keys: "cyberwolve",
    maxAge: 24 * 60 * 60 * 100,
  })
);
require("../../config/passport");

authrouter.use(passport.initialize());
authrouter.use(passport.session());

// sign up

authrouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    console.log(userName, email, phoneNumber, password);

    if (!email) {
      return res
        .status(400)
        .json({ error: "You must enter an email address." });
    }

    if (!userName) {
      return res.status(400).json({ error: "You must enter your full name." });
    }

    if (!password) {
      return res.status(400).json({ error: "You must enter a password." });
    }

    const existingUser = await Usermodel.findOne({$or:[{email,phoneNumber}] });

    if (existingUser) {
      return res
        .status(401)
        .send("That email address is already in use.");
    }

    const user = Usermodel({
      email,
      password,
      userName,
      phoneNumber,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    await user.save();

    // jenerate token

    const newuser = await Usermodel.findOne({ email });
    const payload = {
      username: newuser.userName,
      id: newuser._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    if (!token) {
      return new Error();
    }


    return res.status(200).send({
      
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email}
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// login 
authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        error: "You must enter an email address",
      });
    }
    if (!password) {
      return res.status(400).send({
        error: "You must enter an Password",
      });
    }

    const user = await Usermodel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send( "No user found for this email address.");
    }

    const ismatch = bcrypt.compareSync(password, user.password);
    if (!ismatch) {
      return res.status(401).send("incorrect password");
    }

    const payload = {
      username: user.userName,
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    if (!token) {
      return new Error();
    }

    return res.status(200).send({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).send({
      error: "Your request cannot be processed.Please try again",
    });
  }
});

authrouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.userName,
      },
      userDetail:req.user
    });
  }
);

// google authenticate

authrouter.post("/googlelogin", (req, res) => {
  try {
    const { tokenId } = req.body;

    googleClient
      .verifyIdToken({ idToken: tokenId, audience: client_id })
      .then((response) => {
        const { email_verified, email, name } = response.payload;
        if (email_verified) {
          Usermodel.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).send({
                message: "Something went wrong..",
              });
            } else {
              if (user) {
                const payload = {
                  username: user.userName,
                  id: user._id,
                };
                const token = jwt.sign(payload, secret, {
                  expiresIn: tokenLife,
                });
                if (!token) {
                  return new Error();
                }

                return res.status(200).send({
                  success: true,
                  token: `Bearer ${token}`,
                  user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                  },
                });
              } else {
                let password = email + secret;
                let newUser = new Usermodel({
                  email,
                  userName: name,
                  password,
                });
                newUser.save((err, user) => {
                  if (err) {
                    return res
                      .status(400)
                      .send({ message: "Something went wrong.." });
                  }

                  const payload = {
                    username: user.userName,
                    id: user._id,
                  };
                  const token = jwt.sign(payload, secret, {
                    expiresIn: tokenLife,
                  });
                  if (!token) {
                    return new Error();
                  }

                  return res.status(200).send({
                    success: true,
                    message: "Login Successfully",

                    token: `Bearer ${token}`,
                    user: {
                      id: user.id,
                      userName: user.userName,
                      email: user.email,
                    },
                  });
                });
              }
            }
          });
        }
      });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Login Failed",
      error: err,
    });
  }
});

// email sender mailgun
const mg = mailgun({apiKey: mailgun_apikey, domain: mailgun_domin});
authrouter.post("/forgetpassword/email", (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "email must be required" });
    }
  const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: email,
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	if(error){
    return res.status(400).send({message:"Error in sending email"})
  }else{
    return res.status(200).send({message:'email send successfully'})
  }


})
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Something went wrong,please try again !" });
  }
});

module.exports = { authrouter };
