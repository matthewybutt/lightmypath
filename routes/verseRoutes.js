const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const bible = require("bible-english");

const Verse = mongoose.model('verses')
const User = mongoose.model('users')

module.exports = app => {
  app.post('/api/find_verse', async (req, res) => {
    let scripture = req.body.citation
    console.log(scripture)
    if(scripture === ""){
      res.send([])
    } else{
      // Get verse
      bible.getVerse(scripture, function (err, data) {
          console.log("bible API response- ", err || data);
          if(data){
            res.send(data)
          } else {
            res.send(err)
          }
      });
    }
  })

  app.post('/api/post_verse', requireLogin, async (req, res) => {
    const verse = await new Verse({citation: req.body.citation, text: req.body.text}).save()
    req.user.verses.push(verse);
    const user = await req.user.save()
    res.send(verse);
    // res.redirect('/verse/my_verses');
    res.redirect('/');
  })

  app.patch('/api/delete_verse', async (req, res) => {
    console.log("req.body- ", req.body)
    console.log("req.body._id- ", req.body._id)
    console.log("req.user- ", req.user)
    let oId = mongoose.Types.ObjectId(req.body._id)
    console.log("oId- ", oId)

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

  })
}
