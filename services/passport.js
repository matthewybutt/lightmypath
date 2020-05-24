const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

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
      callbackURL: 'http://localhost:3000/auth/google/callback',
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
