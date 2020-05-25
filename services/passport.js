const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

const callbackURL = process.env.NODE_ENV ? '/auth/google/callback' : 'http://localhost:3000/auth/google/callback';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: callbackURL,
      proxy: true
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({googleId: profile.id}, (err, user) => {
        if (err) return cb(err);
        if (!user) {
          const user = new User({googleId: profile.id}).save();
          return cb(err, user);
        } else {
          return cb(err, user);
        }

      });

    }
  )
);
