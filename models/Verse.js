const mongoose = require('mongoose');
const { Schema } = mongoose;

const verseSchema = new Schema({
  citation: String,
  text: String
})

mongoose.model('verses', verseSchema)
