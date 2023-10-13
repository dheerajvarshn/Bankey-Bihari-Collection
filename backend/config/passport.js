const passport = require("passport");
const Usermodel = require("../Models/userModel");
const { JWT_PRIVATE_KEY, google, clientURL } = require("./key");

const { client_id, client_secret ,google_callback_url} = google;
const { secret } = JWT_PRIVATE_KEY;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// jwt strategy

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    Usermodel.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);


