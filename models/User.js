const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  dateCreated: { type: Date, default: Date.now },
  verses: [{
    citation: String,
    text: String,
    dateVerseAdded: { type: Date, default: Date.now }
  }]
})

mongoose.model('users', userSchema)
