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


/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    //console.log(req.body);
    var newUser = req.body;
    var querystring = 'insert into users values (NULL, "'+newUser.user_description+'","'+newUser.user_img+'","'+newUser.user_name+'")';
    console.log(querystring);
    var query = db.query(querystring);


    query
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
            res.send({ msg: err });

        })


        .on('end', function() {
            res.send({ msg: '' } );
        });



    /*
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });*/
});

module.exports = router;
