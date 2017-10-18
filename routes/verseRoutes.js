const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const bible = require("bible-english");
const keys = require('../config/keys');

const Verse = mongoose.model('verses')
const User = mongoose.model('users')

module.exports = app => {

  app.post('/api/find_verse', async (req, res) => {
    let scripture = req.body.citation
    if(scripture === ""){
      res.send([])
    } else {
      // Get verse
      bible.getVerse(scripture, function (err, data) {
          // console.log("bible API response- ", err || data);
          if(data){
            res.send(data)
          } else {
            res.send(err)
          }
      });
    }
  })

  app.post('/api/post_verse', requireLogin, async (req, res) => {
    const verse = await new Verse({
      citation: req.body.citation,
      text: req.body.text,
      attempts: req.body.attempts,
      maxAttempts: req.body.maxAttempts,
      userId: req.user.googleId
    }).save()
    req.user.verses.push(verse);
    const user = await req.user.save()
    res.send(verse);
  })

  app.patch('/api/delete_verse', async (req, res) => {
    let oId = mongoose.Types.ObjectId(req.body._id)
    User.update(
      { googleId: req.user.googleId },
      { $pull: { verses: { _id: oId } } },
      { upsert: true },
      function(err, user){
        if (err){
          res.send(err);
        } else {
          res.send(user);
        }
      }
    )

    Verse.remove({ _id: oId }).exec()

  })

}
