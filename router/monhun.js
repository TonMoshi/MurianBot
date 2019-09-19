var express = require('express');
var router = express.Router();

var discord = require('../controller/discord.js');

// Home page route.
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// Get Damages page route.
router.post('/damages', function (req, res) {
  var info = req.body;
  console.log(info);

  discord.monHunDamages(info, function(done){
    if(!done){
        res.send('Failed to send info to Discord');
    }

    res.send('Data send');
  });
})

module.exports = router;