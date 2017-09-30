//Initital Application Set Up
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Verse');
require('./services/passport');
require('./services/verse');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/verseRoutes')(app);

if(process.env.node_ENV === 'production'){
  //Express will serve roduction assets
  app.use(express.static('client/build'));
  //Express will serve up index.html if route not recognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirName, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT);
