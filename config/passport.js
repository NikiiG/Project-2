// config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// new code below
passport.use(new GoogleStrategy(
  // Configuration object for GOOGLE strategy
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  // The verify callback function
  //  async/await beacuse requesting to an API is an async action
  async function(accessToken, refreshToken, profile, cb) {
    // When using async/await  we use a
    // try/catch block to handle an error
    try {
      // A user has logged in with OAuth...
      let user = await User.findOne({ googleId: profile.id });
      // Existing user found, so provide it to passport
      if (user) return cb(null, user);
      //otherwise,create new user using OAuth data
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
  passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
  });
  
