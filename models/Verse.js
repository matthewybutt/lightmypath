const mongoose = require('mongoose');
const { Schema } = mongoose;

const verseSchema = new Schema({
  userId: String,
  citation: String,
  text: String,
  dateVerseAdded: { type: Date, default: Date.now }
})

mongoose.model('verses', verseSchema)
