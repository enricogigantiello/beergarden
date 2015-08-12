var express = require('express');
var router = express.Router();

router.get('/menus', function(req, res, next) {
    var db = req.db;

    var employee = { name: 'Winnie', location: 'Australia' };
    db.query('INSERT INTO employees SET ?', employee, function(err,result){
        if(err) throw err;

        console.log('Last insert ID:', result.insertId);
        res.json(result.insertId);
    });



});

router.get('/menu', function(req, res, next) {
    var db = req.db;
    var query = db.query('SELECT * FROM product'),
        products = [];

    query
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
        })
        .on('result', function(prod) {
            // it fills our array looping on each products row inside the db
            products.push(prod);
        })
        .on('end', function() {
            // loop on itself only if there are sockets still connected
            res.render('menu', { products: products });
        });

});


/*
 * GET productlist.
 */
router.get('/productlist', function(req, res) {
    var db = req.db;

    db.query('SELECT * FROM product where sold_out = false',function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
        res.json(rows);
    });



});



module.exports = router;
