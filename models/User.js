const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  verses: [{
    citation: String,
    text: String
  }]
})

mongoose.model('users', userSchema)
