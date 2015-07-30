var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var query = db.query('SELECT * FROM users'),
      users = [];

    query
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
        })
        .on('result', function(user) {
            // it fills our array looping on each user row inside the db
            users.push(user);
        })
        .on('end', function() {
            // loop on itself only if there are sockets still connected
            res.json(users);
        });


});

module.exports = router;
