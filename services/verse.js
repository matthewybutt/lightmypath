const bible = require("bible-english");
const mongoose = require('mongoose');

const Verse = mongoose.model('verses')

console.log("verse.js loaded")

// Get verse
// bible.getVerse("Luke 1:1", function (err, data) {
//     console.log(err || data);
// });



// Get the verse of the day
// bible.getVerse("votd", function (err, data) {
//     console.log(err || data);
// });
