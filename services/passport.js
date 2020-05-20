const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

// passport.serializeUser((user, cb) => {
//   cb(null, user.id)
// });

// passport.deserializeUser((id, cb) => {
//   User.findById(id)
//     .then(user => {
//       cb(null, user);
//     });
// });

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
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, cb) => {
      // const existingUser = User.findOne({googleId: profile.id})
      // if (existingUser) {
      //   console.log('>>> The user exists!!! <<<')
      //   // console.dir(existingUser, { depth: null });
      //   return cb(null, existingUser);//this is a Passport function
      // }
      // const user = new User({googleId: profile.id}).save()
      // cb(null, user)
      // // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // //   return cb(err, user);
      // // });

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
